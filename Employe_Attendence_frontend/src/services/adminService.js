// src/services/adminService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/'; // Ensure the URL is correct

// Function to get all users
export const getAllUsers = (token) => {
    return axios.get(`${API_URL}users`, {
        headers: {
            'x-auth-token': token, // Pass the token for authentication
        },
    });
};

export const getAllAttendanceRecords = (token) => {
    return axios.get(`${API_URL}attendance`, {
        headers: {
            'x-auth-token': token,
        },
    });
};

