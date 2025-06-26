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
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);

      // Automatically log the user in after sign up
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = loginRes.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      // Redirect based on role
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

        <input name="name" placeholder="Full Name" onChange={handleChange} className="input" required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="input" required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="input" required />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input" required />

        <select name="role" onChange={handleChange} className="input">
          <option value="parent">Parent</option>
          <option value="driver">Driver</option>
          <option value="administrator">Administrator</option>
        </select>

        <input name="fname" placeholder="First Name" onChange={handleChange} className="input" required />
        <input name="lname" placeholder="Last Name" onChange={handleChange} className="input" required />

        {formData.role === 'parent' && (
          <input
            name="address"
            placeholder="Address (only for parents)"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
