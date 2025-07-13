const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db_node'); // PostgreSQL connection
const { findUserByEmail } = require('../models/userModel');

// SIGN UP FUNCTION
const signUpUser = async (req, res) => {
  const { email, password, phone, role, fname, lname, address } = req.body;

  try {
    if (!fname || !lname || !email || !password || !phone || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const name = `${fname} ${lname}`;

    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, phone, role]
    );

    const user = userResult.rows[0];

    if (role === 'parent') {
      await pool.query(
        'INSERT INTO parents (user_id, parent_fname, parent_lname, address) VALUES ($1, $2, $3, $4)',
        [user.id, fname, lname, address || '']
      );
    } else if (role === 'driver') {
      await pool.query(
        'INSERT INTO drivers (user_id, driver_fname, driver_lname) VALUES ($1, $2, $3)',
        [user.id, fname, lname]
      );
    } else if (role === 'administrator') {
      await pool.query(
        'INSERT INTO administrators (user_id, admin_fname, admin_lname) VALUES ($1, $2, $3)',
        [user.id, fname, lname]
      );
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during signup' });
  }
};

// LOGIN FUNCTION
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    let profile = {};
    if (user.role === 'parent') {
      const data = await pool.query('SELECT * FROM parents WHERE user_id = $1', [user.id]);
      profile = data.rows[0];
    } else if (user.role === 'driver') {
      const data = await pool.query('SELECT * FROM drivers WHERE user_id = $1', [user.id]);
      profile = data.rows[0];
    } else if (user.role === 'administrator') {
      const data = await pool.query('SELECT * FROM administrators WHERE user_id = $1', [user.id]);
      profile = data.rows[0];
    }

    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        ...profile
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};


module.exports = {
  signUpUser,
  login
};
