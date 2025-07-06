import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentsListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">Students List</h2>

      {loading ? (
        <p className="text-gray-400">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-red-400">No students found.</p>
      ) : (
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student.student_id}
              className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700"
            >
              <p><strong>Name:</strong> {student.student_fname} {student.student_lname}</p>
              <p><strong>Stream:</strong> {student.stream}</p>
              <p><strong>Admission #:</strong> {student.admission}</p>
              <p><strong>Parent ID:</strong> {student.parent_id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
