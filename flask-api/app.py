from flask import Flask, request,jsonify, current_app
from flask_socketio import SocketIO,emit
from flask_cors import CORS
from os import environ
import socket
import sys
import json
import atexit
import datetime
from flask_mail import Mail
import mail
from flaskFuncs import emit_tag_data, invoke_eliko_pull_api, check_for_old_wip


from apscheduler.schedulers.background import BackgroundScheduler

sys.path.append('..')

from Eliko import JSON_eliko_call
from database import dbfuncs

clients = 0
db_error_counter = 0

app = Flask(__name__)
app.config.from_pyfile('config.py')

CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(cors_allowed_origins="*")

mailInstance = Mail(app)
socketio.init_app(app)


scheduler = BackgroundScheduler()
scheduler.add_job(func=emit_tag_data, trigger="interval", seconds=20, id="emit_tag_data", args=[app, socketio])
scheduler.add_job(func=invoke_eliko_pull_api, trigger="interval", minutes=5, args=[app, socketio, mailInstance])

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
        check_for_old_wip(socketio, tagId[2:])
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
    wipObjects = []
    
    try:
        conn, cursor = dbfuncs.db_connection()
        wips = dbfuncs.getAllWIPOverride(cursor)
        dbfuncs.closeDBConnection(conn)
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
    if clients > 1:
        emit_tag_data(app, socketio)

    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    global clients
    clients-=1
    if(clients == 0):
        print("Last User Disconnected")
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)



if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0',port=5000)