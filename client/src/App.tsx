import "./App.css";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "./constants/constant";
import Messages from "./components/chat/Messages.component";
import MessageInput from "./components/chat/MessageInput.component";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("message", messageListener);

    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  return (
    <div className="App">
      <MessageInput send={send} />
      <Messages messages={messages} />
    </div>
  );
}

export default App;
