FROM python:3.11
# flask-API dockerfile but needed to be run in the main repo because the flask is dependant on other module and they could not be access within the flask-api folder

WORKDIR .

# copy the requirements first so if the rest of the dockerfile changes when building it will cache the requirements so the build time is faster
COPY flask-api/requirements.txt .

RUN pip install -r requirements.txt

# adding all the files to the docker container
COPY /Eliko /Eliko
COPY /flask-api /flask-api
COPY /CloudAppAggregator /CloudAppAggregator
COPY /database /database

# on runtime execute this command to boot up the uwsgi
CMD ["uwsgi" , "flask-api/app.ini"]
