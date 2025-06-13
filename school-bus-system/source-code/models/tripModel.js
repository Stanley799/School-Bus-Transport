const pool = require('../../db_node');


const createTrip = async (trip) => {
  const { trip_id, start, stop, trip_date, bus_id, route_id, driver_id, status } = trip;
  const result = await pool.query(
    `INSERT INTO trip (trip_id, start, stop, trip_date, bus_id, route_id, driver_id, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [trip_id, start, stop, trip_date, bus_id, route_id, driver_id, status]
  );
  return result.rows[0];
};

const getAllTrips = async () => {
  const result = await pool.query('SELECT * FROM trip');
  return result.rows;
};

const getTripById = async (id) => {
  const result = await pool.query('SELECT * FROM trip WHERE id = $1', [id]);
  return result.rows[0];
};

const updateTrip = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

  const result = await pool.query(
    `UPDATE trip SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

const deleteTrip = async (id) => {
  const result = await pool.query('DELETE FROM trip WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
