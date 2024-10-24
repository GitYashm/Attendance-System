const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const attendanceRoutes = require('./routes/attendenceRoutes');
const bodyParser = require("body-parser");
const cors = require('cors');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();
app.use(bodyParser.json());
app.use(cors());
// Middleware
app.use(express.json());
app.use('/api/attendance', attendanceRoutes);

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});