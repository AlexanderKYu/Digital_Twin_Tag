import sys
import os.path
import datetime

presentDate = datetime.datetime.now()
curr_unix_timestamp = datetime.datetime.timestamp(presentDate)*1000
print(curr_unix_timestamp)

def main(unix_file):

    # we can send in a file and write the old time and new time into the file
    # this way we can keep track of the past unix and later unix times
    past_unix_timestamp = ""
    existing_file = os.path.isfile(unix_file)
    if (not existing_file):
        file = open(unix_file, "x")
        file.close()
    
    with open(unix_file, "r") as file:
        past_unix_timestamp = file.read()

    if (past_unix_timestamp == ""):
        with open(unix_file, "w+") as file:
            file.writelines(str(curr_unix_timestamp))
            past_unix_timestamp = curr_unix_timestamp - 5 * 60 * 1000
        
    else: 
        # Convert past_unix_timestamp to integer
        past_unix_timestamp = float(past_unix_timestamp)
    
    print(past_unix_timestamp)


if __name__ == "__main__":
    main(sys.argv[1])