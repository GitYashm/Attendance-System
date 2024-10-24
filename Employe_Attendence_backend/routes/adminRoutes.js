// src/routes/adminRoutes.js
const express = require('express');
const { getAllUsers } = require('../controllers/adminController');
const router = express.Router();

// Define your route to get all users
router.get('/users', getAllUsers);

module.exports = router;
