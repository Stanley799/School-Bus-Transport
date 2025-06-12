const messageModel = require('../models/messageModel');

const createMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, content } = req.body;
    const message = await messageModel.createMessage(sender_id, receiver_id, content);
    res.status(201).json(message);
  } catch (err) {
    console.error('Create message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await messageModel.getAllMessages();
    res.status(200).json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageModel.getMessageById(id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json(message);
  } catch (err) {
    console.error('Get message error:', err);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await messageModel.deleteMessage(id);
    res.status(204).send();
  } catch (err) {
    console.error('Delete message error:', err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage
};
