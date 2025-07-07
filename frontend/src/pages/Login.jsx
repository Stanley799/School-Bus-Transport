import { useState } from 'react';
import api from '../utils/api'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('Logging in...');

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      sessionStorage.setItem('token', token);
      localStorage.setItem('token', token); // ← this persists across sessions

      sessionStorage.setItem('role', user.role);
      localStorage.setItem('role', user.role);


      if (user.role === 'parent') window.location.href = '/parent';
      else if (user.role === 'driver') window.location.href = '/driver';
      else if (user.role === 'administrator') window.location.href = '/admin';
      else window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
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

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
