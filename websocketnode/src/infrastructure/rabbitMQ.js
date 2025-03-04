const amqp = require('amqplib');
const { QUEUE_NAME, RABBITMQ_URL } = process.env;

let channel;

async function connect() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
    } catch (error) {
        console.error('Error al conectar a RabbitMQ:', error);
        throw error; // Lanza el error para que sea manejado en el servidor
    }
}

async function consumeMessages(callback) {
    await channel.consume(QUEUE_NAME, (msg) => {
        if (msg !== null) {
            callback(msg.content.toString());
            channel.ack(msg);
        }
    });
}

module.exports = { connect, consumeMessages };
