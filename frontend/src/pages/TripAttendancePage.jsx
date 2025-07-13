import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export default function TripAttendancePage() {
  const { tripId } = useParams();
  const [students, setStudents] = useState([]);
  const [tripName, setTripName] = useState(''); // ✅
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [tripStarted, setTripStarted] = useState(false);
  const [tripEnded, setTripEnded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, tripRes] = await Promise.all([
          api.get(`/trip/${tripId}/students`),
          api.get(`/trip/${tripId}`)
        ]);

        const list = studentsRes.data || [];
        setStudents(list);

        const defaultStatus = {};
        list.forEach(s => {
          defaultStatus[s.id] = 'absent';
        });
        setStatus(defaultStatus);

        setTripName(tripRes.data.trip_name || `Trip ${tripId}`); // ✅
      } catch (err) {
        console.error('Error fetching trip data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId]);

  const handleChange = (studentId, newStatus) => {
    setStatus(prev => ({
      ...prev,
      [studentId]: newStatus
    }));
  };

  const handleStartTrip = async () => {
    try {
      await api.post(`/trip/${tripId}/start`);
      alert('Trip started!');
      setTripStarted(true);
    } catch (err) {
      console.error('Failed to start trip:', err);
      alert('Failed to start trip.');
    }
  };

  const handleEndTrip = async () => {
    try {
      await api.post(`/trip/${tripId}/end`);
      alert('Trip ended!');
      setTripEnded(true);
    } catch (err) {
      console.error('Failed to end trip:', err);
      alert('Failed to end trip.');
    }
  };

  const handleSubmit = async () => {
    if (!tripStarted || !tripEnded) {
      alert('You must start and end the trip before submitting attendance.');
      return;
    }

    const records = students.map(s => ({
      student_id: s.id,
      status: status[s.id] || 'absent',
    }));

    try {
      await api.post(`/attendance/trip/${tripId}/attendance`, { records });
      alert('Attendance submitted successfully.');
    } catch (err) {
      console.error('Failed to submit attendance:', err);
      alert('Attendance submission failed.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 shadow-md rounded mt-6 text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Mark Attendance for {tripName} {/* ✅ changed */}
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-400">No students assigned to this trip.</p>
      ) : (
        students.map(student => (
          <div key={student.id} className="flex justify-between items-center border-b border-gray-700 py-3">
            <div className="text-lg">
              {student.student_fname} {student.student_lname} - Grade {student.grade} {student.stream}
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`status-${student.id}`}
                  value="present"
                  checked={status[student.id] === 'present'}
                  onChange={() => handleChange(student.id, 'present')}
                />
                Present
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`status-${student.id}`}
                  value="absent"
                  checked={status[student.id] === 'absent'}
                  onChange={() => handleChange(student.id, 'absent')}
                />
                Absent
              </label>
            </div>
          </div>
        ))
      )}

      {students.length > 0 && (
        <div className="flex justify-around mt-8">
          <button
            onClick={handleStartTrip}
            disabled={tripStarted}
            className={`px-6 py-2 rounded font-semibold ${
              tripStarted ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {tripStarted ? 'Trip Started' : 'Start Trip'}
          </button>

          <button
            onClick={handleEndTrip}
            disabled={!tripStarted || tripEnded}
            className={`px-6 py-2 rounded font-semibold ${
              tripEnded ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            {tripEnded ? 'Trip Ended' : 'End Trip'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={!tripStarted || !tripEnded}
            className={`px-6 py-2 rounded font-semibold ${
              tripStarted && tripEnded
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-500'
            } text-white`}
          >
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
}
