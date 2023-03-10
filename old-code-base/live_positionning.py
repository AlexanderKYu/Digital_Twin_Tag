"$PEKIO,SET_REPORT_LIST,RR_L,COORD_E"


import socket
import sys
import time
import datetime


#create an INET, STREAMing socket (IPv4, TCP/IP)
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
except socket.error:
    print('Failed to create socket')
    sys.exit()

TCP_IP = '192.168.1.10'
TCP_PORT = 25025
BUFFER_SIZE = 1024

s.settimeout(3) # 3 second timeout
s.connect((TCP_IP, TCP_PORT))

#start-time:1623855300 end-time:1623855330
msg = "$PEKIO,SET_REPORT_LIST,RR_L,COORD_E"
msg = msg + "\r\n" # YOU NEED TO TERMINATE WITH CARRIAGE RETURN-LINE FEED OR YOU NEVER GET A RESPONSE!

try:
    s.send(msg.encode("ascii"))
    #time.sleep(1)
    loop=True
    parsed=True
    while(loop):
        msg2 = s.recv(1024)
        tmp=msg2.decode('ascii')
        #if " " in tmp:
        #tmp.split(",")
        #print(msg2.decode('ascii'))
        if '$PEKIO,EOF' in tmp:
            loop=False
except socket.error:
    print('Failed to send data')

s.close()
sys.exit()

# #data parser. Challenges: data comes in a flow of bytes can't parse right away. how to store/send to the database(a call looped or one call with all the data)
# #solution: create a file, paste result in a txt file, parse the file, push to the database, delete file


