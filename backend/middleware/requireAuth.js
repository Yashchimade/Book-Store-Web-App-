const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  const requiresAuth = req.path.startsWith('/api/book');

  if (!requiresAuth) {
    console.log("Authentication not required for this route");
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization) {
    console.log("Authorization token missing from request headers");
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    console.log("Verifying token...");
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select('_id');
    console.log("Token verified successfully");
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
}

module.exports = requireAuth