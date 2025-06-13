const pool = require('../../db_node');


const createStudent = async (student) => {
  const { student_fname, student_lname, stream, admission, parent_id } = student;
  const result = await pool.query(
    `INSERT INTO students (student_fname, student_lname, stream, admission, parent_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [student_fname, student_lname, stream, admission, parent_id]
  );
  return result.rows[0];
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
