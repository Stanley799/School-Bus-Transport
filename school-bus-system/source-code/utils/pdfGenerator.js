const PDFDocument = require('pdfkit');
const pool = require('../db_node');

async function generateTripPDF(tripId, user) {
  // Fetch trip details
  const tripRes = await pool.query(`
    SELECT t.trip_name, t.trip_date,
           b.number_plate AS bus_plate,
           r.route_name,
           d.driver_fname || ' ' || d.driver_lname AS driver_name
    FROM trip t
    JOIN bus b ON t.bus_id = b.id
    JOIN route r ON t.route_id = r.id
    JOIN drivers d ON t.driver_id = d.id
    WHERE t.id = $1
  `, [tripId]);

  if (tripRes.rows.length === 0) {
    throw new Error('Trip not found');
  }
  const trip = tripRes.rows[0];

  // Fetch attendance records
  const attendanceRes = await pool.query(`
    SELECT s.student_fname, s.student_lname, a.status
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE a.trip_id = $1
    ORDER BY s.student_fname, s.student_lname
  `, [tripId]);

  // Create PDF
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    // Header
    doc.fontSize(20).text('Trip Report', { align: 'center' });
    doc.moveDown();

    // Trip Info
    doc.fontSize(12);
    doc.text(`Trip Name: ${trip.trip_name}`);
    doc.text(`Date: ${trip.trip_date.toDateString()}`);
    doc.text(`Bus Plate: ${trip.bus_plate}`);
    doc.text(`Route: ${trip.route_name}`);
    doc.text(`Driver: ${trip.driver_name}`);
    doc.moveDown();

    // Attendance Section
    doc.fontSize(14).text('Attendance:', { underline: true });
    doc.moveDown(0.5);

    if (attendanceRes.rows.length === 0) {
      doc.text('No attendance records found.');
    } else {
      attendanceRes.rows.forEach(({ student_fname, student_lname, status }, i) => {
        const name = `${student_fname} ${student_lname}`;
        doc.fontSize(12).text(`${i + 1}. ${name} - ${status}`);
      });
    }

    doc.end();
  });
}

module.exports = { generateTripPDF };
