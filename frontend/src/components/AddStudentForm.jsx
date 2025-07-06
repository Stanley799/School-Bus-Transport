import { useState } from 'react';

export default function AddStudentForm({ onAdd }) {
  const [formData, setFormData] = useState({
    student_fname: '',
    student_lname: '',
    grade: '',
    stream: '',
    admission: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.student_fname ||
      !formData.student_lname ||
      !formData.grade ||
      !formData.stream ||
      !formData.admission
    ) {
      alert('Please fill in all fields');
      return;
    }

    onAdd(formData);

    setFormData({
      student_fname: '',
      student_lname: '',
      grade: '',
      stream: '',
      admission: ''
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-gray-800 text-white shadow p-6 rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-blue-400">Add New Student</h2>

      <input
        type="text"
        name="student_fname"
        value={formData.student_fname}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400"
      />

      <input
        type="text"
        name="student_lname"
        value={formData.student_lname}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400"
      />

      <label className="block">
        <span className="text-gray-300">Grade</span>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 text-white"
          required
        >
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
        <span className="text-gray-300">Stream</span>
        <select
          name="stream"
          value={formData.stream}
          onChange={handleChange}
          className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 text-white"
          required
        >
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
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
