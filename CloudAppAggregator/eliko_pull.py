import sys
import re
import os.path
import datetime
import json
import pickle

sys.path.append('..')

from Eliko import JSON_eliko_call
from database import dbfuncs

DEBUG = False

presentDate = datetime.datetime.now()
curr_unix_timestamp = datetime.datetime.timestamp(presentDate)

TIME_START = "7::00::00"
TIME_LUNCH_START = "11::00::00"
TIME_LUNCH_END = "13::00::00"
TIME_END = "16::00::00"

def dict_to_json(dictionary):
    """
    Function to convert a dictionary object
    to a json object
    """
    json_object = json.dumps(dictionary, indent = 4)
    print(json_object)

def dbTagsPush(tagsJson):
    """
    Function to transform eliko data to be 
    ready and pushed into the database
    """
    tagsJson = json.loads(tagsJson)
    conn, cursor = dbfuncs.db_connection()
    dbfuncs.clearAllInactive(cursor)
    for key, values in tagsJson.items():
        tagID = key.replace("0x", "")
        timestamp = values['timestamp']
        x = values['x']
        y = values['y']
        zoneID = dbfuncs.getActiveTagZones(cursor, x, y)[0]
        parsed_alias = values['alias'].split(".")
        try:
            wip = int(parsed_alias[0])
        except:
            wip = parsed_alias[0]
        qty = 0
        if len(parsed_alias) == 2:
            try:
                qty = int(parsed_alias[1])
            except:
                qty = parsed_alias[1]
        if (not isinstance(wip, int) or not isinstance(qty, int)):
            lastWip, lastQty = dbfuncs.getLastInProdWIPBasedOnTagId(cursor, tagID)
            dbfuncs.setWIPInProd(cursor, lastWip, lastQty, False)
            dbfuncs.setProdEndTime(cursor, lastWip, lastQty, timestamp)
            continue
        if (dbfuncs.checkIfNewWIP(cursor, wip, qty)):
            zoneName = dbfuncs.getZoneName(cursor, zoneID)
            dbfuncs.dbPushTblOrders(cursor, wip, qty, tagID, True, timestamp, 0, 0, 0, zoneID, zoneName)
        
        dbfuncs.dbPushTblRawLocations(cursor, wip, qty, tagID, timestamp, x, y, zoneID)
        dbfuncs.dbUpdateWipStatus(cursor, wip, qty, tagID, timestamp, x, y, zoneID)
        if (dbfuncs.checkIfTagZoneOnPath(cursor, wip, qty, zoneID)):
            dbfuncs.dbUpdateWIPOnTblPaths(cursor,wip, qty, zoneID)
        else:
            zoneName = dbfuncs.getZoneName(cursor, zoneID)
            dbfuncs.dbPushTblPaths(cursor, wip, qty, tagID, zoneID, zoneName, 0)
        tag_duration = dbfuncs.queryZoneDurationBasedOnTblRawLocations(cursor, wip, qty, zoneID)
        if (tag_duration >= (48 * 60 * 60)):
            dbfuncs.dbPushInactiveTags(cursor, tagID, wip, qty, tag_duration)
    dbfuncs.closeDBConnection(conn)
    return tagsJson

def isWorkHours():
    """
    Function to determine the known working
    hours to either set or not set a 
    threshold bias
    """
    time_start = datetime.datetime.strptime(TIME_START, '%H::%M::%S').time()
    time_lunch_start = datetime.datetime.strptime(TIME_LUNCH_START, '%H::%M::%S').time()
    time_lunch_end = datetime.datetime.strptime(TIME_LUNCH_END, '%H::%M::%S').time() 
    time_end = datetime.datetime.strptime(TIME_END, '%H::%M::%S').time()

    currDatetime = presentDate.time()
    if (currDatetime >= time_start and currDatetime <= time_lunch_start and currDatetime >= time_lunch_end and currDatetime <= time_end):
        return True
    else:
        return False

def compare_data_values(past, curr):
    """
    Function to compare current poll to
    previous polls to determine if the 
    production floor is active or not
    """
    curr = json.loads(curr)
    index = 0

    overall_diff = {}
    for index in range(len(past)):
        if (past[index] == {}):
            return True
    
    threshold_bias = 10

    if isWorkHours():
        threshold_bias = 9.5
    
    tag_coord = {}
    tag_avgs = {}

    for data in past:
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

    for key, values in overall_diff.items():
        for value in values:
            if (value > threshold_bias):
                return True
    return False

def main(push_info_file, sample_file):
    """
    Function to invoke the polling process
    and help maintain pickle file data for 
    past and current polls
    """

    last_active_dump = 0
    last_sleep = 0
    last_sleep_mode = False

    existing_txt_file = os.path.isfile(push_info_file)
    existing_pkl_file = os.path.isfile(sample_file)

    if (not existing_txt_file):
        file = open(push_info_file, "x")
        file.close()
        with open(push_info_file, "wb") as file:
            temp = {"last_active_dump":0.0, "last_sleep":0.0, "sleep_mode": False}
            pickle.dump(temp, file)

    if (not existing_pkl_file):
        file = open(sample_file, "x")
        file.close()
        with open(sample_file, "wb") as file:
            temp = [{}, {}, {}]
            pickle.dump(temp, file)
    
    push_info = {}
    with open(push_info_file, "rb") as file:
        push_info = pickle.load(file)
    
    last_active_dump = push_info['last_active_dump']
    last_sleep = push_info['last_sleep']
    last_sleep_mode = push_info['sleep_mode']

    past_tag_values = {}
    
    with open(sample_file, "rb") as file:
        past_tag_values = pickle.load(file)

    soc, status = JSON_eliko_call.createSocket()
    if status:
        tag_values = JSON_eliko_call.getTags(soc)
    else:
        sys.exit()
    new_push = compare_data_values(past_tag_values, tag_values)
    
    past_tag_values[2] = past_tag_values[1]
    past_tag_values[1] = past_tag_values[0]
    past_tag_values[0] = tag_values

    hourly_push = False

    if (new_push):
        dbTagsPush(tag_values)
        last_active_dump = curr_unix_timestamp
        sleep_mode = False
    else:
        # if past push was 30 mins ago and there was no active pushes within that time 
        # enter sleep mode else push
        if(last_active_dump + (30 * 60) >= curr_unix_timestamp):
            # we want to keep doing 5 min pushes after the last active dump so push as long as current time is smaller than
            # last active dump
            dbTagsPush(tag_values)
        elif(last_sleep + (60 * 60) <= curr_unix_timestamp):
            # we want to push after an hour to the previous last sleep time
            dbTagsPush(tag_values)
            last_sleep = curr_unix_timestamp
            hourly_push = True
        sleep_mode = True
    
    if (last_sleep_mode and sleep_mode):
        push_info['last_sleep'] = last_sleep
    elif ((not (last_sleep_mode)) and sleep_mode):
        push_info['last_sleep'] = curr_unix_timestamp
    
    if hourly_push:
        push_info['last_sleep'] = last_sleep
    
    push_info['last_active_dump'] = last_active_dump
    push_info['sleep_mode'] = sleep_mode
    
    with open(push_info_file, "wb") as file:
        pickle.dump(push_info, file)
    
    with open(sample_file, "wb") as file:
        pickle.dump(past_tag_values, file)

if __name__ == "__main__":
    conn, cursor = dbfuncs.db_connection()
    dbfuncs.db_init(cursor)
    dbfuncs.closeDBConnection(conn)

    if (len(sys.argv) < 3):
        main("push_info.pkl", "samples.pkl")
    else:
        main(sys.argv[1], sys.argv[2])
