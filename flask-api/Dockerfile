FROM python:3.11

EXPOSE 5000/tcp

WORKDIR /app

COPY requirements.txt .

COPY app.py .

COPY config.py .

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y uwsgi

CMD ["uwsgi" , "app.ini"]
