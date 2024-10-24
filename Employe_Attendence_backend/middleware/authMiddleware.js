const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(403).send('Access denied');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};
 // routes/authRoutes.js
const express = require('express');
const {register,login} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
module.exports = {verifyToken};