const pool = require('../../db_node');


// CREATE a new bus
const createBus = async (number_plate, status, capacity, driver_id) => {
  const result = await pool.query(
    'INSERT INTO bus (number_plate, status, capacity, driver_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [number_plate, status, capacity, driver_id]
  );
  return result.rows[0];
};

// READ all buses
const getAllBuses = async () => {
  const result = await pool.query('SELECT * FROM bus');
  return result.rows;
};

// READ a bus by ID
const getBusById = async (id) => {
  const result = await pool.query('SELECT * FROM bus WHERE id = $1', [id]);
  return result.rows[0];
};

// UPDATE a bus
const updateBus = async (id, number_plate, status, capacity, driver_id) => {
  const result = await pool.query(
    `UPDATE bus 
     SET number_plate = $1, status = $2, capacity = $3, driver_id = $4 
     WHERE id = $5 RETURNING *`,
    [number_plate, status, capacity, driver_id, id]
  );
  return result.rows[0];
};

// DELETE a bus
const deleteBus = async (id) => {
  await pool.query('DELETE FROM bus WHERE id = $1', [id]);
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus
};
