const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');

router.post('/', messageController.createMessage);
router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.delete('/:id', messageController.deleteMessage);


router.post('/', authenticate, sendMessage); // Protected

module.exports = router;
