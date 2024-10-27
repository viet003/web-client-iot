class WebSocketService {
    constructor() {
        this.socket = null;
        this.onOpenCallback = null;
    }

    connect(url) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
            if (this.onOpenCallback) {
                this.onOpenCallback();
            }
        };

        this.socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        this.socket.onerror = (error) => {
            console.log("WebSocket error:", error);
        };
    }

    // Thiết lập callback cho sự kiện mở kết nối WebSocket
    onOpen(callback) {
        this.onOpenCallback = callback;
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn("WebSocket is not open. Message not sent:", message);
        }
    }

    onMessage(callback) {
        if (this.socket) {
            this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                callback(message);
            };
        } else {
            console.warn("WebSocket is not initialized. Cannot set onMessage callback.");
        }
    }
}

export default new WebSocketService();
