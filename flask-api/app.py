from flask import Flask, request,jsonify, current_app
from flask_socketio import SocketIO,emit
from flask_cors import CORS
from os import environ
import socket
import sys
import json
import time
import atexit
import array

from apscheduler.schedulers.background import BackgroundScheduler

sys.path.append('..')

from Eliko import JSON_eliko_call
from database import dbfuncs

clients = 0

sampleData = [
    {
        "alias": "34343",
        "mode": "2D",
        "height": "1.00",
        "hz": "0.000000",
        "timestamp": "1676644837",
        "x": 21.85,
        "y": 16.13,
        "z": "0.97"
    },
    {
        "alias": "369825.2",
        "mode": "2D",
        "height": "1.00",
        "hz": "2.000000",
        "timestamp": "1679426402",
        "x": 3.38,
        "y": -0.49,
        "z": "1.03"
    },
    {
        "alias": "373777",
        "mode": "2D",
        "height": "1.00",
        "hz": "2.000000",
        "timestamp": "1679426402",
        "x": 21.03,
        "y": 1.99,
        "z": "1.01"
    },
    {
        "alias": "373777",
        "mode": "2D",
        "height": "1.00",
        "hz": "2.000000",
        "timestamp": "1679426402",
        "x": 25,
        "y": 85,
        "z": "1.01"
    }
]

app = Flask(__name__)
app.config.from_pyfile('config.py')

CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(cors_allowed_origins="*")

socketio.init_app(app)



def emit_tag_data():
    with app.test_request_context('/'):
        TCP_IP = environ.get('TCP_IP')
        TCP_PORT = int(environ.get('TCP_PORT'))
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(3)

        s.connect((TCP_IP, TCP_PORT))

        #getting battery status of tag
        tagJson = JSON_eliko_call.getTags(s)
        tagJson = json.loads(tagJson)

        s.close()

        socketio.emit("getTags",tagJson,broadcast=True)

scheduler = BackgroundScheduler()
scheduler.add_job(func=emit_tag_data, trigger="interval", seconds=10)

@app.route("/link-wip", methods=['POST'])
def link_wip():
    """set WIP number as alias for tag and return confirmation"""
    data = request.get_json()
    resString = ""
    success = False
    status = -1
    #call eliko api
    #connected through router
    TCP_IP = environ.get('TCP_IP')
    TCP_PORT = int(environ.get('TCP_PORT'))
    BUFFER_SIZE = 100
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(3)

    try:
        s.connect((TCP_IP, TCP_PORT))

        #getting battery status of tag
        batteryData = JSON_eliko_call.getBattery(s)
        batteryData = json.loads(batteryData)
        status = batteryData[data["tagNumber"]]["status"]
        
        #str ='$PEKIO,GET_TAGS,'
        eCall ='$PEKIO,SET_TAG_ALIAS,'+ data['tagNumber'] + "," + data['wipNumber']
        eCall = eCall + "\r\n"
        s.send(eCall.encode())

        #break point. It looks like the message isnt properly received by the server
        res = s.recv(BUFFER_SIZE)
        s.close()
        res = str(res)
        print ("received data:", res)
        if res[9:11] == 'OK':
            resString = 'Tag ' + data['tagNumber'] + ' set to Alias ' + data['wipNumber']
            success = True
        else:
            resString = 'Tag ' + data['tagNumber'] + ' not found'
    except:
        print("Eliko Socket Timed Out")
        resString = 'Unable to connect to Eliko API'

    #return confirmation
    response = {
                    'data':resString, 
                    'success':success, 
                    'tagData': {
                        'number': data['tagNumber'],
                        'alias': data['wipNumber'],
                        'voltage': 4087,
                        'status': status,
                        'timestamp': 1212343243,
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
        resString = 'Unable to connect to Eliko API'
        
    response = {
        'status': status
    }

    return jsonify(response)

@app.route("/zoning")
def zonetag():
    array = []
    for i in sampleData:
        array.append(dbfuncs.getActiveTagZones(i["x"], i["y"]))
        array.append(i["alias"])
    return {"zonetags": array}
# also need to return both the zone form getActiveTagZones and the alias from the json so 


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    global clients
    clients+=1
    print(request.sid)
    print("client has connected")
    if(not(scheduler.running)):
        scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on('data')
def handle_data(data):
    """event listener when client types a message"""
    print("data from the front end: ",str(data))
    emit("data",{'data':data,'id':request.sid},broadcast=True)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    global clients
    clients-=1
    if(clients == 0):
        print("Last User Disconnected")
        scheduler.shutdown()
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)




if __name__ == '__main__':
    socketio.run(app, debug=True,port=5000)