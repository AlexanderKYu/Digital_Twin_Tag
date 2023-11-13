FROM python:3.11

EXPOSE 5000/tcp

WORKDIR .

COPY flask-api/requirements.txt .

RUN pip install -r requirements.txt

COPY /Eliko /Eliko
COPY /flask-api /flask-api
COPY /CloudAppAggregator /CloudAppAggregator
COPY /database /database

CMD ["uwsgi" , "flask-api/app.ini"]
