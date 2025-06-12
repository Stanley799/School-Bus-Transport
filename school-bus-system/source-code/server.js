//testing the dbpostgres and node.js connection
console.log('🧪 Starting server.js...');
const express = require('express');
const pool = require('./db_node'); //the connection file 

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database time: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
