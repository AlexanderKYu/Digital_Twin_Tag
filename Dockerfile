FROM python:3.11

EXPOSE 5000/tcp

WORKDIR /app

COPY flask-api/requirements.txt .

RUN pip install -r requirements.txt

COPY /Eliko /app/Eliko

COPY flask-api/app.py .

COPY flask-api/app.ini .

COPY flask-api/config.py .

CMD ["uwsgi" , "app.ini"]
