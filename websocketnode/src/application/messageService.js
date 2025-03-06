class MessageService {
    constructor(webSocketAdapter, rabbitMQ) {
        this.webSocketAdapter = webSocketAdapter;
        this.rabbitMQ = rabbitMQ;
    }

    start() {
        this.rabbitMQ.consumeMessages((message) => {
            console.log("Mensaje recibido:", message); // Para depuración

            const idUser = message.trim();

            // Verificamos que idUser esté definido
            if (idUser) {
                const content = { Message: "ENVIO PREPARADO" }; // Mensaje a enviar como objeto JSON

                // Enviamos el mensaje al usuario correspondiente
                this.webSocketAdapter.sendToUser(idUser, JSON.stringify(content)); 
            } else {
                console.error("Mensaje recibido sin idUser:", message);
            }
        });
    }
}

module.exports = MessageService;
