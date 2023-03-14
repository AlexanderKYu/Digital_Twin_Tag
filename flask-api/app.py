from flask import Flask, request,jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
from os import environ
import socket
import sys

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(cors_allowed_origins="*")

socketio.init_app(app)

@app.route("/link-wip", methods=['POST'])
def link_wip():
    """set WIP number as alias for tag and return confirmation"""
    data = request.get_json()
    '''
    #call eliko api
    #connected through router
    TCP_IP = environ.get('TCP_IP')
    TCP_PORT = int(environ.get('TCP_PORT'))
    BUFFER_SIZE = 100
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((TCP_IP, TCP_PORT))
    #str ='$PEKIO,GET_TAGS,'
    eCall ='$PEKIO,SET_TAG_ALIAS,'+ data['tagNumber'] + "," + data['wipNumber']
    eCall = eCall + "\r\n"
    s.send(eCall.encode())

    #break point. It looks like the message isnt properly received by the server
    res = s.recv(BUFFER_SIZE)
    s.close()
    print ("received data:", res)
    '''
    #return confirmation
    resString = 'Tag ' + data['tagNumber'] + ' set to Alias ' + data['wipNumber']
    response = {'data':resString}
    return jsonify(response)

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
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