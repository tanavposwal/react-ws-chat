// ChatMessage.tsx

interface ChatMessageProps {
  message: string;
  sender: string;
  timestamp: string;
}

const ChatMessage = ({ message, sender, timestamp }: ChatMessageProps) => {
  const convertTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    const meridiem = hours >= 12 ? "pm" : "am";
    if (minutes < 10) return `${hours % 12}:0${minutes} ${meridiem}`;
    return `${hours % 12}:${minutes} ${meridiem}`;
  };

  return (
    <div className="flex flex-col border-l-2 pl-2 border-stone-600 mt-2 msg">
      <div className="flex gap-2 items-top">
        <p className="text-md font-bold">{sender}</p>
        <p className="text-gray-500 text-xs mt-1">
          {convertTimestamp(timestamp)}
        </p>
      </div>
      <p className="text-white -mt-1">{message}</p>
    </div>
  );
};

export default ChatMessage;
