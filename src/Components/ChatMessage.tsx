type MessageProps = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  botImage: string; 
};

const ChatMessage: React.FC<MessageProps> = ({ id, text, sender, botImage }) => {
  return (
    <div
      key={id}
      className={`flex items-center ${sender === 'user' ? 'justify-end' : 'justify-start'} p-2`}
    >
      {sender === 'bot' && (
        <img src={botImage} alt='Bot' className='w-6 h-6 mr-2' />
      )}
      <span
        className={`inline-block px-4 py-2 rounded-lg ${
          sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default ChatMessage;
