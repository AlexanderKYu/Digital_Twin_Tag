import sys
from PyQt5.QtWidgets import QDialog, QApplication, QPushButton, QVBoxLayout
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.backends.backend_qt5agg import NavigationToolbar2QT as NavigationToolbar
import matplotlib.pyplot as plt
import random
import matplotlib.animation as animation 
import numpy as np 
  
# main window
# which inherits QDialog
class Window(QDialog):
      
    # constructor
    def __init__(self, parent=None):
        super(Window, self).__init__(parent)
  
        # a figure instance to plot on
        self.figure = plt.figure()
  
        # this is the Canvas Widget that
        # displays the 'figure'it takes the
        # 'figure' instance as a parameter to __init__
        self.canvas = FigureCanvas(self.figure)
  
        # this is the Navigation widget
        # it takes the Canvas widget and a parent
        self.toolbar = NavigationToolbar(self.canvas, self)
          
  
        # creating a Vertical Box layout
        layout = QVBoxLayout()
          
        # adding tool bar to the layout
        layout.addWidget(self.toolbar)
          
        # adding canvas to the layout
        layout.addWidget(self.canvas)
          
        # setting layout to the main window
        self.setLayout(layout)
  
        file= open("ElikoCAL.log", "r")

        # creating a blank window
        # for the animation 
        fig = plt.figure() 
        axis = plt.axes(xlim =(-30, 30),
                        ylim =(-15, 15)) 
        
        line, = axis.plot([], [], lw = 2) 
        line.set_data([], [])         
        # initializing empty values
        # for x and y co-ordinates
        xdata, ydata = [], [] 
            # update the data.
        #  If you print it i, You can see why it should be set to 2
        for i in range(20):
            tag='0x000AAE'   
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
            i=i+1
        

# driver code
if __name__ == '__main__':
      
    # creating apyqt5 application
    app = QApplication(sys.argv)
  
    # creating a window object
    main = Window()
      
    # showing the window
    main.show()
  
    # loop
    sys.exit(app.exec_())