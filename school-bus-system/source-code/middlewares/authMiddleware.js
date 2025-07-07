const jwt = require('jsonwebtoken');

console.log('JWT_SECRET loaded in middleware:', process.env.JWT_SECRET);

const authenticate = (req, res, next) => {
  // Normalize header key to lowercase to avoid case mismatch issues
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  console.log('Auth Header received:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Malformed token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Pass to the next middleware or route handler
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = authenticate;
