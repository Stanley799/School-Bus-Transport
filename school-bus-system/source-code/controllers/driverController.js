const driverModel = require('../models/driverModel');

// Create
async function createDriver(req, res) {
  try {
    const driver = await driverModel.createDriver(req.body);
    res.status(201).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating driver');
  }
}

// Read all
async function getAllDrivers(req, res) {
  try {
    const drivers = await driverModel.getAllDrivers();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching drivers');
  }
}

// Read one
async function getDriverById(req, res) {
  try {
    const driver = await driverModel.getDriverById(req.params.id);
    if (!driver) {
      return res.status(404).send('Driver not found');
    }
    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching driver');
  }
}

// Update
async function updateDriver(req, res) {
  try {
    const updated = await driverModel.updateDriver(req.params.id, req.body);
    if (!updated) {
      return res.status(404).send('Driver not found');
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating driver');
  }
}

// Delete
async function deleteDriver(req, res) {
  try {
    const deleted = await driverModel.deleteDriver(req.params.id);
    if (!deleted) {
      return res.status(404).send('Driver not found');
    }
    res.json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting driver');
  }
}

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
