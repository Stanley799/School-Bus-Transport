const pool = require('../db_node');

// Auto-generate trip_id like TRIP-20250702-4821
function generateTripId() {
  const now = new Date();
  const yyyyMMdd = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TRIP-${yyyyMMdd}-${random}`;
}

//create trip function
async function createTrip(data) {
  const {
    trip_name,
    trip_date,
    departure_time,
    arrival_time,
    status,
    bus_id,
    route_id,
    driver_id
  } = data;

  const trip_id = generateTripId();

  const result = await pool.query(
    `INSERT INTO trip (
      trip_id, trip_name, trip_date, "start", stop, status, bus_id, route_id, driver_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      trip_id,
      trip_name,
      trip_date,
      departure_time,
      arrival_time,
      status,
      bus_id,
      route_id,
      driver_id
    ]
  );

  return result.rows[0];
}



//function that gets all trips
const getAllTrips = async () => {
  const result = await pool.query(`
    SELECT 
      t.id,
      t.start,
      t.stop,
      t.trip_date,
      t.status,
      t.trip_name,
      b.bus_name,
      b.number_plate,
      r.route_name,
      r.estimated_time,
      u.name AS driver_name,
      u.phone AS driver_phone
    FROM trip t
    JOIN bus b ON t.bus_id = b.id
    JOIN route r ON t.route_id = r.id
    JOIN drivers d ON t.driver_id = d.id
    JOIN users u ON d.user_id = u.id
    ORDER BY t.trip_date DESC
  `);
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
