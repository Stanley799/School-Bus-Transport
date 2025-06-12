const Bus = require('../models/busModel');

exports.createBus = async (req, res) => {
  const { number_plate, status, capacity, driver_id } = req.body;
  try {
    const bus = await Bus.createBus(number_plate, status, capacity, driver_id);
    res.status(201).json(bus);
  } catch (error) {
    console.error('Error creating bus:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.getAllBuses();
    res.status(200).json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getBusById = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.getBusById(id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(bus);
  } catch (error) {
    console.error('Error fetching bus by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateBus = async (req, res) => {
  const { id } = req.params;
  const { number_plate, status, capacity, driver_id } = req.body;
  try {
    const bus = await Bus.updateBus(id, number_plate, status, capacity, driver_id);
    res.status(200).json(bus);
  } catch (error) {
    console.error('Error updating bus:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteBus = async (req, res) => {
  const { id } = req.params;
  try {
    await Bus.deleteBus(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting bus:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
