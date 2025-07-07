const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const pool = require('../db_node');
const { generateTripPDF } = require('../utils/pdfGenerator'); // ✅ REQUIRED IMPORT

// GET all trips eligible for report, filtered by role
router.get('/trip/reports', authenticate, async (req, res) => {
  const user = req.user;

  let query = `
    SELECT t.id, t.trip_name, t.trip_date, b.bus_name, r.route_name
    FROM trip t
    JOIN bus b ON t.bus_id = b.id
    JOIN route r ON t.route_id = r.id
  `;

  if (user.role === 'driver') {
    query += ` WHERE t.driver_id = $1`;
  } else if (user.role === 'parent') {
    query = `
      SELECT DISTINCT t.id, t.trip_name, t.trip_date, b.bus_name, r.route_name
      FROM trip t
      JOIN bus b ON t.bus_id = b.id
      JOIN route r ON t.route_id = r.id
      JOIN attendance a ON t.id = a.trip_id
      JOIN students s ON s.id = a.student_id
      WHERE s.parent_id = $1
    `;
  }

  try {
    const result = (user.role === 'administrator')
      ? await pool.query(query)
      : await pool.query(query, [user.id]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch trips");
  }
});

// GET PDF report for a trip
router.get('/reports/:tripId', authenticate, async (req, res) => {
  const { tripId } = req.params;

  try {
    const pdfBuffer = await generateTripPDF(tripId, req.user);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Trip_Report_${tripId}.pdf`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate report");
  }
});

module.exports = router;
