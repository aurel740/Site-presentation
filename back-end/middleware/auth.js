const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Token non valide');
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    req.auth = {
      userId:userId
    };
    console.log('req.auth:', req.auth);
    console.log(req.headers);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentification nécessaire' });
  }
};