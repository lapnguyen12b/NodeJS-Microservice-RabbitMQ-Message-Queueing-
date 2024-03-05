// 1. Connect to Rabbitmq server
// 2. Create a new chanel on that connect
// 3. Create the exchange
// 4. Publish messageto the exchange with a routing key

const amqp = require('amqplib');
const config = require('./config');

class Producer {
    channel;

    async createChannel() {
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey, message) {
        if (!this.channel) {
            await this.createChannel();
        }
        const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, 'direct');

        const logDetails = {
            logType: routingKey,
            message: message,
            dateTime: new Date(),
        };
        await this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(logDetails))
        );

        console.log(`The message ${routingKey} is sent to exchange ${exchangeName}`);
    }
}

module.exports = Producer;