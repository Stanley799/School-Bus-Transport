const instructionModel = require('../models/instructionModel');

const createInstruction = async (req, res) => {
  try {
    const instruction = await instructionModel.createInstruction(req.body);
    res.status(201).json(instruction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create instruction' });
  }
};

const getAllInstructions = async (req, res) => {
  try {
    const instructions = await instructionModel.getAllInstructions();
    res.json(instructions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve instructions' });
  }
};

const getInstructionById = async (req, res) => {
  try {
    const instruction = await instructionModel.getInstructionById(req.params.id);
    if (instruction) {
      res.json(instruction);
    } else {
      res.status(404).json({ error: 'Instruction not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve instruction' });
  }
};

const updateInstruction = async (req, res) => {
  try {
    const updatedInstruction = await instructionModel.updateInstruction(req.params.id, req.body);
    res.json(updatedInstruction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update instruction' });
  }
};

const deleteInstruction = async (req, res) => {
  try {
    await instructionModel.deleteInstruction(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete instruction' });
  }
};

// Send instruction to driver
const sendInstruction = async (req, res) => {
  const { driver_id, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO instructions (driver_id, message) VALUES ($1, $2) RETURNING *',
      [driver_id, message]
    );
    res.status(201).json({ instruction: result.rows[0], message: 'Instruction sent successfully' });
  } catch (err) {
    console.error('Error sending instruction:', err);
    res.status(500).json({ message: 'Failed to send instruction' });
  }
};

module.exports = {
  createInstruction,
  getAllInstructions,
  getInstructionById,
  updateInstruction,
  sendInstruction,
  deleteInstruction
};
