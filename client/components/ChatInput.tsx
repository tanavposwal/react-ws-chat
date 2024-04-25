import { useState } from 'react';

const ChatInput = ({ onSendMessage, onTyping }: { onSendMessage: (message: string) => void; onTyping: (message: string) => void; }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onTyping("");
    if (message.trim() !== '') {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="items-center flex">
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type a message..."
        className="flex-3 bg-transparent p-1 focus:outline-none w-full"
      />
      <button type="submit" className="flex-1 px-3 py-1 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
      ➤
      </button>
    </form>
  );
};

export default ChatInput;
