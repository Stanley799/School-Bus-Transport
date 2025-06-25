import { useState } from 'react'

export default function AddStudentForm({ onAdd }) {
  const [formData, setFormData] = useState({
    student_fname: '',
    student_lname: '',
    stream: '',
    admission: '',
    parent_id: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    if (
      !formData.student_fname ||
      !formData.student_lname ||
      !formData.stream ||
      !formData.admission ||
      !formData.parent_id
    ) {
      alert('Please fill in all fields')
      return
    }

    // Call parent handler
    onAdd(formData)

    // Clear form
    setFormData({
      student_fname: '',
      student_lname: '',
      stream: '',
      admission: '',
      parent_id: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow p-6 rounded space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600">Add New Student</h2>

      <input
        type="text"
        name="student_fname"
        value={formData.student_fname}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="student_lname"
        value={formData.student_lname}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="stream"
        value={formData.stream}
        onChange={handleChange}
        placeholder="Stream"
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="admission"
        value={formData.admission}
        onChange={handleChange}
        placeholder="Admission Number"
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="parent_id"
        value={formData.parent_id}
        onChange={handleChange}
        placeholder="Parent ID"
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  )
}
