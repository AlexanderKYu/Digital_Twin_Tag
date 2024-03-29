from flask import Flask, request,jsonify, current_app
from flask_socketio import SocketIO,emit
from flask_cors import CORS
from os import environ
import socket
import sys
import json
import time
import atexit
import datetime
from flask_mail import Mail, Message
import mail


from apscheduler.schedulers.background import BackgroundScheduler

sys.path.append('..')

from Eliko import JSON_eliko_call
from CloudAppAggregator import eliko_pull
from database import dbfuncs

clients = 0
db_error_counter = 0

app = Flask(__name__)
app.config.from_pyfile('config.py')

CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(cors_allowed_origins="*")

mailInstance = Mail(app)
socketio.init_app(app)



def emit_tag_data():
    with app.test_request_context('/'):
        try:
            TCP_IP = environ.get('TCP_IP')
            TCP_PORT = int(environ.get('TCP_PORT'))
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(3)

            s.connect((TCP_IP, TCP_PORT))

            #getting battery status of tag
            tagJson = JSON_eliko_call.getTags(s)
            tagJson = json.loads(tagJson)
            batteryJson = JSON_eliko_call.getBattery(s)
            batteryJson = json.loads(batteryJson)

            try:
                conn, cursor = dbfuncs.db_connection()

                inactiveTags = dbfuncs.getInactiveInProdTags(cursor)
                dbTags = dbfuncs.getInProdTags(cursor)

                dbfuncs.closeDBConnection(conn)

            except:
                print("Connection to Database Failed")
                socketio.emit("serverDown", {'id': 2, 'down': True, 'message': "Base de données inaccessible / Database Unreachable"}, broadcast=True)


            for tag in tagJson:
                if(batteryJson[tag]):
                    tagJson[tag].update(batteryJson[tag])
                tagJson[tag]["inactive"] = False
                tagJson[tag]["rush"] = False
                tagJson[tag]["zone"] = "Not Found"
                for inactiveTag in inactiveTags:
                    if tag[2:] == inactiveTag[0]: #have to cut out first 2 letters of tag because we have to remove the "0x"
                        tagJson[tag]["inactive"] = True
                for dbTag in dbTags:
                    if tag[2:] == dbTag[2]:
                        tagJson[tag]["zone"] = dbTag[9]
                        tagJson[tag]["rush"] = dbTag[10]
                            


            s.close()
            socketio.emit("getTags",tagJson,broadcast=True)
        except:
            socketio.emit("serverDown", {'id': 1, 'down': True, 'message': "Eliko inaccessible / Eliko Unreachable"}, broadcast=True)
        

def invoke_eliko_pull_api():
    global db_error_counter
    try:
        eliko_pull.main("push_info.pkl", "samples.pkl")
        socketio.emit("serverDown", {'id': 2, 'down': False, 'message': ""}, broadcast=True)
        print("cloud aggregator pulled")
        db_error_counter = 0 # RESET ERROR COUNTER IF PUSH SUCCEEDS
        
    except:
        db_error_counter +=1
        if db_error_counter == 6: # IF THE DATABASE HAS NOT BEEN PUSHED TO IN 30 MINUTES THEN ERROR
            mail.databaseError(app, mailInstance)
        socketio.emit("serverDown", {'id': 2, 'down': True, 'message': "Base de données inaccessible / Database Unreachable"}, broadcast=True)


scheduler = BackgroundScheduler()
scheduler.add_job(func=emit_tag_data, trigger="interval", seconds=20, id="emit_tag_data")
scheduler.add_job(func=invoke_eliko_pull_api, trigger="interval", minutes=5)

if(not(scheduler.running)):
    scheduler.start()
    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())

@app.route("/link-wip", methods=['POST'])
def link_wip():
    """set WIP number as alias for tag and return confirmation"""
    data = request.get_json()
    tagId = data["tagNumber"]
    resString = ""
    success = False
    status = -1

    
    #call eliko api
    #connected through router
    s, socketState = JSON_eliko_call.createSocket()

    if not socketState:
        response = {
                    'data': "Unable to Create Connection to Eliko", 
                    'success':False,  
                }
        return jsonify(response)
    
    # get eliko data that will be used differently depending on the situation
    tagList = JSON_eliko_call.getTags(s)
    tagList = json.loads(tagList)

        
    # check if tag is set to disponible
    if data["wipNumber"] == "DISPONIBLE":
        conn, cursor = dbfuncs.db_connection()
        oldWip, oldQty = dbfuncs.getLastInProdWIPBasedOnTagId(cursor, tagId[2:])
        dbfuncs.setWIPInProd(cursor, oldWip, oldQty, False)

        tempTag = tagList.get(tagId, {"timestamp": 0})
        timestamp = tempTag["timestamp"]
        dbfuncs.setProdEndTime(cursor, oldWip, oldQty, timestamp)
        dbfuncs.closeDBConnection(conn)
    else:
        check_for_old_wip(tagId[2:])
        try:
            #adding new tag to database
            conn, cursor = dbfuncs.db_connection()

            tempTag = tagList.get(tagId, {"timestamp": 0})
            startTime = tempTag["timestamp"]

            zoneInfo = dbfuncs.getActiveTagZones(cursor, tempTag["x"], tempTag["y"])

            parsedWip = data["wipNumber"].split(".")

            dbfuncs.dbPushTblOrders(cursor, parsedWip[0], parsedWip[1], tagId[2:], True, startTime, 0, 0, 0, zoneInfo[0], zoneInfo[1], data["rush"] )
            dbfuncs.closeDBConnection(conn)
        except:
            dbfuncs.closeDBConnection(conn)
            response = {
                    'data':"Lien non réussi en raison d'une erreur dans la base de données | Linking Unsuccessful Due to Database Error", 
                    'success':False, 
                    'tagData': {} 
                }
            return jsonify(response)
            


    try:

        #getting battery status of tag
        batteryData = JSON_eliko_call.getBattery(s)
        batteryData = json.loads(batteryData)
        status = batteryData[tagId]["status"]
        
        eCall ='$PEKIO,SET_TAG_ALIAS,'+ tagId + "," + data['wipNumber']
        eCall = eCall + "\r\n"
        s.send(eCall.encode())

        #break point. It looks like the message isnt properly received by the server
        res = s.recv(100)
        s.close()
        res = str(res)
        print ("received data:", res)
        if res[9:11] == 'OK':
            resString = 'Tag ' + tagId + ' set to Alias ' + data['wipNumber']
            success = True
        else:
            resString = 'Tag ' + tagId + ' not found'
    except:
        print("Eliko Socket Timed Out")
        resString = 'Linking Tag to WIP unsuccessful'


    #return confirmation
    # TODO: replace phony values with real ones
    tempTag = tagList.get(tagId, {"timestamp": 0})
    timestamp = tempTag["timestamp"]

    response = {
                    'data':resString, 
                    'success':success, 
                    'tagData': {
                        'number': data['tagNumber'],
                        'alias': data['wipNumber'],
                        'voltage': 4087,
                        'status': status,
                        'timestamp': timestamp,
                    } 
                }
    return jsonify(response)


