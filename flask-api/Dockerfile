FROM python:3.11

EXPOSE 5000/tcp

WORKDIR /app

COPY requirements.txt .

COPY app.py .

COPY config.py .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["uwsgi" , "--ini", "app.ini"]
