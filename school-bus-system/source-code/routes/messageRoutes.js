const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');
const { sendMessage } = require('../controllers/messageController');

router.post('/', authMiddleware, sendMessage);
router.post('/', messageController.sendMessage);
router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.delete('/:id', messageController.deleteMessage);


router.post('/', authMiddleware, sendMessage); // Protected

module.exports = router;
