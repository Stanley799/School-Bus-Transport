import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'parent',
    phone: '',
    fname: '',
    lname: '',
    address: ''
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

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);

      toast.success('Account created successfully!');
      window.location.href = '/'; // go to homepage or dashboard
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed.';
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-sm text-center text-red-400">{error}</p>}

        <input name="fname" placeholder="First Name" value={formData.fname} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
        <input name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
        <input name="address" placeholder="Address (for parents)" value={formData.address} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" />

        <select name="role" value={formData.role} onChange={handleChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
          <option value="parent">Parent</option>
          <option value="driver">Driver</option>
          <option value="administrator">Administrator</option>
        </select>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded font-semibold">
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}
