import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'parent',
    fname: '',
    lname: '',
    address: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // 1. Send signup data to backend
      await axios.post('http://localhost:5000/api/auth/signup', formData);

      // 2. Automatically log the user in
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = loginRes.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      // 3. Redirect based on role
      if (user.role === 'parent') window.location.href = '/parent';
      else if (user.role === 'driver') window.location.href = '/driver';
      else if (user.role === 'administrator') window.location.href = '/admin';
    } catch (err) {
      setMessage(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {message && <p className="text-sm text-center text-red-500">{message}</p>}

        <input
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          className="input w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="email"
          value={formData.email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="input w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="password"
          value={formData.password}
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="input w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
          className="input w-full p-2 border border-gray-300 rounded"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input w-full p-2 border border-gray-300 rounded"
        >
          <option value="parent">Parent</option>
          <option value="driver">Driver</option>
          <option value="administrator">Administrator</option>
        </select>

        <input
          name="fname"
          value={formData.fname}
          placeholder="First Name"
          onChange={handleChange}
          className="input w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="lname"
          value={formData.lname}
          placeholder="Last Name"
          onChange={handleChange}
          className="input w-full p-2 border border-gray-300 rounded"
          required
        />

        {formData.role === 'parent' && (
          <input
            name="address"
            value={formData.address}
            placeholder="Address (only for parents)"
            onChange={handleChange}
            className="input w-full p-2 border border-gray-300 rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
