const mongoose = require('mongoose');

const breakSchema = new mongoose.Schema({
    start: Date,
    end: Date
});

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeIn: {
        type: Date,
        required: true
    },
    timeOut: Date,
    breaks: [breakSchema], // Array to store multiple breaks
    totalHours: Number // Calculated total working hours
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
