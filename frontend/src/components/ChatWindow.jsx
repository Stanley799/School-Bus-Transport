import { useState, useEffect } from 'react';
import api from '../utils/api'; // ✅ Use centralized Axios instance

export default function ChatWindow({ otherUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await api.get(`/message/conversation/${otherUserId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load conversation:", err);
      }
    };

    fetchConversation();
  }, [otherUserId]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await api.post('/message', {
        receiver_id: otherUserId,
        content: newMsg
      });

      setMessages([...messages, {
        sender_id: user.id,
        receiver_id: otherUserId,
        content: newMsg,
        timestamp: new Date()
      }]);
      setNewMsg('');
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="h-full p-4 bg-gray-900 text-white rounded shadow-md flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded max-w-xs ${
              msg.sender_id === user.id
                ? 'bg-blue-600 self-end text-right'
                : 'bg-gray-700 self-start text-left'
            }`}
          >
            <p>{msg.content}</p>
            <small className="text-gray-300 text-xs">{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          required
        />
        <button type="submit" className="ml-2 bg-blue-500 px-4 py-2 rounded text-white">
          Send
        </button>
      </form>
    </div>
  );
}
