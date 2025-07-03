const attendanceModel = require('../models/attendanceModel');

const createAttendance = async (req, res) => {
  try {
    const { trip_id, student_id, status } = req.body;
    const newRecord = await attendanceModel.createAttendance(trip_id, student_id, status);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attendance record.' });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const records = await attendanceModel.getAllAttendance();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records.' });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await attendanceModel.getAttendanceById(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found.' });
    }
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

//for storing attendance record 
const markAttendance = async (req, res) => {
  const { tripId, records } = req.body;
  try {
    const queries = records.map(r =>
      pool.query(
        'INSERT INTO attendance (trip_id, student_id, status) VALUES ($1, $2, $3)',
        [tripId, r.student_id, r.status]
      )
    );
    await Promise.all(queries);
    res.json({ message: 'Attendance saved successfully' });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};
