import socket
import json
from os import environ

def createSocket():
    """
    Function to create a socket to communicate with eliko
    hardware.
    Return socket object (soc), creation status (bool)
    """
    TCP_IP = environ.get('TCP_IP')
    TCP_PORT = int(environ.get('TCP_PORT'))
    soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    soc.settimeout(3)
    try:
        soc.connect((TCP_IP, TCP_PORT))
        return soc, True
    except:
        print('Failed to create socket')
        return soc, False

def closeSocket(soc):
    """
    Function to close a socket to terminate communication 
    with eliko hardware.
    Return termination status (bool)
    """
    try:
        soc.close()
        return True
    except:
        return False

def read(soc):
    """
    Function to read data from eliko in the socket
    Return a list of communicated data
    """
    try:
        loop=True
        data=""
        while(loop):
            tmp = soc.recv(1024)
            data=data+tmp.decode('utf-8')
            if b'EOF' in tmp:
                loop=False
        dataArr=data.split("$")
        return dataArr
    except socket.error:
        print('Failed to send data')

def getBattery(soc):
    """
    Function to read tag battery data from eliko in 
    the socket.
    Return a json object of communicated data
    """
    msg = "$PEKIO,GET_BATTERIES"
    msg = msg + "\r\n"

    json_data = {}
    try:
        soc.send(msg.encode("utf-8"))
        rawData=read(soc)
        count=-1
        for i in rawData:
            count=count+1
            data=rawData[count].split(",")
            if len(data)>5:
                json_data[data[2]] = {"alias": data[3], "voltage": data[4], "status": data[5], "timestamp": data[6].replace("\r\n","")}
        json_data = json.dumps(json_data, indent=4)

    except socket.error:
        print('Failed to send data')
    return json_data
  

def getTags(soc):
    """
    Function to read tag data from eliko in 
    the socket.
    Return a json object of communicated data
    """
    msg = "$PEKIO,GET_TAGS"
    msg = msg + "\r\n"

    json_data = {}

    try:
        soc.send(msg.encode("utf-8"))
        rawData=read(soc)
        count=-1
        for i in rawData:
            count=count+1
            data=rawData[count].split(",")
            if len(data)>9:
                json_data[data[2]] = {"alias": data[3], "mode": data[4], "height": data[5], "hz": data[6], "timestamp": data[7], "x": data[8], "y": data[9], "z": data[10].replace("\r\n","")}
        

        json_data = json.dumps(json_data, indent=4)


    except Exception as error:
        print(error)
        print('Failed to send data')
    return json_data

