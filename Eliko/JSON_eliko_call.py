import socket
import sys
import json
import config as con

def read(s):
    try:
        loop=True
        data=""
        while(loop):
            tmp = s.recv(1024)
            data=data+tmp.decode('ascii')
            if b'EOF' in tmp:
                loop=False
        dataArr=data.split("$")
        return dataArr
    except socket.error:
        print('Failed to send data')

def getBattery():

    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(3)
        s.connect((con.TCP_IP, con.TCP_PORT))
    except socket.error:
            print('Failed to create socket')
            sys.exit()


    msg = "$PEKIO,GET_BATTERIES"
    msg = msg + "\r\n"

    json_data = {}
    try:
        s.send(msg.encode("ascii"))
        rawData=read(s)
        count=-1
        for i in rawData:
            count=count+1
            data=rawData[count].split(",")
            if len(data)>5:
                json_data[data[2]] = {"alias": data[3], "voltage": data[4], "status": data[5], "timestamp": data[6].replace("\r\n","")}
        json_data = json.dumps(json_data, indent=4)

    except socket.error:
        print('Failed to send data')

    s.close()
    return json_data
  

def getTags():

    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(3)
        s.connect((con.TCP_IP, con.TCP_PORT))
    except socket.error:
            print('Failed to create socket')
            sys.exit()

    msg = "$PEKIO,GET_TAGS"
    msg = msg + "\r\n"

    json_data = {}

    try:
        s.send(msg.encode("ascii"))
        rawData=read(s)
        count=-1
        for i in rawData:
            count=count+1
            data=rawData[count].split(",")
            if len(data)>9:
                json_data[data[2]] = {"alias": data[3], "mode": data[4], "height": data[5], "hz": data[6], "timestamp": data[7], "x": data[8], "y": data[9], "z": data[10].replace("\r\n","")}
        

        json_data = json.dumps(json_data, indent=4)


    except socket.error:
        print('Failed to send data')
    
    s.close()
    return json_data
