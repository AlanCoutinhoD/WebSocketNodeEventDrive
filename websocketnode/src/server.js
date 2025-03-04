require('dotenv').config();
const http = require('http');
const WebSocketAdapter = require('./adapters/websocketAdapter');
const rabbitMQ = require('./infrastructure/rabbitMQ');
const MessageService = require('./application/messageService');

const server = http.createServer();
const webSocketAdapter = new WebSocketAdapter(server);
const messageService = new MessageService(webSocketAdapter, rabbitMQ);

async function startServer() {
    await rabbitMQ.connect();
    messageService.start();

    server.listen(3001, () => {
        console.log('Servidor WebSocket escuchando en el puerto 3001');
    });
}

startServer().catch(console.error);
