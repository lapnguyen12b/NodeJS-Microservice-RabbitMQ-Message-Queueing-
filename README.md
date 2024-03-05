# NodeJS-Microservice-RabbitMQ-Message-Queueing-

## install , Running the services
```bash
$ cd MQS-infoms
$ npm install
$ nodemon app.js
```

```bash
$ cd MQS-nodejs
$ npm install
$ nodemon server.js
```

```bash
$ cd MQS-warningAndError
$ npm install
$ nodemon app.js
```

## RabbitMQ server
### Docker
```bash
$ docker run -d -hostname rmg --name rabbit-server -p 15672:15672 -p 5672:5672 rabbitmg:3-management
```
http://localhost:15672

## curl
### Info
```bash
curl --location 'localhost:3000/sendLog' \
--header 'Content-Type: application/json' \
--data '{
    "logType": "Info",
    "message": "Success!"
}'
```
### Warning
```bash
curl --location 'localhost:3000/sendLog' \
--header 'Content-Type: application/json' \
--data '{
    "logType": "Warning",
    "message": "Warning!!!!!!"
}'
```
### Error
```bash
curl --location 'localhost:3000/sendLog' \
--header 'Content-Type: application/json' \
--data '{
    "logType": "Error",
    "message": "Error! Hot fix"
}'
```