const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const protect  = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = protect;