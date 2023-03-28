import socket
import sys
import json

def read(socket):
    try:
        #time.sleep(1)
        loop=True
        parsed=True
        data=""
        while(loop):
            tmp = socket.recv(1024)
            data=data+tmp.decode('ascii')
            #if data received is only a bit of that string there might be problem or if a tag name contains EOF
            if b'EOF' in tmp:
                loop=False
        dataArr=data.split("$")
        return dataArr
#error seems bugged
    except socket.error:
        print('Failed to send data')

def getBattery(socket):
    msg = "$PEKIO,GET_BATTERIES"
    msg = msg + "\r\n" # YOU NEED TO TERMINATE WITH CARRIAGE RETURN-LINE FEED OR YOU NEVER GET A RESPONSE!
    json_data = {}

    try:
        socket.send(msg.encode("ascii"))
        rawData=read(socket)
        count=-1
        for i in rawData:
            count=count+1
            data=rawData[count].split(",")
            if len(data)>5:
                json_data[data[2]] = {"alias": data[3], "voltage": data[4], "status": data[5], "hz": data[6], "timestamp": data[6]}
        json_data = json.dumps(json_data, indent=4)



    except socket.error:
        print('Failed to send data')
    return json_data
    

   
def getHistory(socket,start,end):
    msg = "$PEKIO,GET_HISTORY_BY_UNIX_TIME,ALL,"+ start + "," + end
    msg = msg + "\r\n" # YOU NEED TO TERMINATE WITH CARRIAGE RETURN-LINE FEED OR YOU NEVER GET A RESPONSE!

    try:
        socket.send(msg.encode("ascii"))
        data=read(socket)
        json_data='[ {"number":'+ data[2]+',"alias":'+ data[3]+',"voltage":'+ data[4]+',"status":'+ data[5]+',"timestamp":'+ data[6]+'}'
        

    except socket.error:
        print('Failed to send data')
    
def getTags(socket):
    msg = "$PEKIO,GET_TAGS"
    msg = msg + "\r\n" # YOU NEED TO TERMINATE WITH CARRIAGE RETURN-LINE FEED OR YOU NEVER GET A RESPONSE!

    try:
        socket.send(msg.encode("ascii"))
        rawData=read(socket)
        json_data = {}
        count=-1
        for i in rawData:
            count=count+1
            data=rawData[count].split(",")
            if len(data)>9:
                json_data[data[2]] = {"alias": data[3], "mode": data[4], "height": data[5], "hz": data[6], "timestamp": data[7], "x": data[8], "y": data[9], "z": data[10].replace("\r\n","")}
        

        json_data = json.dumps(json_data, indent=4)


    except socket.error:
        print('Failed to send data')
    return json_data

#

#GET_Battery example
# {
#   "number": "0x003464",
#   "alias": "Peter’s wristband",
#   "voltage": 4087,
#   "status": 70,
#   "timestamp": 1212343243,
# }

#GET_History example
# {
#   "number": "0x003464",
#   "alias": "Peter’s wristband",
#   "voltage": 4087,
#   "status": 70,
#   "timestamp": 1212343243,
# }

# GET_TAGS example   
# {
#     "number": "0x003464",
#     "alias":"Peter’s wristband",
#     "mode":"2D",
#     "height":1.82,
#     "hz":2.5,
#     "timestamp":1512343243,
#     "x":0.00,
#     "y": -9.20,
#     "z": 1.10,
# }
