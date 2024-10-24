const Attendance = require('../models/Attendence');
const jwt = require('jsonwebtoken');
const startAttendance = async (req, res) => {
    const { userId } = req.body;
    const attendance = new Attendance({ userId, timeIn: new Date() });

    try {
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// attendanceController.js
const endAttendance = async (req, res) => {
    const { userId } = req.body;

    try {
        // Find the current active attendance record
        const attendance = await Attendance.findOne({ userId, timeOut: null });
        
        if (!attendance) {
            return res.status(404).json({ error: 'No active attendance record found' });
        }
        
        // Set the timeOut to the current time
        attendance.timeOut = new Date();
        
        // Calculate the total working hours (optional)
        const duration = (attendance.timeOut - attendance.timeIn) / 1000; // Duration in seconds
        attendance.totalHours = duration;

        // Save the updated attendance record
        await attendance.save();

        res.status(200).json({ message: 'Attendance ended successfully', attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// In your backend controller (attendanceController.js)




// Start Break
// attendanceController.js
const startBreak = async (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Find today's attendance record and update it with a break start time
        const attendance = await Attendance.findOneAndUpdate(
            { userId, date: new Date().setHours(0, 0, 0, 0) },
            { $push: { breaks: { start: new Date() } } },
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json(attendance);
    } catch (error) {
        console.error('Error in startBreak:', error);
        res.status(500).json({ message: 'Failed to start break' });
    }
};


// End Break
// attendanceController.js

const endBreak = async (req, res) => {
    const { userId } = req.body;
    const token = req.headers['x-auth-token']; // Extract the token from headers

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Find today's attendance record for the user
        const attendance = await Attendance.findOne({
            userId,
            date: new Date().setHours(0, 0, 0, 0), // Today's date
        });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        // Get the last break in the breaks array and update its end time
        const lastBreak = attendance.breaks[attendance.breaks.length - 1];
        if (lastBreak && !lastBreak.end) {
            lastBreak.end = new Date();
            await attendance.save();

            // Calculate the break duration in milliseconds
            const breakDuration = new Date(lastBreak.end) - new Date(lastBreak.start);
            res.json({ message: 'Break ended', breakDuration });
        } else {
            res.status(400).json({ message: 'No active break found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// attendanceController.js
const getAllAttendanceRecords = async (req, res) => {
    try {
        // Fetch all attendance records
        const attendanceRecords = await Attendance.find().populate('userId', 'name email'); // Populating user info

        // Calculate total working hours excluding breaks
        const recordsWithCalculatedHours = attendanceRecords.map(record => {
            const totalBreakDuration = record.breaks.reduce((acc, breakPeriod) => {
                return acc + (new Date(breakPeriod.end) - new Date(breakPeriod.start));
            }, 0);
            const totalWorkHours = ((new Date(record.timeOut) - new Date(record.timeIn)) - totalBreakDuration) / (1000 * 60 * 60); // Convert to hours

            return {
                ...record.toObject(),
                totalWorkHours
            };
        });

        res.status(200).json(recordsWithCalculatedHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
   startAttendance,endAttendance,startBreak,
   endBreak,getAllAttendanceRecords
}