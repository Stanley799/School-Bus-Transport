import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MessagesPage() {
  const [formData, setFormData] = useState({ content: '', receiver_id: '' });
  const [drivers, setDrivers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/drivers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrivers(res.data);
      } catch (err) {
        setStatus('Error fetching drivers');
      }
    };

    fetchDrivers();
  }, [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!formData.receiver_id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/message/conversation/${formData.receiver_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        setStatus('Error loading messages');
      }
    };

    fetchMessages();
  }, [formData.receiver_id]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/message', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ ...formData, content: '' }); // clear content only
      // re-fetch messages
      const res = await axios.get(`http://localhost:5000/api/message/conversation/${formData.receiver_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
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
                msg.sender_id === user.id ? 'bg-blue-600 text-right ml-auto max-w-sm' : 'bg-gray-600 text-left max-w-sm'
              }`}
            >
              {msg.content}
              <div className="text-xs text-gray-300">{new Date(msg.timestamp).toLocaleString()}</div>
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
