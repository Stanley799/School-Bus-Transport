import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function TripAttendancePage() {
  const { tripId } = useParams();
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState({}); // { student_id: "present" or "absent" }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/trips/${tripId}/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error loading students:', err));
  }, [tripId]);

  const handleChange = (studentId, newStatus) => {
    setStatus(prev => ({ ...prev, [studentId]: newStatus }));
  };

  const handleSubmit = async () => {
    const records = students.map(s => ({
      student_id: s.id,
      status: status[s.id] || 'absent' // default to absent if not marked
    }));

    try {
      await axios.post(`http://localhost:5000/api/attendance`, {
        tripId,
        records
      });
      alert("Attendance submitted successfully");
    } catch (err) {
      alert("Failed to submit attendance");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Attendance for Trip {tripId}</h2>
      {students.map(student => (
        <div key={student.id} className="flex items-center justify-between border-b py-2">
          <div>{student.student_fname} {student.student_lname} - {student.grade} {student.stream}</div>
          <div className="flex gap-2">
            <label>
              <input
                type="radio"
                name={`status-${student.id}`}
                value="present"
                onChange={() => handleChange(student.id, 'present')}
              /> Present
            </label>
            <label>
              <input
                type="radio"
                name={`status-${student.id}`}
                value="absent"
                onChange={() => handleChange(student.id, 'absent')}
              /> Absent
            </label>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Submit Attendance</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Start Trip</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">End Trip</button>
      </div>
    </div>
  );
}