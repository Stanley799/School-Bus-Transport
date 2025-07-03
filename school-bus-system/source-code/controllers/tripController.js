const tripModel = require('../models/tripModel');
const pool = require('../db_node');

const createTrip = async (req, res) => {
  try {
    const trip = await tripModel.createTrip(req.body);
    res.status(201).json(trip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllTrips = async (req, res) => {
  try {
    const result = await pool.query(`
 SELECT 
  t.id, t.trip_name, t.start, t.stop, t.trip_date, t.status,
  b.bus_name, b.number_plate,
  r.route_name, r.estimated_time,
  d.driver_fname, d.driver_lname,
  u.phone AS driver_phone
FROM trip t
JOIN bus b ON t.bus_id = b.id
JOIN route r ON t.route_id = r.id
JOIN drivers d ON t.driver_id = d.id
JOIN users u ON d.user_id = u.id;

    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching trips", err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await tripModel.getTripById(req.params.id);
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await tripModel.updateTrip(req.params.id, req.body);
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await tripModel.deleteTrip(req.params.id);
    if (trip) {
      res.json({ message: 'Trip deleted successfully' });
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//for the attendance
const getStudentsForTrip = async (req, res) => {
  const { tripId } = req.params;
  try {
    const result = await pool.query(`
      SELECT s.id, s.student_fname, s.student_lname, s.grade, s.stream
      FROM students s
      JOIN parents p ON s.parent_id = p.id
      JOIN trip t ON t.trip_id = $1
    `, [tripId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching trip students", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
