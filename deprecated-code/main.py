from time import sleep 
from json import dumps
from kafka import KafkaProducer

topic_name='eliko-data-stream' # create new stream for Eliko data
producer = KafkaProducer(bootstrap_servers=['localhost:9092'],value_serializer=lambda x: dumps(x).encode('utf-8'))
# we will need to create new zookeeper and server on client side (also need to ask if the port 9092 is open if
# not we need to change the properties accordingly)

# Temporary information push
for e in range(1000):
    data = {'coord' : e}
    print(data)
    producer.send(topic_name, value=data)
    sleep(5)