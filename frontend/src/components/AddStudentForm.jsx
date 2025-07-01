import { useState } from 'react'

export default function AddStudentForm({ onAdd }) {
  const [formData, setFormData] = useState({
    student_fname: '',
    student_lname: '',
    grade: '',
    stream: '',
    admission: ''
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
      !formData.grade ||
      !formData.stream ||
      !formData.admission
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
      grade: '',
      stream: '',
      admission: ''
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

<label className="block">
  <span className="text-gray-700">Grade</span>
  <select name="grade" onChange={handleChange} required className="input">
    <option value="">Select Grade</option>
    <option value="PP1">PP1</option>
    <option value="PP2">PP2</option>
    <option value="Grade 1">Grade 1</option>
    <option value="Grade 2">Grade 2</option>
    <option value="Grade 3">Grade 3</option>
    <option value="Grade 4">Grade 4</option>
    <option value="Grade 5">Grade 5</option>
    <option value="Grade 6">Grade 6</option>
  </select>
</label>

<label className="block">
  <span className="text-gray-700">Stream</span>
  <select name="stream" onChange={handleChange} required className="input">
    <option value="">Select Stream</option>
    <option value="North">North</option>
    <option value="South">South</option>
    <option value="East">East</option>
    <option value="West">West</option>
    <option value="Central">Central</option>
  </select>
</label>

      <input
        type="number"
        name="admission"
        value={formData.admission}
        onChange={handleChange}
        placeholder="Admission Number"
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
