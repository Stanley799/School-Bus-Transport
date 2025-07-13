const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authenticate = require('../middlewares/authMiddleware');

router.use(authenticate);

// Attendance list creation
router.post('/trip/:tripId/attendance-list', attendanceController.addStudentsToAttendanceList);

// Mark attendance
router.post('/trip/:tripId/attendance', attendanceController.markTripAttendance);


// View attendance
router.get('/', attendanceController.getAllAttendance);
router.get('/:id', attendanceController.getAttendanceById);
router.get('/trip/:tripId', attendanceController.getAttendanceByTripId);

// Edit/delete attendance records
router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
