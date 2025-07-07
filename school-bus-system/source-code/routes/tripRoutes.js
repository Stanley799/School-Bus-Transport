const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authenticate = require('../middlewares/authMiddleware');

// Specific routes must come before parameterized ones
router.get('/reports', authenticate, tripController.getTripReports); // ✅ moved above /:id

// Regular CRUD operations
router.post('/', authenticate, tripController.createTrip);
router.get('/', authenticate, tripController.getAllTrips);
router.get('/:id', authenticate, tripController.getTripById); // this must stay last
router.put('/:id', authenticate, tripController.updateTrip);
router.delete('/:id', authenticate, tripController.deleteTrip);

module.exports = router;
