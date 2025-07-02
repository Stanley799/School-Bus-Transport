const pool = require('../db_node');


const createStudent = async (req, res) => {
  try {
    const student = await studentModel.createStudent(req.body);
    res.status(201).json({ message: 'Student created', student });
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllStudents = async () => {
  const result = await pool.query('SELECT * FROM students');
  return result.rows;
};

const getStudentById = async (id) => {
  const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0];
};

const updateStudent = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

  const result = await pool.query(
    `UPDATE students SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

const deleteStudent = async (id) => {
  const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
