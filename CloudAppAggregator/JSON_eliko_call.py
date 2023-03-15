import socket
import sys
import json

def read(socket):
    try:
        #time.sleep(1)
        loop=True
        parsed=True
        while(loop):
            tmp = s.recv(1024)
            data=data+tmp.decode('ascii')
            #if data received is only a bit of that string there might be problem or if a tag name contains EOF
            if 'EOF' in tmp:
                loop=False
        dataArr=data.split(",")
        return dataArr
    except socket.error:
        print('Failed to send data')

def getBattery(socket):
    msg = "PEKIO,GET_BATTERIES"
    msg = msg + "\r\n" # YOU NEED TO TERMINATE WITH CARRIAGE RETURN-LINE FEED OR YOU NEVER GET A RESPONSE!

    try:
        s.send(msg.encode("ascii"))
        #time.sleep(1)
        data=read(s)
        json_data='[ {"number":'+ data[2]+',"alias":'+ data[]\
        \
        '


    except socket.error:
        print('Failed to send data')

   
def getHistory(socket):
     
def getTags(socket):


try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
except socket.error:
        print('Failed to create socket')
        sys.exit()

TCP_IP = '76.64.190.151'
TCP_PORT = 25025
BUFFER_SIZE = 1024

s.settimeout(3) # 3 second timeout
s.connect((TCP_IP, TCP_PORT))

getBattery(s)



s.close()
sys.exit()



#GET_Battery example
# {
#   "number": "0x003464",
#   "alias": "Peter’s wristband",
#   "voltage": 4087,
#   "status": 70,
#   "timestamp": 1212343243,
# }