def check_for_old_wip(tagId):
    """
    Function to check if the previous wip wasn't properly set to DISPONIBLE before being used again
    Function also sets value of Rush
    """

    # check if tag is still considered "In Production" in database
    try:
        conn, cursor = dbfuncs.db_connection()

        wipNumber, qty, startTime = dbfuncs.getLastInProdBasedOnTagIdExt(cursor, tagId)


        if wipNumber != 0:
            dbfuncs.addWIPOverrideIntoQueue(cursor, wipNumber, qty)
            dbfuncs.closeDBConnection(conn)
            # send tag information to front end so that the supervisor can add an end time
            startTimeObj = datetime.datetime.fromtimestamp(int(startTime))
            startTimeText = startTimeObj.strftime( "%Y-%m-%d %I:%M %p")
            socketio.emit("tagOverwritten",{'tagId': tagId, 'wip': wipNumber, 'qty': qty, 'startTime': startTimeText},broadcast=True)
        else:
            dbfuncs.closeDBConnection(conn)
    except:
        print("Connection to Database Failed")
        socketio.emit("serverDown", {'id': 2, 'down': True, 'message': "Base de données inaccessible / Database Connection Failed"}, broadcast=True)



@app.route("/link-battery", methods=['POST'])
def link_battery():
    data = request.get_json()

    #call eliko api
    #connected through router
    TCP_IP = environ.get('TCP_IP')
    TCP_PORT = int(environ.get('TCP_PORT'))
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(3)

    try:
        s.connect((TCP_IP, TCP_PORT))
        
        #getting battery status of tag
        batteryData = JSON_eliko_call.getBattery(s)
        batteryData = json.loads(batteryData)
        status = batteryData[data["tagNumber"]]["status"]

        s.close()
    
    except:
        print("Eliko Socket Timed Out")
        status = "Couldn't retrieve battery"
        resString = 'Unable to retrieve Tag Battery'
        
    response = {
        'status': status
    }

    return jsonify(response)

@app.route("/update-tend", methods=['POST'])
def update_tend():
    data = request.get_json()

    try:
        conn, cursor = dbfuncs.db_connection()
        dbfuncs.manualWIPOverrideForQTY(cursor, data["wip"], data["qty"], data["tEnd"])
        dbfuncs.deleteWIPOverrideFromQueue(cursor, data["wip"], data["qty"])
        dbfuncs.closeDBConnection(conn)
        status = True
    except:
        socketio.emit("serverDown", {'id': 2, 'down': True, 'message': "Base de données inaccessible / Database Unreachable"}, broadcast=True)
        status = False

    response = {
        'status': status
    }
    return jsonify(response)

@app.route("/get-overwritten-wips", methods=['GET'])
def get_overwritten_wips():
    
    wips = []
    try:
        conn, cursor = dbfuncs.db_connection()
        wips = dbfuncs.getAllWIPOverride(cursor)
        dbfuncs.closeDBConnection(conn)
        wipObjects = []
        for wip in wips:
            wipObjects.append({
                'wip': wip[0],
                'qty': wip[1],
                'startTime': datetime.datetime.fromtimestamp(int(wip[2])).strftime( "%Y-%m-%d %I:%M %p"),
            })
        status = True
    except:
        dbfuncs.closeDBConnection(conn)
        status = False

    response = {
        'status': status,
        'wips': wipObjects
    }
    return jsonify(response)

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    global clients
    clients+=1
    print(request.sid)
    print("client has connected")
    scheduler.print_jobs()
    scheduler.resume_job("emit_tag_data")
    invoke_eliko_pull_api()

    if clients > 1:
        emit_tag_data()

    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    global clients
    clients-=1
    if(clients == 0):
        print("Last User Disconnected")
        scheduler.pause_job("emit_tag_data")
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)




if __name__ == '__main__':
    socketio.run(app, debug=True,port=5000)