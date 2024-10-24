// src/services/attendanceService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/attendance/';

// Start attendance
const startAttendance = async(userId) => {
    return axios.post(
        `${API_URL}start`,
        { userId },
        
    );
};

// End attendance
// attendanceService.js
const endAttendance = (userId) => {
    return axios.post(
        `${API_URL}end`,
        { userId },
        
    );
};
const startBreak = async (userId) => {
    return axios.post(`${API_URL}/startBreak`, { userId });
};

const endBreak = async (userId) => {
    return axios.post(`${API_URL}/endBreak`, { userId });
};

const getAllAttendanceRecords = async () => {
    return axios.get(`${API_URL}`);
};

export {
    startAttendance,
    endAttendance,startBreak,endBreak,getAllAttendanceRecords
};