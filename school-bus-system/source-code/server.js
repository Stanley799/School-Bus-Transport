//testing the dbpostgres and node.js connection
//Start server and test database connection
console.log('Starting server.js...');

const express = require('express');
const pool = require('../db_node'); // Only import once

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json()); // Use once at the top

//Test DB connection route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database time: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

//All Route imports
const adminRoutes = require('./routes/adminRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const busRoutes = require('./routes/busRoutes');
const driverRoutes = require('./routes/driverRoute');
const instructionRoutes = require('./routes/instructionRoutes');
const messageRoutes = require('./routes/messageRoutes');
const parentsRoutes = require('./routes/parentsRoute');
const reportRoutes = require('./routes/reportRoutes');
const routeRoutes = require('./routes/routeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const tripRoutes = require('./routes/tripRoutes');


//Use routes
app.use('/api/administrators', adminRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/instructions', instructionRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/parents', parentsRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/trip', tripRoutes);

// Start server (only once!)
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
