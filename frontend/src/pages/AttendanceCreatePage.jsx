import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function AttendanceCreatePage() {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/students')
      .then(res => setStudents(res.data || []))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  const toggleSelection = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleFinish = async () => {
    const trip = JSON.parse(sessionStorage.getItem('pendingTrip')) || {};
    const tripId = trip.tripId;

    if (!tripId) {
      alert("Trip ID missing — please create the trip first.");
      return;
    }

    try {
      await api.post(`attendance/trip/${tripId}/attendance-list`, {
        studentIds: selectedIds,
      });

      // Save updated session state
      sessionStorage.setItem('pendingTrip',
        JSON.stringify({ ...trip, attendanceCreated: true, attendanceList: selectedIds }));

      navigate('/trips/add');
    } catch (error) {
      console.error('Failed to submit attendance list:', error);
      alert('Failed to save attendance list.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold text-center">Select Students for Attendance</h2>

      <div className="max-w-xl mx-auto space-y-3 mt-4">
        {students.map(s => (
          <div
            key={s.id}
            className={`flex justify-between items-center p-4 rounded border
              ${selectedIds.includes(s.id) ? 'bg-green-600' : 'bg-gray-800'}`}
          >
            <span>{s.student_fname} {s.student_lname}</span>
            <button
              onClick={() => toggleSelection(s.id)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white"
            >
              {selectedIds.includes(s.id) ? 'Deselect' : 'Select'}
            </button>
          </div>
        ))}
      </div>

      {selectedIds.length > 0 && (
        <div className="max-w-xl mx-auto mt-6">
          <button
            onClick={handleFinish}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
          >
            Add Students to Trip
          </button>
        </div>
      )}
    </div>
  );
}
