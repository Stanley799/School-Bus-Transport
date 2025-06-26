import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    sender_id: '',
    receiver_id: '',
    message_content: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/message')
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Error fetching messages:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/message', formData)
      .then((res) => {
        alert('Message sent');
        setMessages([...messages, res.data]);
        setFormData({ sender_id: '', receiver_id: '', message_content: '' });
      })
      .catch((err) => console.error('Sending failed:', err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="number"
          name="sender_id"
          placeholder="Sender ID"
          value={formData.sender_id}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <input
          type="number"
          name="receiver_id"
          placeholder="Receiver ID"
          value={formData.receiver_id}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <textarea
          name="message_content"
          placeholder="Type a message..."
          value={formData.message_content}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>

      <div>
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded mb-2">
            <p><strong>From:</strong> {msg.sender_id} <strong>To:</strong> {msg.receiver_id}</p>
            <p>{msg.message_content}</p>
            <p className="text-xs text-gray-500">{msg.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
