# Kafka Quick Start

**Step 1:** Download Kafka on local machine

https://www.apache.org/dyn/closer.cgi?path=/kafka/3.4.0/kafka_2.13-3.4.0.tgz
___

**Step 2:** Open four instances of your terminal in the directory of the new kafka folder

___

**Step 3:** In terminal one start the ZooKeeper service 

```$ bin/zookeeper-server-start.sh config/zookeeper.properties```

*Note use ctrl+c to stop the service*

___

**Step 4:** In terminal two start the Kafka broker service

```$ bin/kafka-server-start.sh config/server.properties```

*Note use ctrl+c to stop the service*

___
**Step 5:** In terminal three create a topic for the producer and consumer

```$ bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092```

___
**Step 6:** In the same terminal create the producer

```$ bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092```

___
**Step 7:** Generate some messages in the third terminal

```> This is the first message on the topic quickstart-events```

___
**Step 8:** In the last terminal start the consumer

```$ bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092```

---
**Step 9:** Wait to see the message from the producer come in, you are also able to put more messages in the producer side and the consumer should show those messages.

___
**Step 10:** Delete topic for local testing (not needed if it is not for local testing)

```$ bin/kafka-topics.sh --delete --topic quickstart-events --bootstrap-server localhost:9092```

*For more information or additional help with the setup of the kafka please visit https://kafka.apache.org/quickstart*