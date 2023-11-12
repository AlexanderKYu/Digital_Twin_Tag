FROM python:3.11

EXPOSE 5000/tcp

WORKDIR /app

COPY flask-api/requirements.txt .

RUN pip install -r requirements.txt

COPY /Eliko /app/Eliko
COPY /flask-api /app/flask-api
COPY /CloudAppAggregator /app/CloudAppAggregator

CMD ["uwsgi" , "app.ini"]
