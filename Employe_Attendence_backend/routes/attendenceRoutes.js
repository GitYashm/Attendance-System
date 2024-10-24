const express = require('express');
const { startAttendance, endAttendance } = require('../controllers/attendenceController')
const { verifyToken }= require('../middleware/authMiddleware');
const { startBreak,endBreak } = require('../controllers/attendenceController');
const {getAllAttendanceRecords} = require('../controllers/attendenceController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const router = express.Router();

// router.post('/start', verifyToken, startAttendance);
// router.post('/logout', verifyToken, endAttendance);

// routes/attendance.js


// Start attendance
router.post('/start', startAttendance);
router.post('/end', endAttendance);

// Start break
router.post('/startBreak', startBreak);

// End break
router.post('/endBreak', endBreak);

// routes/attendance.js




module.exports = router;