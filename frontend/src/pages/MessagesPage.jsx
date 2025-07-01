import { useState } from 'react';
import axios from 'axios';

export default function MessagePage() {
  const [formData, setFormData] = useState({
    content: '',
    receiver_id: '',
  });

  const [status, setStatus] = useState('');
  const [user, setUser] = useState(() => {
    // Parse user info (saved during login/signup)
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return setStatus('You must be logged in to send messages.');
      }

      // Add sender_id automatically from the logged-in user
      const messagePayload = {
        content: formData.content,
        sender_id: user.id,
        receiver_id: formData.receiver_id,
      };

      const res = await axios.post('http://localhost:5000/api/message', messagePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus('Message sent successfully');
      setFormData({ content: '', receiver_id: '' });
    } catch (error) {
      console.error(error);
      setStatus(error.response?.data?.message || 'Error sending message');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Send Message</h1>
      {status && <p className="text-red-500">{status}</p>}
      <form onSubmit={handleSend} className="space-y-4">
        <textarea
          name="content"
          placeholder="Enter your message"
          value={formData.content}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          name="receiver_id"
          placeholder="Receiver ID"
          value={formData.receiver_id}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
