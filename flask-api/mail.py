from flask_mail import Mail, Message

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
            mailInstance.send(msg)
            return True
        except:
            return False