#import mysql.connector

#query the position from the database
#mydb = mysql.connector.connect(
 # host="localhost",
  #user="root",
  #password="",
  #database="rtls_data_positioning"
#)

#mycursor = mydb.cursor()

#mycursor.execute("SELECT x,y FROM customers")

#myresult = mycursor.fetchall()

#for x in myresult:
import matplotlib.animation as animation 
import matplotlib.pyplot as plt 
import numpy as np
import math

def deltatime(timetwo,timeone):
  deltatiming=timetwo-timeone
  return deltatiming
def speed(xtwo,xone,ytwo,yone,deltatime):
    if(deltatime==0):
      deltatime=0.01
    deltax=abs(xtwo-xone)
    deltay=abs(ytwo-yone)
    c=math.sqrt(deltax*deltax+deltay*deltay)
    speed=c/deltatime
    return speed
def acceleration(vectortwo,vectorone,deltatime):
  if(deltatime==0):
    deltatime=0.01
  accelaration=vectortwo-vectorone/deltatime
  return accelaration
file= open("ElikoCAL.log", "r")
  
# initializing empty values
# for x and y co-ordinates
xdata, ydata, alltime, allplayerspeed= [], [], [],[] 
   

        # update the data.
    #  If you print it i, You can see why it should be set to 2
tmp=""
while("EOF" not in tmp):
  tag='0x000AAE'   
  j=4
  completed=True
  tmp=""
  while(completed):
    if('COORD' in tmp and tag in tmp):
      values=tmp.split(",")
      x=float(values[j])
      j=j+1
      y=float(values[j])
      time=float(values[len(values)-1])
      xdata.append(x) 
      ydata.append(y)
      alltime.append(time)
      print(x,y)
      completed=False
      print(completed)
    else:
      tmp=file.readline()
  if(len(alltime)>1):
    diftime=deltatime(alltime[len(alltime)-1],alltime[len(alltime)-2])
    playerspeed=speed(xdata[len(xdata)-1],xdata[len(xdata)-2],ydata[len(ydata)-1],ydata[len(ydata)-2],diftime)
    print(playerspeed)
    allplayerspeed.append(playerspeed)
  if(len(allplayerspeed)>1):
    print(acceleration(allplayerspeed[len(allplayerspeed)-1],allplayerspeed[len(allplayerspeed)-2],diftime))
    if(len(allplayerspeed)>5):
      xdata.pop(0)
      ydata.pop(0)
      allplayerspeed.pop(0)
file.close()
