// source-code/controllers/parentsController.js
const Parent = require('../models/parentsModel');

exports.createParent = async (req, res) => {
  try {
    const { user_id, parent_fname, parent_lname, address } = req.body;
    const newParent = await Parent.createParent(user_id, parent_fname, parent_lname, address);
    res.status(201).json(newParent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating parent' });
  }
};

exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.getAllParents();
    res.json(parents);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching parents' });
  }
};

exports.getParentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const parent = await Parent.getParentById(id);
    if (parent) {
      res.json(parent);
    } else {
      res.status(404).json({ error: 'Parent not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching parent' });
  }
};

exports.updateParent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { parent_fname, parent_lname, address } = req.body;
    const updated = await Parent.updateParent(id, parent_fname, parent_lname, address);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Parent not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating parent' });
  }
};

exports.deleteParent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Parent.deleteParent(id);
    if (deleted) {
      res.json(deleted);
    } else {
      res.status(404).json({ error: 'Parent not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting parent' });
  }
};
