import socket
import sys

#connected through router
TCP_IP = '10.8.4.1'
TCP_PORT = 25025
BUFFER_SIZE = 1
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
str ='$PEKIO,GET_INFO'
tmp=str.encode()
print(type(tmp.decode()))
s.send(str.encode())
print("message sent")

#break point. It looks like the message isnt properly received by the server
data = s.recv(BUFFER_SIZE)
print("message received")
s.close()
print ("received data:", data)
