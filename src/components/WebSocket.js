import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const WebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  // WebSocket bağlantısını kur
  const socket = new SockJS("/ws");
  const stompClient = Stomp.over(socket);

  useEffect(() => {
    stompClient.connect({}, () => {
      setConnected(true);
      // Mesajları dinlemek için abone ol
      stompClient.subscribe("/topic/greetings", (message) => {
        setReceivedMessage(JSON.parse(message.body));
      });
    });

    // Component unmount olduğunda WebSocket bağlantısını kapat
    return () => {
      stompClient.disconnect();
      setConnected(false);
    };
  }, []);

  const sendMessage = () => {
    // WebSocket üzerinden mesaj gönder
    stompClient.send("/app/hello", {}, message);
  };

  return (
    <div>
      {connected ? (
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Gönder</button>
          <p>Alınan Mesaj: {receivedMessage}</p>
        </div>
      ) : (
        <p>Bağlanılıyor...</p>
      )}
    </div>
  );
};

export default WebSocket;
