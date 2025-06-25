import { useNavigate } from 'react-router-dom'
import AddStudentForm from '../components/AddStudentForm'

export default function AddStudentPage() {
  const navigate = useNavigate()

  const handleAddStudent = async (studentData) => {
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      })

      if (response.ok) {
        alert('Student added successfully!')
        navigate('/students') // redirect back
      } else {
        const error = await response.json()
        alert('Error: ' + error.message)
      }
    } catch (err) {
      alert('Server Error: ' + err.message)
    }
  }

  return (
    <div className="p-10">
      <AddStudentForm onAdd={handleAddStudent} />
    </div>
  )
}
