// middleware/adminAuthMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAdminAuthenticated = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'User is not authorized as admin' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = { isAdminAuthenticated };
