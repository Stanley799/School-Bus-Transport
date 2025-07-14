const express = require('express');
const router = express.Router();
const {
  handleGetAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleLogin,
  handleUpdateUser,
  handleGetUserProfile,
  handleUpdateUserProfile,
  handleChangePassword
} = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

// Auth and basic
router.post('/login', handleLogin);
router.post('/', handleCreateUser);
router.get('/', handleGetAllUsers);
router.delete('/:id', handleDeleteUser);
router.put('/:id', handleUpdateUser);

// User account
router.get('/profile', authenticate, handleGetUserProfile);
router.put('/profile', authenticate, handleUpdateUserProfile);
router.put('/change-password', authenticate, handleChangePassword);

module.exports = router;
