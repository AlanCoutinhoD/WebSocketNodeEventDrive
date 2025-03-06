const WebSocket = require('ws');

class WebSocketAdapter {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Map();

        this.wss.on('connection', (ws) => {
            const clientId = this.generateClientId();
            this.clients.set(clientId, ws);
            
            ws.send(JSON.stringify({
                type: 'connection',
                clientId: clientId
            }));

            ws.on('close', () => this.clients.delete(clientId));
        });
    }

    generateClientId() {
        return Math.random().toString(36).substr(2, 9);
    }

    sendToUser(clientId, message) {
        const client = this.clients.get(clientId);
        if (client && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }

    broadcast(message) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

module.exports = WebSocketAdapter;
