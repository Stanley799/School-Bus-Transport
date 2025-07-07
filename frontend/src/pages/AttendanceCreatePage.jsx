import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // ✅ Import centralized axios instance

export default function AttendanceCreatePage() {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  const toggle = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleFinish = () => {
    const trip = JSON.parse(sessionStorage.getItem('pendingTrip')) || {};
    sessionStorage.setItem('pendingTrip',
      JSON.stringify({ ...trip, attendanceCreated: true, attendanceList: selectedIds }));
    navigate('/trips/add');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold text-center">Select Students for Attendance</h2>
      <div className="max-w-xl mx-auto space-y-3 mt-4">
        {students.map(s => (
          <div
            key={s.id || s.student_id}
            className={`flex justify-between items-center p-4 rounded border
              ${selectedIds.includes(s.id || s.student_id) ? 'bg-green-600' : 'bg-gray-800'}`}
          >
            <span>{s.student_fname} {s.student_lname}</span>
            <button
              className="btn-blue"
              onClick={() => toggle(s.id || s.student_id)}
            >
              {selectedIds.includes(s.id || s.student_id) ? 'Deselect' : 'Select'}
            </button>
          </div>
        ))}
      </div>

      {selectedIds.length > 0 && (
        <div className="max-w-xl mx-auto mt-6">
          <button onClick={handleFinish} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded">
            Add Students to Trip
          </button>
        </div>
      )}
    </div>
  );
}
