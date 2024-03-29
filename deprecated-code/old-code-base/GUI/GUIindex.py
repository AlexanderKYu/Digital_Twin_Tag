# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'pageOne.ui'
#
# Created by: PyQt5 UI code generator 5.15.4
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.

import sys
import os.path
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtGui import QPalette, QColor
from PyQt5.QtWidgets import QMainWindow, QWidget, QFrame, QSlider, QHBoxLayout, QPushButton, \
    QVBoxLayout, QAction, QFileDialog, QApplication
import vlc
from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(661, 586)
        MainWindow.setStyleSheet("background-color: rgb(0, 0, 0);")
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.postbtn = QtWidgets.QPushButton(self.centralwidget)
        self.postbtn.setGeometry(QtCore.QRect(20, 280, 621, 231))
        self.postbtn.setStyleSheet("background-color: rgb(108, 108, 108);\n"
"color: rgb(255, 255, 255);")
        self.postbtn.setDefault(False)
        self.postbtn.setObjectName("postbtn")
        self.livebtn = QtWidgets.QPushButton(self.centralwidget)
        self.livebtn.setGeometry(QtCore.QRect(20, 50, 621, 221))
        self.livebtn.setStyleSheet("background-color: rgb(108, 108, 108);\n"
"color: rgb(255, 255, 255);")
        self.livebtn.setObjectName("livebtn")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(20, 10, 621, 41))
        self.label.setMinimumSize(QtCore.QSize(621, 0))
        self.label.setMaximumSize(QtCore.QSize(621, 16777215))
        self.label.setStyleSheet("color: rgb(255, 255, 255);\n"
"font: 20pt \"MS Shell Dlg 2\";")
        self.label.setTextFormat(QtCore.Qt.AutoText)
        self.label.setScaledContents(False)
        self.label.setAlignment(QtCore.Qt.AlignCenter)
        self.label.setObjectName("label")
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 661, 22))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.livebtn.clicked.connect(self.changetolive())
        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)
    def changetolive(self):
            
    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.postbtn.setText(_translate("MainWindow", "Game Visualization tool "))
        self.livebtn.setText(_translate("MainWindow", "Live Game Visualization "))
        self.label.setText(_translate("MainWindow", "Welcome to the game tracking application"))

class LiveTool(object):
        

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
    

