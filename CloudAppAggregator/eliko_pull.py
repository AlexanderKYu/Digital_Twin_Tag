import sys
import re
import os.path
import datetime
import json
import pickle

REGEX_COORD_FILTER = "COORD.+"
REGEX_ID_PAT = "[0-9a-fA-F]x[0-9a-fA-F]{6}"
REGEX_COORD_AND_TIME_PAT = "\d+\.\d{2}"

DEBUG = False

sleep_mode = False
presentDate = datetime.datetime.now()
curr_unix_timestamp = datetime.datetime.timestamp(presentDate)*1000

def dict_to_json(dictionary):
    json_object = json.dumps(dictionary, indent = 4)
    print(json_object)

def compare_mean_values(past, curr):
    if (len(past) == 0):
        # first entry
        return True
    print("Past: ")
    dict_to_json(past)
    print("Curr: ")
    dict_to_json(curr)
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
    print("diff: ")
    dict_to_json(diff)
    for tag, values in diff.items():
        for value in values:
            if value > 1.5:
                return True
    return False
        

def pullData():
    lines = []
    with open("5AMSample.txt", "r") as file:
        lines = file.readlines()
    
    tag_hist = {}
    tags = []

    for line in lines:
        coord_lines = re.findall(REGEX_COORD_FILTER, line)
        for line in coord_lines:
            tag_id = re.findall(REGEX_ID_PAT, line)
            if len(tag_id) == 0:
                break
            else:
                tag_id = tag_id[0]
            coords = re.findall(REGEX_COORD_AND_TIME_PAT, line)
            coord_lst = []
            for coord in coords:
                coord_lst.append(float(coord))
            if tag_id not in tags:
                tag_hist[tag_id] = []
                tags.append(tag_id)
            tag_hist[tag_id].append(coord_lst)

    return tag_hist

def calculate_mean(tag_hist):
    tag_hist_avg = {}
    for tag, values in tag_hist.items():
        tag_hist_avg[tag] = []
        x = []
        y = []
        z = []
        for value in values:
            x.append(value[0])
            y.append(value[1])
            z.append(value[2])

        x_avg = sum(x) / len(x)
        y_avg = sum(y) / len(y)
        z_avg = sum(z) / len(z)

        tag_hist_avg[tag].append(float("{:.2f}".format(x_avg)))
        tag_hist_avg[tag].append(float("{:.2f}".format(y_avg)))
        tag_hist_avg[tag].append(float("{:.2f}".format(z_avg)))
    return tag_hist_avg



def main(unix_file, pickle_file):

    past_unix_timestamp = ""
    sleep_mode = False
    existing_txt_file = os.path.isfile(unix_file)
    existing_pkl_file = os.path.isfile(pickle_file)
    if (not existing_txt_file):
        file = open(unix_file, "x")
        file.close()
    if (not existing_pkl_file):
        file = open(pickle_file, "x")
        file.close()
        with open(pickle_file, "wb") as file:
            temp = {}
            pickle.dump(temp, file)
    
    with open(unix_file, "r") as file:
        lines = file.readlines()
        if (len(lines) != 0):
            past_unix_timestamp = lines[0]
            sleep_mode = lines[1]
    
    past_mean_values = {}
    
    with open(pickle_file, "rb") as file:
        past_mean_values = pickle.load(file)

    if (past_unix_timestamp == ""):
        with open(unix_file, "w+") as file:
            file.writelines(str(curr_unix_timestamp))
            past_unix_timestamp = curr_unix_timestamp - 5 * 60
            file.writelines(str(sleep_mode))
        
    else:
        past_unix_timestamp = float(past_unix_timestamp)

    tag_hist = pullData()
    mean_values = calculate_mean(tag_hist)
    new_push = compare_mean_values(past_mean_values, mean_values)
    print(new_push)

    with open(unix_file, "w+") as file:
        file.writelines(str(curr_unix_timestamp)+"\n")
        file.writelines(str(sleep_mode))
    
    with open(pickle_file, "wb") as file:
        pickle.dump(mean_values, file)

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