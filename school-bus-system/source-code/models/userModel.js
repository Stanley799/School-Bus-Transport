// this file handles all the interactions with the users table in the database
const pool = require('../db_node');

// Get all users
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

// Get user by email
const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Create new user
const createUser = async ({ name, email, password, phone, role }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, phone, role]
  );
  return result.rows[0];
};

// Update login status
const updateLoginStatus = async (email, status) => {
  const result = await pool.query(
    'UPDATE users SET loginStatus = $1 WHERE email = $2 RETURNING *',
    [status, email]
  );
  return result.rows[0];
};

// Delete user
const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateLoginStatus,
  deleteUser,
};
