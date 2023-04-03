import sys
import os
import pickle
import psycopg2
import boto3
import socket
import json
import datetime

from database import dbfuncs as db

s = ""
presentDateTime = datetime.datetime.now()


# def dbPush(overall_diff, currTime, batch):
#     conn = psycopg2.connect(
#         database=db.DATABASE,
#         user=db.USER,
#         password=db.PASSWORD,
#         host=db.HOST,
#         port=db.PORT,
#     )

#     for key, values in overall_diff.items():
#         conn.autocommit = True
#         db_query = f"INSERT INTO tag_threshold VALUES ('{key}', {values[0]}, {values[1]}, {values[2]}, '{str(currTime)}', {batch});"
#         cursor = conn.cursor()

#         cursor.execute(db_query)
    
#     conn.close()

def mean_diff(pklOut, curr):
    curr = json.loads(curr)
    index = 0

    overall_diff = {}
    for index in range(len(pklOut)):
        if (pklOut[index] == {}):
            return overall_diff
    
    # get coord values
    tag_coord = {}
    tag_avgs = {}

    for data in pklOut:
        data = json.loads(data)
        for key, values in data.items():
            if key not in tag_coord:
                tag_coord[key] = {'x':[], 'y':[], 'z':[]}
            tag_coord[key]['x'].append(float(values['x']))
            tag_coord[key]['y'].append(float(values['y']))
            tag_coord[key]['z'].append(float(values['z']))
    
    for data in tag_coord:
        for key, values in tag_coord.items():
            x_value = round(sum(tag_coord[key]['x']) / len(tag_coord[key]['x']), 2)
            y_value = round(sum(tag_coord[key]['y']) / len(tag_coord[key]['y']), 2)
            z_value = round(sum(tag_coord[key]['z']) / len(tag_coord[key]['z']), 2)
            tag_avgs[key] = [x_value, y_value, z_value]

    
    for key, values in curr.items():
        if key not in tag_avgs:
            x_value = round(float(values['x']), 2)
            y_value = round(float(values['y']), 2)
            z_value = round(float(values['z']), 2)
            overall_diff[key] = [x_value, y_value, z_value]
        else:
            x_value = round(abs(tag_avgs[key][0] - float(values['x'])), 2)
            y_value = round(abs(tag_avgs[key][1] - float(values['y'])), 2)
            z_value = round(abs(tag_avgs[key][2] - float(values['z'])), 2)
            overall_diff[key] = [x_value, y_value, z_value]

    return overall_diff

def read(socket):
    try:
        #time.sleep(1)
        loop=True
        parsed=True
        data=""
        while(loop):
            tmp = s.recv(1024)
            data=data+tmp.decode('ascii')
            #if data received is only a bit of that string there might be problem or if a tag name contains EOF
            if b'EOF' in tmp:
                loop=False
        dataArr=data.split("$")
        return dataArr
#error seems bugged
    except socket.error:
        print('Failed to send data')

def getTags(socket):
    msg = "$PEKIO,GET_TAGS"
    msg = msg + "\r\n" # YOU NEED TO TERMINATE WITH CARRIAGE RETURN-LINE FEED OR YOU NEVER GET A RESPONSE!

    try:
        socket.send(msg.encode("ascii"))
        rawData=read(socket)
        # json_data="["
        json_data = {}
        count=-1
        for i in rawData:
            count=count+1
            data=rawData[count].split(",")
            if len(data)>9:
                # tmp='"'+data[2]+'"'+': {"number":'+ data[2]+',"alias":'+ data[3]+',"mode":'+ data[4]+',"height":'+ data[5]+',"hz":'+ data[6]+',"timestamp":'+ data[7]+',"x":'+ data[8]+',"y":'+ data[9]+',"z":'+ data[10]+'}]'
                # json_data=json_data+tmp
                json_data[data[2]] = {"alias": data[3], "mode": data[4], "height": data[5], "hz": data[6], "timestamp": data[7], "x": data[8], "y": data[9], "z": data[10].replace("\r\n","")}
        # json_data=json_data+"]"

        json_data = json.dumps(json_data, indent=4)


    except socket.error:
        print('Failed to send data')
    return json_data

def main(batchFile, pickleFile): 
    pklOut = []
    existing_batch_file = os.path.isfile(batchFile)
    existing_pkl_file = os.path.isfile(pickleFile)

    if (not existing_batch_file):
        with open(batchFile, "w+") as file:
            file.writelines("1")

    if (not existing_pkl_file):
        file = open(pickleFile, "x")
        file.close()
        with open(pickleFile, "wb") as file:
            temp = [{}, {}, {}]
            pickle.dump(temp, file)
    
    batchOut = 0
    with open(batchFile, "r") as file:
        batchOut = int(file.readline())

    with open(pickleFile, "rb") as file:
        pklOut = pickle.load(file)

    curr_json = getTags(s)

    overall_diff = {}

    overall_diff = mean_diff(pklOut, curr_json)

    pklOut[2] = pklOut[1]
    pklOut[1] = pklOut[0]
    pklOut[0] = curr_json

    if (overall_diff != {}):
        db.dbPush(overall_diff, presentDateTime, batchOut)

    with open(batchFile, "w+") as file:
        file.writelines(str(batchOut + 1))

    with open(pickleFile, "wb") as file:
        pickle.dump(pklOut, file)

if __name__ == "__main__":
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    except socket.error:
            print('Failed to create socket')
            sys.exit()

    TCP_IP = '10.8.4.1'
    TCP_PORT = 25025
    BUFFER_SIZE = 1024

    s.settimeout(3) # 3 second timeout
    s.connect((TCP_IP, TCP_PORT))

    main('batch.txt', 'pickle.pkl')