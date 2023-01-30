import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button
from matplotlib.animation import FuncAnimation
import math
#plots data from textfile

#set up by reading the file and creating the subplots
f= open('demofile2.txt','r')
xdata1=[]
fig, axs = plt.subplots(6)
ax1=plt.subplot(611)

fig.suptitle('Vertically stacked subplots')
j=0
#loops to give all subplot axes
while(j<6):
    axs[j].set_xlim(left=0, right=10000)
    axs[j].set_ylim(bottom=-200, top=200)
    j=j+1
fig.tight_layout()

#formula to change the angles of the IMU to a force applied to the skate
def degtoforce(yaw,roll):
        forceyaw=abs(yaw)*1+0
        forceroll=abs(roll)*1+0
        return(forceyaw,forceroll)

#changes quaternions into euler angles math.degrees changes it from radian to degrees
def euler_from_quaternion(w, x, y, z):
        """
        Convert a quaternion into euler angles (roll, pitch, yaw)
        roll is rotation around x in radians (counterclockwise)
        pitch is rotation around y in radians (counterclockwise)
        yaw is rotation around z in radians (counterclockwise)
        """
        t0 = +2.0 * (w * x + y * z)
        t1 = +1.0 - 2.0 * (x * x + y * y)
        roll_x = math.degrees(math.atan2(t0, t1))
     
        t2 = +2.0 * (w * y - z * x)
        t2 = +1.0 if t2 > +1.0 else t2
        t2 = -1.0 if t2 < -1.0 else t2
        pitch_y = math.degrees(math.asin(t2))
     
        t3 = +2.0 * (w * z + x * y)
        t4 = +1.0 - 2.0 * (y * y + z * z)
        yaw_z = math.degrees(math.atan2(t3, t4))
        return degtoforce(yaw_z,roll_x)# in force
#this is a recursive function that displays new angles
def animate(i):
    tmp=f.readline()
    #temporary and is meant to reduce the amount of data processed to one third because their is too much data to process in real time(problem is that with multiple IMU the logic needs to be change)
    if(i%2==0):
        tmp=f.readline()
    if(i%4==0):
        tmp=f.readline()
    #if end of file the function will return the same state and restart again later with the hope of having new data 
    if(tmp==""):
        ln,=axs[0].plot(xdata1)
        return ln,
    #to make sure that the line is data and not something else
    while("quaternion" not in tmp):
        tmp=f.readline()
    #parses the data and puts it in an array
    csvarr=tmp.split(",")
    csvarr[7]=csvarr[7].replace("])","")
    csvarr[7]=csvarr[7].replace("]","")
    angle=euler_from_quaternion(float(csvarr[4]), float(csvarr[5]), float(csvarr[6]), float(csvarr[7]))
    #verifies which IMU is sending the data
    if "8001)" in csvarr[1]:
        k=0
        while(k<2):
            #adding the data to the proper subplot
            xdata1.append(angle[k])
            k=k+1
    #plots the new array
    ln,=axs[0].plot(xdata1)
    return ln,

#start the animate function
anim = FuncAnimation(fig, animate , frames = 500, interval = 40, blit = True) 
plt.show()                   

#what's left add multiple IMU, display two lines for each force, max min on each subplot