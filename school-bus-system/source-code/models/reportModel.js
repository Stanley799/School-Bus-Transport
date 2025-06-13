const pool = require('../../db_node');


const createReport = async (report) => {
  const { report_id, parent_report, driver_report, admin_report, trip_id } = report;
  const result = await pool.query(
    'INSERT INTO report (report_id, parent_report, driver_report, admin_report, trip_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [report_id, parent_report, driver_report, admin_report, trip_id]
  );
  return result.rows[0];
};

const getAllReports = async () => {
  const result = await pool.query('SELECT * FROM report');
  return result.rows;
};

const getReportById = async (id) => {
  const result = await pool.query('SELECT * FROM report WHERE id = $1', [id]);
  return result.rows[0];
};

const updateReport = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

  const result = await pool.query(
    `UPDATE report SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

const deleteReport = async (id) => {
  const result = await pool.query('DELETE FROM report WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};
