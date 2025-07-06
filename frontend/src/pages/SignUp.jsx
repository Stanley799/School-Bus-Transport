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
      await axios.post('http://localhost:5000/api/auth/signup', formData);

      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = loginRes.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'parent') window.location.href = '/parent';
      else if (user.role === 'driver') window.location.href = '/driver';
      else if (user.role === 'administrator') window.location.href = '/admin';
    } catch (err) {
      setMessage(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <form
        onSubmit={handleSignUp}
        className="bg-gray-900 text-white p-8 rounded-lg shadow-2xl w-full max-w-lg space-y-5 border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-400">Create Account</h2>

        {message && <p className="text-sm text-red-500 text-center">{message}</p>}

        <div className="space-y-2">
          <input
            name="name"
            value={formData.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="input-dark"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={handleChange}
            className="input-dark"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="input-dark"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            className="input-dark"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-dark"
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
            className="input-dark"
            required
          />
          <input
            name="lname"
            value={formData.lname}
            placeholder="Last Name"
            onChange={handleChange}
            className="input-dark"
            required
          />

          {formData.role === 'parent' && (
            <input
              name="address"
              value={formData.address}
              placeholder="Address (for Parents)"
              onChange={handleChange}
              className="input-dark"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-4 rounded text-white font-semibold shadow-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
