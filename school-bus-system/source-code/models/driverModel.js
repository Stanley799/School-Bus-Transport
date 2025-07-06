const pool = require('../db_node');


// Create a new driver
async function createDriver(driver) {
  const { user_id, driver_fname, driver_lname } = driver;
  const result = await pool.query(
    'INSERT INTO drivers (user_id, driver_fname, driver_lname) VALUES ($1, $2, $3) RETURNING *',
    [user_id, driver_fname, driver_lname]
  );
  return result.rows[0];
}

// Get all drivers
const getAllDrivers = async () => {
  const result = await pool.query(`
    SELECT 
      d.id, 
      d.user_id, 
      d.driver_fname, 
      d.driver_lname, 
      u.phone AS driver_phone 
    FROM drivers d 
    JOIN users u ON d.user_id = u.id
  `);
  return result.rows;
};

// Get a driver by ID
async function getDriverById(id) {
  const result = await pool.query('SELECT * FROM drivers WHERE id = $1', [id]);
  return result.rows[0];
}

// Update a driver
async function updateDriver(id, updates) {
  const { driver_fname, driver_lname } = updates;
  const result = await pool.query(
    'UPDATE drivers SET driver_fname = $1, driver_lname = $2 WHERE id = $3 RETURNING *',
    [driver_fname, driver_lname, id]
  );
  return result.rows[0];
}

// Delete a driver
async function deleteDriver(id) {
  const result = await pool.query('DELETE FROM drivers WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
