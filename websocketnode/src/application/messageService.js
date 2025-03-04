class MessageService {
    constructor(webSocketAdapter, rabbitMQ) {
        this.webSocketAdapter = webSocketAdapter;
        this.rabbitMQ = rabbitMQ;
    }

    start() {
        this.rabbitMQ.consumeMessages((message) => {
            this.webSocketAdapter.broadcast(message);
        });
    }
}

module.exports = MessageService;
