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

def dict_to_json(dictionary):
    """Convert the given dictionary to a json
    the json will be used as a form of communication between 
    different components and within the cloud"""
    json_object = json.dumps(dictionary, indent = 4)
    print(json_object)

def dbTagsPush(tagsJson):
    """Function to manipulate the givne tagsJson to be 
    ready and be pushed into the database for new raw
    locations data"""
    tagsJson = json.loads(tagsJson)

    for key, values in tagsJson.items():
        parsed_alias = values['alias'].split(".")
        wip = parsed_alias[0]
        qty = 0 
        if len(parsed_alias) == 2:
            qty = parsed_alias[1]
        tagID = key.replace("0x", "")
        timestamp = values['timestamp']
        x = values['x']
        y = values['y']
        zoneID = 1 # will need to be configured later
        dbfuncs.dbPushTblRawLocations(wip, qty, tagID, timestamp, x, y, zoneID)
        
    return tagsJson

def compare_data_values(past, curr):
    """Averaging mechanism used to determine if the 
    data given is significant enough to be pushed into 
    the database. The current data (curr) is compared 
    against the average of the last three samples that 
    are held in past"""
    curr = json.loads(curr)
    index = 0

    overall_diff = {}
    for index in range(len(past)):
        if (past[index] == {}):
            return True
    
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
            if (value > 9.8):
                return True
    return False

def truncateTime():
    # when the last three pushes were on sleep mode then truncate
    # the frequency times 3
    return True

def main(push_info_file, sample_file):
    """The main function that is invoked by the scheduler.
    The function will take pickle files which hold the 
    information of the last push information and a file 
    that holds the last three samples pushed. The main 
    is responsible for carrying out the functionalities 
    of the cloud including periodic data pushes,
    truncating time and removal of the last data points 
    that are over a year"""

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
    if (("-h" in sys.argv) or ("--help" in sys.argv)):
        print("Important: Please provide two files.")
        print("Add two pickle file arguments like: \"push_info.pkl\" and \"samples.pkl\"")
        print("Flags:")
        print("-d \ --debug\tUsed to enable debug mode (disabled by default)")
        exit()
    elif (len(sys.argv) < 3):
        print("Expected two arguments: txt and pkl file name")
        print("Use -h or --help for help")
        exit()
    if (("-d" in sys.argv) or ("--debug" in sys.argv)):
        print("Debug mode: ON")
        DEBUG = True

    main(sys.argv[1], sys.argv[2])
