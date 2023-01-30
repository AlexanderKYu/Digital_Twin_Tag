import osc_decoder 
import socket 

#connects to IMU and output to text file
 

# Send /identify message to strobe all LEDs.  The OSC message is constructed 

# from raw bytes as per the OSC specification.  The IP address must be equal to 

# the IP address of the target NGIMU. 


send_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) 

send_socket.sendto(bytes("/identify\0\0\0,\0\0\0", "utf-8"), ("192.168.2.21", 9000)) 
send_socket.sendto(bytes("/identify\0\0\0,\0\0\0", "utf-8"), ("192.168.2.22", 9000)) 
send_socket.sendto(bytes("/identify\0\0\0,\0\0\0", "utf-8"), ("192.168.2.23", 9000)) 
send_socket.sendto(bytes("/identify\0\0\0,\0\0\0", "utf-8"), ("192.168.2.24", 9000)) 
send_socket.sendto(bytes("/identify\0\0\0,\0\0\0", "utf-8"), ("192.168.2.25", 9000)) 
send_socket.sendto(bytes("/identify\0\0\0,\0\0\0", "utf-8"), ("192.168.2.26", 9000)) 

# Array of UDP ports to listen to, one per NGIMU.  These ports must be equal to 
# the UDP Send Port in the NGIMU settings.  The UDP Send IP Address setting 
# must be the computer's IP address.  Both these settings are changed 
# automatically when connecting to the NGIMU using the NGIMU GUI. 

receive_ports = [8001,8002,8003,8004,8005,8006] 
receive_sockets = [socket.socket(socket.AF_INET, socket.SOCK_DGRAM) for _ in range(len(receive_ports))] 
index = 0 

for receive_socket in receive_sockets: 
        receive_socket.bind(("", receive_ports[index])) 
        index = index + 1 
        receive_socket.setblocking(False) 

 

while True:
        for udp_socket in receive_sockets: 
                try: 
                        data, addr = udp_socket.recvfrom(2048) 
                except socket.error: 
                        pass 
                else: 
                        for message in osc_decoder.decode(data): 
                                f = open("demofile2.txt", "a")
                                tmp=udp_socket.getsockname(), message
                                tmp2=str(tmp)+"\n"
                                f.write(tmp2)
                                print(udp_socket.getsockname(), message) 

