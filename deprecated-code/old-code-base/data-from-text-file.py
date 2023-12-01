import matplotlib.animation as animation 
import matplotlib.pyplot as plt 
import numpy as np 
  
file= open("20220704_Eliko.log", "r")

# creating a blank window
# for the animation 
fig = plt.figure() 
axis = plt.axes(xlim =(-30, 30),
                ylim =(-15, 15)) 
  
line, = axis.plot([], [], lw = 2) 
   
# what will our line dataset
# contain?
def init(): 
    line.set_data([], []) 
    return line, 
   
# initializing empty values
# for x and y co-ordinates
xdata, ydata = [], [] 
   
# animation function 
def animate(i): 
        # update the data.
    #  If you print it i, You can see why it should be set to 2
    tag='0x000BB0'   
    j=4
    tmp=''
    completed=True
    while(completed):
        if('COORD' in tmp and tag in tmp):
            values=tmp.split(",")
            x=float(values[j])
            j=j+1
            y=float(values[j])
            print(x,y)
            completed=False
        else:
            tmp=file.readline() 
    if(len(xdata)>5):
        xdata.pop(0)
        ydata.pop(0)
    xdata.append(x) 
    ydata.append(y) 
    line.set_data(xdata, ydata) 
      
    return line,
   
# calling the animation function     
anim = animation.FuncAnimation(fig, animate, init_func = init, 
                               frames = 500, interval = 10, blit = True) 

plt.show()
