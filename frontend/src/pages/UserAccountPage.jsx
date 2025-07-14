import { useEffect, useState } from 'react';
import { UserIcon } from "@heroicons/react/24/outline";

import api from '../utils/api'; // Assuming centralized Axios with token
import { useNavigate } from 'react-router-dom';

export default function UserAccountPage() {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get('/user/profile'); // e.g., /api/user/profile
        setUserData(res.data);
        setForm(res.data); // Pre-fill form for editing
      } catch (err) {
        setStatus('Failed to load profile');
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const saveChanges = async () => {
    try {
      await api.put('/user/profile', form);
      setStatus('Profile updated successfully.');
      setEditMode(false);
    } catch (err) {
      setStatus('Failed to update profile.');
    }
  };

  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      setStatus('New passwords do not match.');
      return;
    }
    try {
      await api.put('/user/change-password', passwords);
      setStatus('Password changed successfully.');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      setStatus(err.response?.data?.message || 'Error changing password.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-gray-800 p-6 rounded-md shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">My Account</h2>

      {status && (
        <p className="text-sm text-center mb-4 text-yellow-400">{status}</p>
      )}

      <div className="space-y-4">
        {/* Editable Fields */}
        <div>
          <label>Name</label>
          <input
            name="name"
            className="w-full bg-gray-700 p-2 rounded mt-1"
            value={form.name || ''}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            className="w-full bg-gray-700 p-2 rounded mt-1"
            value={form.email || ''}
            disabled
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            name="phone"
            className="w-full bg-gray-700 p-2 rounded mt-1"
            value={form.phone || ''}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>

        <div>
          <label>Role</label>
          <input
            className="w-full bg-gray-700 p-2 rounded mt-1"
            value={form.role || ''}
            disabled
          />
        </div>

        {editMode ? (
          <button onClick={saveChanges} className="bg-blue-500 hover:bg-blue-600 w-full p-2 rounded">
            Save Changes
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-green-500 hover:bg-green-600 w-full p-2 rounded">
            Edit Profile
          </button>
        )}
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-600" />

      {/* Password Change Section */}
      <h3 className="text-lg font-semibold">Change Password</h3>
      <div className="space-y-3">
        <input
          type="password"
          name="current"
          placeholder="Current Password"
          className="w-full bg-gray-700 p-2 rounded"
          value={passwords.current}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          name="new"
          placeholder="New Password"
          className="w-full bg-gray-700 p-2 rounded"
          value={passwords.new}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm New Password"
          className="w-full bg-gray-700 p-2 rounded"
          value={passwords.confirm}
          onChange={handlePasswordChange}
        />
        <button onClick={changePassword} className="bg-yellow-500 hover:bg-yellow-600 w-full p-2 rounded">
          Update Password
        </button>
      </div>
    </div>
  );
}
