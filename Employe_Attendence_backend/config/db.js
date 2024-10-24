const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MONGO_URI = 'mongodb+srv://yash571w1:attendence123@cluster0.hl3xk.mongodb.net/EmployeeAttendence?retryWrites=true&w=majority&appName=Cluster0';
dotenv.config();

const connectDB = async () => {
    try {
    await mongoose.connect(MONGO_URI)
    
    
         
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;