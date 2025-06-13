const pool = require('../../db_node');


// Create new admin
const createAdmin = async (admin) => {
  const { user_id, admin_fname, admin_lname } = admin;
  const result = await pool.query(
    'INSERT INTO administrators (user_id, admin_fname, admin_lname) VALUES ($1, $2, $3) RETURNING *',
    [user_id, admin_fname, admin_lname]
  );
  return result.rows[0];
};

// Get all admins
const getAllAdmins = async () => {
  const result = await pool.query('SELECT * FROM administrators');
  return result.rows;
};

// Get admin by ID
const getAdminById = async (id) => {
  const result = await pool.query('SELECT * FROM administrators WHERE id = $1', [id]);
  return result.rows[0];
};

// Update admin
const updateAdmin = async (id, admin) => {
  const { admin_fname, admin_lname } = admin;
  const result = await pool.query(
    'UPDATE administrators SET admin_fname = $1, admin_lname = $2 WHERE id = $3 RETURNING *',
    [admin_fname, admin_lname, id]
  );
  return result.rows[0];
};

// Delete admin
const deleteAdmin = async (id) => {
  await pool.query('DELETE FROM administrators WHERE id = $1', [id]);
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
