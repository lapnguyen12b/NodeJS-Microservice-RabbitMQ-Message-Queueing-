// 1. Connect to the rabbitMQ server
// 2. Create a new chanel
// 3. Create the exchange
// 4. Create the queue
// 5. Bind the queue to the exchange
// 6. Consume messages to the queue

const amqp = require('amqplib');

async function consumeMessages() {
    const connect = await amqp.connect('amqp://localhost');
    const channel = await connect.createChannel();

    await channel.assertExchange('logExchange', 'direct');

    const q = await channel.assertQueue('InfoQueue');

    await channel.bindQueue(q.queue, 'logExchange', 'Info');

    channel.consume(q.queue, (msg) => {
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg);
    });
}

consumeMessages();