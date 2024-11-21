import { Sectiontable } from "../../components";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebSocketService from "../../services/websocket";
import useCheckLogin from "../../hooks/useCheckLogin";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = () => {
    if (WebSocketService.socket && WebSocketService.socket.readyState === WebSocketService.socket.OPEN) {
      WebSocketService.sendMessage({
        sender: "react",
        type: "get_data",
      });
    }
  }

  useEffect(() => {
    // Kết nối đến WebSocket Server
    WebSocketService.connect(process.env.REACT_APP_WEBSOCKET_URL);

    // Lắng nghe tin nhắn từ server và cập nhật `data`
    WebSocketService.onMessage((message) => {
      // const message = JSON.parse(message)
      console.log("Received message:", message);

      switch (message.sender) {
        case "react":
          switch (message.type) {
            case "get_data":
              setData(message?.body?.data);
              setIsLoading(false);
              break;
            default:
              break;
          }
          break;
        case "esp8266":
          switch (message.type) {
            case "cmd":
              setIsOpen(message?.body?.status ?? 1);
              getData();
              break;
            default:
              break;
          }
          break;
        case "server":
          switch (message.type) {
            case "error":
              toast.success(message?.body?.msg);
              break;
            case "warn":
              toast.warn(message?.body?.msg);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    });

    // Gửi yêu cầu `get_history` sau khi kết nối WebSocket mở thành công
    WebSocketService.onOpen(() => {
      getData();
    });

    // Cleanup khi component bị hủy
    return () => {
      if (WebSocketService.socket) {
        WebSocketService.socket.close();
      }
    };
  }, []);

  useEffect(() => {
    // Gửi tin nhắn khi `isOpen` thay đổi
    if (WebSocketService.socket && WebSocketService.socket.readyState === WebSocketService.socket.OPEN) {
      WebSocketService.sendMessage({
        sender: "react",
        type: "cmd",
        body: {
          status: isOpen ? 0 : 1,
        }
      });
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <Sectiontable isOpen={isOpen} setIsOpen={setIsOpen} data={data} isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}

export default App;
