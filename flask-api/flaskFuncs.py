import mail
from os import environ
import socket
import json
import sys
import datetime

sys.path.append('..')

from Eliko import JSON_eliko_call
from CloudAppAggregator import eliko_pull
from database import dbfuncs

db_error_counter = 0

def emit_tag_data(app, socketio):
    with app.test_request_context('/'):
        try:
            TCP_IP = environ.get('TCP_IP')
            TCP_PORT = int(environ.get('TCP_PORT'))
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(3)

            s.connect((TCP_IP, TCP_PORT))

            #getting battery status of tag
            tagJson = JSON_eliko_call.getTags(s)
            tagJson = json.loads(tagJson)
            batteryJson = JSON_eliko_call.getBattery(s)
            batteryJson = json.loads(batteryJson)

            try:
                conn, cursor = dbfuncs.db_connection()

                inactiveTags = dbfuncs.getInactiveInProdTags(cursor)
                dbTags = dbfuncs.getInProdTags(cursor)

                dbfuncs.closeDBConnection(conn)

            except:
                print("Connection to Database Failed")
                socketio.emit("serverDown", {'id': 2, 'down': True, 'message': "Base de données inaccessible / Database Unreachable"}, broadcast=True)


            for tag in tagJson:
                if(batteryJson[tag]):
                    tagJson[tag].update(batteryJson[tag])
                tagJson[tag]["inactive"] = False
                tagJson[tag]["rush"] = False
                tagJson[tag]["zone"] = "Not Found"
                for inactiveTag in inactiveTags:
                    if tag[2:] == inactiveTag[0]: #have to cut out first 2 letters of tag because we have to remove the "0x"
                        tagJson[tag]["inactive"] = True
                for dbTag in dbTags:
                    if tag[2:] == dbTag[2]:
                        tagJson[tag]["zone"] = dbTag[9]
                        tagJson[tag]["rush"] = dbTag[10]
                            


            s.close()
            socketio.emit("getTags",tagJson,broadcast=True)
        except:
            socketio.emit("serverDown", {'id': 1, 'down': True, 'message': "Eliko inaccessible / Eliko Unreachable"}, broadcast=True)
        

def invoke_eliko_pull_api(app, socketio, mailInstance, logger):
    global db_error_counter
    try:
        eliko_pull.main("push_info.pkl", "samples.pkl")
        socketio.emit("serverDown", {'id': 2, 'down': False, 'message': ""}, broadcast=True)
        print("cloud aggregator pulled")
        db_error_counter = 0 # RESET ERROR COUNTER IF PUSH SUCCEEDS
        
    except Exception as e:
        logger.error('Database has failed ' + db_error_counter + ' times since the last success because of ' + e)
        db_error_counter +=1
        if db_error_counter == 6: # IF THE DATABASE HAS NOT BEEN PUSHED TO IN 30 MINUTES THEN ERROR
            mail.databaseError(app, mailInstance)
        socketio.emit("serverDown", {'id': 2, 'down': True, 'message': "Base de données inaccessible / Database Unreachable"}, broadcast=True)


def check_for_old_wip(socketio, tagId):
    """
    Function to check if the previous wip wasn't properly set to DISPONIBLE before being used again
    Function also sets value of Rush
    """

    # check if tag is still considered "In Production" in database
    try:
        conn, cursor = dbfuncs.db_connection()

        wipNumber, qty, startTime = dbfuncs.getLastInProdBasedOnTagIdExt(cursor, tagId)


        if wipNumber != 0:
            dbfuncs.addWIPOverrideIntoQueue(cursor, wipNumber, qty)
            dbfuncs.closeDBConnection(conn)
            # send tag information to front end so that the supervisor can add an end time
            startTimeObj = datetime.datetime.fromtimestamp(int(startTime))
            startTimeText = startTimeObj.strftime( "%Y-%m-%d %I:%M %p")
            socketio.emit("tagOverwritten",{'tagId': tagId, 'wip': wipNumber, 'qty': qty, 'startTime': startTimeText},broadcast=True)
        else:
            dbfuncs.closeDBConnection(conn)
    except:
        print("Connection to Database Failed")
        socketio.emit("serverDown", {'id': 2, 'down': True, 'message': "Base de données inaccessible / Database Connection Failed"}, broadcast=True)
