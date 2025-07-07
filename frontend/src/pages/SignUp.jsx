// src/pages/SignUp.jsx
import { useState } from 'react';
import api from '../utils/api';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'parent',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('Creating account...');

    try {
      const res = await api.post('/auth/signup', formData);
      const { token, user } = res.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', user.role);
      sessionStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'parent') window.location.href = '/parent';
      else if (user.role === 'driver') window.location.href = '/driver';
      else if (user.role === 'administrator') window.location.href = '/admin';
      else window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-sm text-center text-red-400">{error}</p>}

        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />
        <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />

        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
          <option value="parent">Parent</option>
          <option value="driver">Driver</option>
          <option value="administrator">Administrator</option>
        </select>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded font-semibold">Sign Up</button>
      </form>
    </div>
  );
}
