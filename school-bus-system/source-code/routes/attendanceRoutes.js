const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const pool = require('../db_node');
const authenticate = require('../middlewares/authMiddleware');


router.post("/attendance", authenticate, attendanceController.markAttendance);
router.post('/', authenticate, attendanceController.createAttendance);
router.get('/', authenticate, attendanceController.getAllAttendance);
router.get('/:id', authenticate, attendanceController.getAttendanceById);
router.put('/:id', authenticate, attendanceController.updateAttendance);
router.delete('/:id', authenticate, attendanceController.deleteAttendance);
router.get('/trip/:tripId', authenticate, attendanceController.getAttendanceByTripId);

module.exports = router;
