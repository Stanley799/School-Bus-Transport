import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MessagesPage() {
  const [formData, setFormData] = useState({
    content: '',
    receiver_id: '',
  });

  const [drivers, setDrivers] = useState([]);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem('token');//this gets token from localStorage
        if (!token) {
          setStatus('You must be logged in to send messages.');
          return;
        }
        const res = await axios.get('http://localhost:5000/api/drivers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDrivers(res.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setStatus('Failed to load drivers');
      }
    };

    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('');

    if (!user) {
      setStatus('You must be logged in to send messages.');
      return;
    }

    if (!formData.receiver_id) {
      setStatus('Please select a driver to send message.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const messagePayload = {
        content: formData.content,
        receiver_id: formData.receiver_id,
      };

      await axios.post('http://localhost:5000/api/message', messagePayload, {
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

        <select
          name="receiver_id"
          value={formData.receiver_id}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Select Driver</option>
          {drivers.map((driver) => (
            <option key={driver.user_id} value={driver.user_id}>
              {driver.driver_fname} {driver.driver_lname}
            </option>
          ))}
        </select>

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
