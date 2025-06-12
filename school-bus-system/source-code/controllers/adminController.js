const adminModel = require('../models/adminModel');

const createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminModel.createAdmin(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating admin' });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admins' });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await adminModel.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admin' });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const updated = await adminModel.updateAdmin(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating admin' });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    await adminModel.deleteAdmin(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting admin' });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
