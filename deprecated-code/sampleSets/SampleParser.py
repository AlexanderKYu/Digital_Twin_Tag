import re

start = 1675832399

raw = []
with open("5AMSample.txt", "r") as file:
    raw = file.readlines()

raw_str = ""
for line in raw:
    raw_str = raw_str + line
# 1675884502
while (start < 1675832699):
    REGEX_PRE = "\$PEKIO.+\n\$PEKIO.+"
    REGEX_POST = "\.\d{2}"
    end = start + 300

    # 5 min interval is 300 seconds

    file_name = str(start) + "_" + str(end) + ".txt"
    with open(file_name, "w+") as file:
        file.writelines("$PEKIO,GET_HISTORY_BY_UNIX_TIME,ALL,"+ str(start) + "," + str(end) + "\n$PEKIO,OK\n")
        while (start <= end):
            lines = re.findall(REGEX_PRE + str(start) + REGEX_POST, raw_str)
            for line in lines:
                lst = line.split("\n")
                for x in lst:
                    file.writelines(x + "\n")
            start += 1
        file.writelines("$PEKIO,EOF")

    start -= 1
