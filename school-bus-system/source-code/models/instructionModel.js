const pool = require('../../db_node');

// Create a new instruction
const createInstruction = async (instruction) => {
  const { trip_id, admin_id, message } = instruction;
  const result = await pool.query(
    'INSERT INTO instructions (trip_id, admin_id, message) VALUES ($1, $2, $3) RETURNING *',
    [trip_id, admin_id, message]
  );
  return result.rows[0];
};

// Get all instructions
const getAllInstructions = async () => {
  const result = await pool.query('SELECT * FROM instructions');
  return result.rows;
};

// Get a single instruction by ID
const getInstructionById = async (id) => {
  const result = await pool.query('SELECT * FROM instructions WHERE id = $1', [id]);
  return result.rows[0];
};

// Update an instruction
const updateInstruction = async (id, updatedInstruction) => {
  const { message } = updatedInstruction;
  const result = await pool.query(
    'UPDATE instructions SET message = $1 WHERE id = $2 RETURNING *',
    [message, id]
  );
  return result.rows[0];
};

// Delete an instruction
const deleteInstruction = async (id) => {
  await pool.query('DELETE FROM instructions WHERE id = $1', [id]);
};

module.exports = {
  createInstruction,
  getAllInstructions,
  getInstructionById,
  updateInstruction,
  deleteInstruction
};
