import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const Chat = ({ send, msg }: { send: any; msg: any }) => {
  const messageListRef: any = useRef(null);

  const [messages, setMessages] = useState<
    { username: string; message: string; timestamp: string }[]
  >([]);
  const [liveType, setLiveType] = useState<{
    username: string;
    message: string;
  }>();

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
    if (msg !== null && msg.type === "typing") {
      setLiveType(msg.payload);
    }
  }, [msg]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView();
    }
  }, [messages]);

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

  const handleTyping = (message: string) => {
    send({
      type: "typing",
      payload: {
        username: localStorage.getItem("name"),
        message,
      },
    });
  };

  return (
    <div className="flex-cols h-full w-full">
      <div className="w-full bg-stone-900 px-4 py-1 rounded-lg my-2">
        {liveType?.message != "" ? (
          <div className="flex gap-2 items-top">
            <p className="text-md font-bold text-white/50">
              {liveType?.username}
            </p>
            <p className="text-green-500 text-xs mt-1 animate-pulse">
              typing ...
            </p>
          </div>
        ) : (<div className="flex gap-2 items-top">
        <p className="text-md text-white/50">
          end to end encrypted
        </p>
      </div>)}
      </div>

      <div className="flex flex-col bg-stone-900 h-[65vh] w-full rounded-lg overflow-hidden relative">
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

      <div className="px-4 py-2 shadow-lg bg-stone-900 rounded-full mt-3">
        <ChatInput onTyping={handleTyping} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
