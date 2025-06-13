const pool = require('../../db_node');


const createMessage = async (sender_id, receiver_id, content) => {
  const result = await pool.query(
    'INSERT INTO message (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
    [sender_id, receiver_id, content]
  );
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query('SELECT * FROM message ORDER BY timestamp DESC');
  return result.rows;
};

const getMessageById = async (id) => {
  const result = await pool.query('SELECT * FROM message WHERE message_id = $1', [id]);
  return result.rows[0];
};

const deleteMessage = async (id) => {
  await pool.query('DELETE FROM message WHERE message_id = $1', [id]);
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage
};
