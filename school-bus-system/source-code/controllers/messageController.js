const messageModel = require('../models/messageModel');

const sendMessage = async (req, res) => {
  const { receiver_id, content } = req.body;
  const sender_id = req.user.id; // from auth middleware

  if (!content || !receiver_id) {
    return res.status(400).json({ message: 'Content and receiver_id are required' });
  }

  try {
    // Use your message model's create function
    const message = await messageModel.createMessage(sender_id, receiver_id, content);
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
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

//getting the conversation between two users
const getConversation = async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.params;

  try {
    const result = await messageModel.getConversation(userId, otherUserId);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching conversation:', err);
    res.status(500).json({ message: 'Failed to fetch conversation' });
  }
};


module.exports = {
  sendMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  getConversation
};
