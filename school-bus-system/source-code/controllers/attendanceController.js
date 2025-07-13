const pool = require('../db_node');
const attendanceModel = require('../models/attendanceModel');

// Save list of students for a trip
const addStudentsToAttendanceList = async (req, res) => {
  const { tripId } = req.params;
  const { studentIds } = req.body;

  if (!Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ message: 'studentIds must be a non-empty array' });
  }

  try {
    await pool.query('BEGIN');

    for (const studentId of studentIds) {
      await pool.query(`
        INSERT INTO trip_attendance_list (trip_id, student_id)
        VALUES ($1, $2)
        ON CONFLICT (trip_id, student_id) DO NOTHING
      `, [tripId, studentId]);
    }

    await pool.query('COMMIT');

    res.status(201).json({ message: 'Students added to attendance list successfully' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error adding students to attendance list:', error);
    res.status(500).json({ message: 'Failed to add students to attendance list' });
  }
};

// Mark student present/absent for a trip
const markTripAttendance = async (req, res) => {
  const { tripId } = req.params;
  const { records } = req.body;

  try {
    for (const { student_id, status } of records) {
      await pool.query(`
        INSERT INTO attendance (trip_id, student_id, status)
        VALUES ($1, $2, $3)
        ON CONFLICT (trip_id, student_id)
        DO UPDATE SET status = EXCLUDED.status
      `, [tripId, student_id, status]);
    }

    res.status(200).json({ message: 'Attendance submitted successfully' });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ error: 'Failed to submit attendance' });
  }
};

// View attendance records
const getAllAttendance = async (req, res) => {
  try {
    const records = await attendanceModel.getAllAttendance();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records.' });
  }
};

const getAttendanceByTripId = async (req, res) => {
  const { tripId } = req.params;
  try {
    const result = await attendanceModel.getAttendanceByTripId(tripId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching attendance by trip.' });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await attendanceModel.getAttendanceById(id);
    if (!record) return res.status(404).json({ error: 'Record not found.' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance.' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await attendanceModel.updateAttendance(id, status);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance.' });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await attendanceModel.deleteAttendance(id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete attendance.' });
  }
};

module.exports = {
  addStudentsToAttendanceList,
  markTripAttendance,
  createAttendance: markTripAttendance,
  getAllAttendance,
  getAttendanceByTripId,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};
