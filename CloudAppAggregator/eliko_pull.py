import sys
import re
import os.path
import datetime
import json
import pickle

REGEX_PAT = "[0-9a-fA-F]x[0-9a-fA-F]{6}.+\n"
REGEX_ID_PAT = "[0-9a-fA-F]x[0-9a-fA-F]{6}"
REGEX_COORD_AND_TIME_PAT = "\d+\.\d{2}"

DEBUG = False

sleep_mode = False
presentDate = datetime.datetime.now()
curr_unix_timestamp = datetime.datetime.timestamp(presentDate)

def dict_to_json(dictionary):
    json_object = json.dumps(dictionary, indent = 4)
    print(json_object)

def compare_data_values(past, curr):
    if (len(past) == 0):
        # first entry
        return True
    diff = {}
    for tag, values in curr.items():
        if tag not in past:
            # new tag online
            return True
        diff[tag] = []
        index = 0
        for value in values:
            diff[tag].append(value - past[tag][index])
            index += 1
    for tag, values in diff.items():
        for value in values:
            if value > 1.5:
                return True
    return False
        

def pullData():
    lines = []
    with open("sampleSets/Get_Tags.log", "r") as file:
        lines = file.readlines()
    
    tag_data = {}

    for line in lines:
        data_lines = re.findall(REGEX_PAT, line)
        for data in data_lines:
            data = data[:-1]
            data = data.split(",")
            tag = data[0]
            x_coord = float(data[6])
            y_coord = float(data[7])
            z_coord = float(data[8])
            unix_time = float(data[5])
            tag_data[tag] = [x_coord, y_coord, z_coord, unix_time]

    return tag_data


def main(unix_file, pickle_file):

    past_unix_timestamp = ""
    sleep_mode = False
    past_sleep_mode = False
    first_sleep_mode = ""
    existing_txt_file = os.path.isfile("sampleSets/"+unix_file)
    existing_pkl_file = os.path.isfile("sampleSets/"+pickle_file)
    if (not existing_txt_file):
        file = open("sampleSets/"+unix_file, "x")
        file.close()
    if (not existing_pkl_file):
        file = open("sampleSets/"+pickle_file, "x")
        file.close()
        with open("sampleSets/"+pickle_file, "wb") as file:
            temp = {}
            pickle.dump(temp, file)
    
    with open("sampleSets/"+unix_file, "r") as file:
        lines = file.readlines()
        if (len(lines) != 0):
            past_unix_timestamp = lines[0]
            sleep_mode_data = lines[1].split(",")
            past_sleep_mode = bool(sleep_mode_data[0])
            first_sleep_mode = sleep_mode_data[1]
    
    past_tag_values = {}
    
    with open("sampleSets/"+pickle_file, "rb") as file:
        past_tag_values = pickle.load(file)

    if (past_unix_timestamp == ""):
        with open("sampleSets/"+unix_file, "w+") as file:
            file.writelines(str(curr_unix_timestamp))
            past_unix_timestamp = curr_unix_timestamp - 5 * 60
            file.writelines(str(sleep_mode) + "," + str(curr_unix_timestamp))
        
    else:
        past_unix_timestamp = float(past_unix_timestamp)
        first_sleep_mode = float(first_sleep_mode)

    tag_values = pullData()
    new_push = compare_data_values(past_tag_values, tag_values)

    if (past_sleep_mode and not new_push):
        if (curr_unix_timestamp >= (first_sleep_mode + 1 * 60 * 60)):
            # hourly push
            first_sleep_mode = curr_unix_timestamp
            print("Pushing hourly data")
            sleep_mode = True

    
    if (new_push):
        print("Pushing data to db")
        sleep_mode = False
    else:
        sleep_mode = True

    with open("sampleSets/"+unix_file, "w+") as file:
        file.writelines(str(curr_unix_timestamp)+"\n")
        if (not sleep_mode):
            file.writelines(str(sleep_mode)+","+str(curr_unix_timestamp))
        else:
            file.writelines(str(sleep_mode) + "," + str(first_sleep_mode))
        
    
    with open("sampleSets/"+pickle_file, "wb") as file:
        pickle.dump(tag_values, file)

if __name__ == "__main__":
    if (("-h" in sys.argv) or ("--help" in sys.argv)):
        print("Important: Please provide two files.")
        print("One file must be a text file like \"unix_timestamp.txt\"")
        print("One must be a pickle file like \"mean_values.pkl\"")
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