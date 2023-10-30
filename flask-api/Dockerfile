FROM python:3.11

EXPOSE 5000/tcp

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY app.py .

COPY config.py .

# CMD[]
