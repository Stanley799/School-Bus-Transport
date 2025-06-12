// source-code/routes/parentsRoute.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/parentsController');

router.post('/', controller.createParent);
router.get('/', controller.getAllParents);
router.get('/:id', controller.getParentById);
router.put('/:id', controller.updateParent);
router.delete('/:id', controller.deleteParent);

module.exports = router;
