const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');

// Protected POST to send message
router.post('/', authMiddleware, messageController.sendMessage);
router.get('/conversation/:otherUserId', authMiddleware, messageController.getConversation);


router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;

