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

//table routes
const adminRoutes = require('./source-code/routes/adminRoutes');
app.use('/api/admins', adminRoutes);

const attendanceRoutes = require('./source-code/routes/attendanceRoutes');
app.use('/api/attendance', attendanceRoutes);
//bus table
const express = require('express');
const app = express();
const pool = require('./db_node');

const busRoutes = require('./source-code/routes/busRoutes');
//driver table
const driverRoutes = require('./source-code/routes/driverRoute');
app.use('/api/drivers', driverRoutes);
//instructions table
const instructionRoutes = require('./source-code/routes/instructionRoutes');
app.use('/api/instructions', instructionRoutes);
//message table
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const messageRoute = require('./routes/messageRoute');
app.use('/api/messages', messageRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//parent table
const parentsRoute = require('./source-code/routes/parentsRoute');
app.use('/api/parents', parentsRoute);


app.use(express.json()); // to parse JSON bodies
app.use('/api/buses', busRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
