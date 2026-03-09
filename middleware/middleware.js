const jwt = require('jsonwebtoken');

// verify API Key
exports.verifyAPIKey = (req, res, next) => {
    const apiKey = req.header('x-api-key') || req.query.api_key;
    if (apiKey === process.env.API_KEY) return next();
    res.status(401).json({ message: 'Invalid API Key' });
};