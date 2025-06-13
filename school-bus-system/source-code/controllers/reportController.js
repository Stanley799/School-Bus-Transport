const reportModel = require('../models/reportModel');

const createReport = async (req, res) => {
  try {
    const report = await reportModel.createReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await reportModel.getAllReports();
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await reportModel.getReportById(req.params.id);
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ error: 'Report not found' });
    }
  } catch (error) {
    console.error('Error fetching report by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateReport = async (req, res) => {
  try {
    const report = await reportModel.updateReport(req.params.id, req.body);
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ error: 'Report not found' });
    }
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await reportModel.deleteReport(req.params.id);
    if (report) {
      res.json({ message: 'Report deleted successfully' });
    } else {
      res.status(404).json({ error: 'Report not found' });
    }
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};
