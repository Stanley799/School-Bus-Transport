const jwt = require('jsonwebtoken');
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: 'You must be logged in' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);
  if (!token) {
    return res.status(401).json({ message: 'You must be logged in' });
  }

   try {
    console.log('JWT_SECRET in middleware:', process.env.JWT_SECRET); // Add here

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;

