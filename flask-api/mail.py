from flask_mail import Mail, Message
import datetime

def get_recent_log_lines(log_file_path, output_file_path):
    # Get current time
    current_time = datetime.datetime.now()

    # Calculate time 30 minutes ago
    thirty_minutes_ago = current_time - datetime.timedelta(minutes=30)

    recent_lines = []

    # Open the record.log file
    with open(log_file_path, 'r') as log_file:
        # Read lines from the log file
        lines = log_file.readlines()

    # Separate lines based on whether they start with a timestamp or not
    for line in lines:
        if line.strip() and line[0].isdigit():
            if parse_date(line) >= thirty_minutes_ago:
                recent_lines.append(line)

    # Write filtered recent lines and other lines to the output file
    with open(output_file_path, 'w') as output_file:
        output_file.writelines(recent_lines)

def parse_date(line):
    # Extract the timestamp from the line
    timestamp_str = line[:23]
    # Convert timestamp string to datetime object
    return datetime.datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S,%f")

def test(app, mailInstance):
    with app.test_request_context('/'):
        msg = Message('Hello from the other side!', sender = 'eliko@bauerhockey.org', recipients = ['alois.clerc@gmail.com'])
        msg.body = "hey, sending out email from flask!!!"
        result = mailInstance.send(msg)
        return "Message sent"
    
def databaseError(app, mailInstance):
    with app.test_request_context('/'):
        try:
            msg = Message('Eliko Database Error Detected', sender = 'eliko@bauerhockey.org', recipients = ['alois.clerc@gmail.com'])
            msg.body = "The Eliko Digital Twin System has been unable to push data to the database for the past 30 minutes. Please investigate this error."

            get_recent_log_lines("error.log", "db_error.log")
            with app.open_resource("db_error.log") as fp:   
                msg.attach("db_error.log", "text/plain", fp.read())  
            mailInstance.send(msg)
            return True
        except:
            return False