from flask import Flask, request,jsonify, current_app
from flask_socketio import SocketIO,emit
from flask_cors import CORS
from os import environ
import socket
import sys
import json
import time
import atexit

from apscheduler.schedulers.background import BackgroundScheduler

sys.path.append('..')

from Eliko import JSON_eliko_call

app = Flask(__name__)
app.config.from_pyfile('config.py')

CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(cors_allowed_origins="*")

socketio.init_app(app)

def print_date_time():
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

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=print_date_time, trigger="interval", seconds=10)
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
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)




if __name__ == '__main__':
    socketio.run(app, debug=True,port=5000)