import { useState } from 'react'

export default function StudentsListPage() {
  const [students] = useState([
    { name: 'John Doe', age: 10, grade: '5th' },
    { name: 'Jane Smith', age: 11, grade: '6th' },
  ])

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Students List</h2>
      <ul className="list-disc list-inside">
        {students.map((student, idx) => (
          <li key={idx}>
            {student.name} — Age: {student.age} — Grade: {student.grade}
          </li>
        ))}
      </ul>
    </div>
  )
}
