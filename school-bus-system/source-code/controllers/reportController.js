// controllers/reportController.js
const Trip = require('../models/Trip');
const Attendance = require('../models/Attendance');
const Driver = require('../models/Driver');
const PDFDocument = require('pdfkit');

exports.downloadTripReport = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId, {
      include: ['bus', 'route', {
        model: Driver,
        include: ['user']
      }]
    });

    const attendance = await Attendance.findAll({ where: { trip_id: tripId }, include: ['student'] });

    const doc = new PDFDocument();
    const filename = `Trip_Report_${tripId}.pdf`;

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text(`Trip Report - ${trip.trip_name}`, { align: 'center' });
    doc.moveDown().fontSize(14).text(`Date: ${trip.trip_date}`);
    doc.text(`Departure: ${trip.departure_time} | Arrival: ${trip.arrival_time}`);
    doc.text(`Bus: ${trip.bus.bus_name} (${trip.bus.number_plate})`);
    doc.text(`Route: ${trip.route.route_name}`);
    doc.text(`Driver: ${trip.driver.user.name} (${trip.driver.user.phone})`);
    doc.moveDown();

    doc.fontSize(16).text('Attendance List:', { underline: true });
    doc.moveDown(0.5);
    attendance.forEach((a, idx) => {
      doc.fontSize(12).text(`${idx + 1}. ${a.student.student_fname} ${a.student.student_lname} - ${a.status}`);
    });

    doc.end();
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
};
