// src/pages/StudentsPage.jsx
import { useNavigate } from 'react-router-dom';

export default function StudentsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">Student Dashboard</h2>

        <div className="bg-gray-800 p-6 rounded-lg shadow mb-6">
          <p className="text-gray-300 mb-4">
            This section will allow you to add, edit, and manage student details. Try...
          </p>
          <button
            onClick={() => navigate('/students/add')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add New Student
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-300 mb-4">
            This section allows you to view the student list...
          </p>
          <button
            onClick={() => navigate('/students/list')}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            View Student List
          </button>
        </div>
      </div>
    </div>
  );
}
