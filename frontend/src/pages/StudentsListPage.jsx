import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentsListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch students from backend API
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student'); // Make sure this route works
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
    <div className="p-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Students List</h2>

      {loading ? (
        <p className="text-gray-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-red-500">No students found.</p>
      ) : (
        <ul className="space-y-3">
          {students.map((student) => (
            <li key={student.student_id} className="bg-white shadow p-4 rounded">
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

