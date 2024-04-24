import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const Chat = ({ send, msg }: { send: any; msg: any }) => {
  const messageListRef: any = useRef(null);
  
  const [messages, setMessages] = useState<
    { username: string; message: string; timestamp: string; }[]
  >([]);

  useEffect(() => {
    if (msg !== null && msg.type === "message") {
      setMessages([
        ...messages,
        {
          username: msg.payload.username!,
          message: msg.payload.message!,
          timestamp: msg.payload.timestamp!,
        },
      ]);
    }
  }, [msg]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView()
    }
  }, [messages])

  const handleSendMessage = (message: string) => {
    send({
      type: "message",
      payload: {
        username: localStorage.getItem("name"),
        message,
        timestamp: Date.now(),
      },
    });
  };

  return (
    <div className="flex-cols h-full w-full">
      <div className="flex flex-col bg-stone-900 h-[70vh] w-full rounded-lg overflow-hidden relative">
        <div className="p-3 overflow-y-scroll h-full">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.username}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messageListRef}></div>
        </div>
      </div>
      <div className="px-4 py-2 shadow-lg mt-4 bg-stone-900 rounded-full">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
