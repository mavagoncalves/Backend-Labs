const jwt = require('jsonwebtoken');

// verify API Key
exports.verifyAPIKey = (req, res, next) => {
    const apiKey = req.header('x-api-key') || req.query.api_key;
    if (apiKey === process.env.API_KEY) return next();
    res.status(401).json({ message: 'Invalid API Key' });
};

// verify JWT Token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer ..."

    if (!token) return res.status(401).json({ message: 'No Token Provided' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};