import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function MessagesPage() {
  const [formData, setFormData] = useState({ content: '', receiver_id: '' });
  const [drivers, setDrivers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await api.get('/drivers');
        setDrivers(res.data);
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setStatus('Error fetching drivers');
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!formData.receiver_id) return;
      try {
        const res = await api.get(`/message/conversation/${formData.receiver_id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error loading messages:", err);
        setStatus('Error loading messages');
      }
    };

    fetchMessages();
  }, [formData.receiver_id]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await api.post('/message', formData);
      setFormData({ ...formData, content: '' });

      const res = await api.get(`/message/conversation/${formData.receiver_id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-xl font-bold text-center">Messages</h1>

        {/* Select Driver */}
        <select
          name="receiver_id"
          value={formData.receiver_id}
          onChange={(e) => setFormData({ ...formData, receiver_id: e.target.value })}
          className="w-full bg-gray-700 p-2 rounded"
        >
          <option value="">Select Driver</option>
          {drivers.map((d) => (
            <option key={d.user_id} value={d.user_id}>
              {d.driver_fname} {d.driver_lname}
            </option>
          ))}
        </select>

        {/* Chat Box */}
        <div className="bg-gray-800 p-4 rounded h-80 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.message_id}
              className={`mb-2 p-2 rounded ${
                msg.sender_id === user.id
                  ? 'bg-blue-600 text-right ml-auto max-w-sm'
                  : 'bg-gray-600 text-left max-w-sm'
              }`}
            >
              {msg.content}
              <div className="text-xs text-gray-300">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Message Form */}
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 p-2 rounded"
            required
          />
          <button className="bg-blue-600 p-2 rounded">Send</button>
        </form>

        {status && <p className="text-red-400 text-sm text-center">{status}</p>}
      </div>
    </div>
  );
}
