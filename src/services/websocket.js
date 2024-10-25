// WebSocketService.js
class WebSocketService {
    constructor() {
        this.socket = null;
    }

    connect(url) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
        };

        this.socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        this.socket.onerror = (error) => {
            console.log("WebSocket error:", error);
        };
    }

    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }

    onMessage(callback) {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            callback(message);
        };
    }
}

export default new WebSocketService();
