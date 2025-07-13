const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authenticate = require('../middlewares/authMiddleware');

router.use(authenticate);

router.get('/reports', tripController.getTripReports);
router.post('/', tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/trip/:tripId/students', tripController.getStudentsByTripId);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);
router.post('/:tripId/start', tripController.startTrip);
router.post('/:tripId/end', tripController.endTrip);


module.exports = router;
