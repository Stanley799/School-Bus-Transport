import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('Logging in...');

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);

      toast.success('Login successful!');
      window.location.href = '/'; // redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
      toast.error(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-sm text-center text-red-400">{error}</p>}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold">
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
}
