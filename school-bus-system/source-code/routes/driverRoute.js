
const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect the GET route with auth middleware
router.get('/', authMiddleware, driverController.getAllDrivers);

// Other routes (add auth as needed)
router.post('/', driverController.createDriver);
router.get('/:id', authMiddleware, driverController.getDriverById);
router.put('/:id', authMiddleware, driverController.updateDriver);
router.delete('/:id', authMiddleware, driverController.deleteDriver);
router.get('/', authMiddleware, driverController.getAllDrivers);

module.exports = router;
