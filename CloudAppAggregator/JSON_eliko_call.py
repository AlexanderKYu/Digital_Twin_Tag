import socket
import sys
def read(socket):
    try:
        #time.sleep(1)
        loop=True
        parsed=True
        while(loop):
            tmp = s.recv(1024)
            data=data+tmp.decode('ascii')
            if '$PEKIO,EOF' in tmp:
                loop=False
        return data
    except socket.error:
        print('Failed to send data')

def getBattery(socket):
    
    #start-time:1623855300 end-time:1623855330
    msg = "$PEKIO,TAG_BATTERY"+ "1623855300" + "," + "1623855330"
    msg = msg + "\r\n" # YOU NEED TO TERMINATE WITH CARRIAGE RETURN-LINE FEED OR YOU NEVER GET A RESPONSE!

    try:
        s.send(msg.encode("ascii"))
        #time.sleep(1)
        data=read(s)


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