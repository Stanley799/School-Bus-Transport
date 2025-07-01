const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const instructionController = require('../controllers/instructionController');

router.post('/', instructionController.createInstruction);
router.get('/', instructionController.getAllInstructions);
router.get('/:id', instructionController.getInstructionById);
router.put('/:id', instructionController.updateInstruction);
router.delete('/:id', instructionController.deleteInstruction);

router.post('/', authenticate, sendInstruction); // Protected

module.exports = router;
