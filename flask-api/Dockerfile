FROM python:3.11

EXPOSE 5000/tcp

WORKDIR /app

COPY requirments.txt .

RUN pip install -r requirments.txt

COPY ./flask-api /app

# CMD[]
