const pool = require('../../db_node');


// Create a new attendance record
const createAttendance = async (trip_id, student_id, status) => {
  const query = `
    INSERT INTO attendance (trip_id, student_id, status)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [trip_id, student_id, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all attendance records
const getAllAttendance = async () => {
  const result = await pool.query('SELECT * FROM attendance');
  return result.rows;
};

// Get attendance by ID
const getAttendanceById = async (id) => {
  const result = await pool.query('SELECT * FROM attendance WHERE id = $1', [id]);
  return result.rows[0];
};

// Update attendance
const updateAttendance = async (id, status) => {
  const query = `
    UPDATE attendance SET status = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [status, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete attendance
const deleteAttendance = async (id) => {
  await pool.query('DELETE FROM attendance WHERE id = $1', [id]);
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};
