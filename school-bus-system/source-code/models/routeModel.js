const pool = require('../../db_node');


const createRoute = async (route) => {
  const { route_id, departure, destination, distance, estimated_time } = route;
  const result = await pool.query(
    'INSERT INTO route (route_id, departure, destination, distance, estimated_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [route_id, departure, destination, distance, estimated_time]
  );
  return result.rows[0];
};

const getAllRoutes = async () => {
  const result = await pool.query('SELECT * FROM route');
  return result.rows;
};

const getRouteById = async (id) => {
  const result = await pool.query('SELECT * FROM route WHERE id = $1', [id]);
  return result.rows[0];
};

const updateRoute = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

  const result = await pool.query(
    `UPDATE route SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

const deleteRoute = async (id) => {
  const result = await pool.query('DELETE FROM route WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
};
