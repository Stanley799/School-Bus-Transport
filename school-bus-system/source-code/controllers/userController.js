const {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateLoginStatus,
  deleteUser
} = require('../models/userModel');

// Get all users
const handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new user
const handleCreateUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password || !phone || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = await createUser({ name, email, password, phone, role });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user
const handleDeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handling Log in 
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Optional: update login status in DB
    await updateLoginStatus(email, true);

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

//enables users to update field like names, phone or role
const handleUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, role } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3, phone = $4, role = $5 WHERE id = $6 RETURNING *',
      [name, email, password, phone, role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated', user: result.rows[0] });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

//exporting all the functions
module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleLogin,
  handleUpdateUser
};
