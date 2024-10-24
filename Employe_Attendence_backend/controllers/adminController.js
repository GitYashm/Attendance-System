// src/controllers/adminController.js
const User = require('../models/User'); // Make sure your User model is correctly set up

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers };
