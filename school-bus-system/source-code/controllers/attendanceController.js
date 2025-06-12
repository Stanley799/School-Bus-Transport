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

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};
