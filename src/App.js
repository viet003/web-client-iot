import { Header, Footer, Sectiontable } from "./components"
import { useState, useEffect } from 'react';
import WebSocketService from "./services/websocket";

function App() {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Kết nối đến WebSocket Server
    WebSocketService.connect(process.env.REACT_APP_WEBSOCKET_URL); 

    // Lắng nghe tin nhắn từ server
    WebSocketService.onMessage((message) => {
      console.log(message)
    });

    // Cleanup khi component bị hủy
    return () => {
      if (WebSocketService.socket) {
        WebSocketService.socket.close();
      }
    };
  }, []);


  useEffect(() => {
    console.log(isOpen);
    WebSocketService.sendMessage({
      action: "msg",
      type: "cmd",
      body: "Hello server",
    });
  }, [isOpen])

  return (
    <div className="flex flex-col">
      <Header />
      <div className="h-[67px]"></div>
      <Sectiontable isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </div>
  )
}

export default App