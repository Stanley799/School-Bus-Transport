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
      JOIN users u ON d.user_id = u.id
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
    if (trip) res.json(trip);
    else res.status(404).json({ error: 'Trip not found' });
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await tripModel.updateTrip(req.params.id, req.body);
    if (trip) res.json(trip);
    else res.status(404).json({ error: 'Trip not found' });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const result = await tripModel.deleteTrip(req.params.id);
    if (result) res.json({ message: 'Trip deleted successfully' });
    else res.status(404).json({ error: 'Trip not found' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStudentsByTripId = async (req, res) => {
  const { tripId } = req.params;
  try {
    const result = await pool.query(`
      SELECT s.id, s.student_fname, s.student_lname, s.grade, s.stream
      FROM trip_attendance_list t
      JOIN students s ON t.student_id = s.id
      WHERE t.trip_id = $1
    `, [tripId]);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching students by trip:', err);
    res.status(500).json({ error: 'Failed to fetch students for the trip.' });
  }
};

const getTripReports = async (req, res) => {
  const user = req.user;
  let query = `
    SELECT t.id, t.trip_name, t.trip_date, b.bus_name, r.route_name
    FROM trip t
    JOIN bus b ON t.bus_id = b.id
    JOIN route r ON t.route_id = r.id
  `;

  if (user.role === 'driver') {
    query += ` WHERE t.driver_id = $1`;
  } else if (user.role === 'parent') {
    query += `
      JOIN attendance a ON t.id = a.trip_id
      JOIN students s ON s.id = a.student_id
      WHERE s.parent_id = $1
    `;
  }

  try {
    const result = user.role === 'administrator'
      ? await pool.query(query)
      : await pool.query(query, [user.id]);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to fetch trip reports' });
  }
};

const startTrip = async (req, res) => {
  const { tripId } = req.params;
  try {
    await pool.query(`UPDATE trip SET start = NOW() WHERE id = $1`, [tripId]);
    res.json({ message: 'Trip started' });
  } catch (err) {
    console.error('Start trip failed', err);
    res.status(500).json({ error: 'Failed to start trip' });
  }
};

const endTrip = async (req, res) => {
  const { tripId } = req.params;
  try {
    await pool.query(`UPDATE trip SET stop = NOW() WHERE id = $1`, [tripId]);
    res.json({ message: 'Trip ended' });
  } catch (err) {
    console.error('End trip failed', err);
    res.status(500).json({ error: 'Failed to end trip' });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getStudentsByTripId,
  getTripReports,
  startTrip,
  endTrip
};
