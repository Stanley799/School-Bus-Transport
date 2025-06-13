// source-code/models/parentsModel.js
const pool = require('../../db_node');


async function createParent(user_id, parent_fname, parent_lname, address) {
  const query = `
    INSERT INTO parents (user_id, parent_fname, parent_lname, address)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [user_id, parent_fname, parent_lname, address];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllParents() {
  const result = await pool.query('SELECT * FROM parents');
  return result.rows;
}

async function getParentById(id) {
  const result = await pool.query('SELECT * FROM parents WHERE id = $1', [id]);
  return result.rows[0];
}

async function updateParent(id, parent_fname, parent_lname, address) {
  const query = `
    UPDATE parents
    SET parent_fname = $1,
        parent_lname = $2,
        address = $3
    WHERE id = $4
    RETURNING *`;
  const values = [parent_fname, parent_lname, address, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteParent(id) {
  const result = await pool.query('DELETE FROM parents WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
};
