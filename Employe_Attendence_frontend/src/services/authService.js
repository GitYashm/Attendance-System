// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// Register function with improved error handling
const register = async (email, password, role) => {
    try {
        const response = await axios.post(`${API_URL}register`, { email, password, role });
        return response.data;
    } catch (error) {
        // Log the error response for debugging purposes
        console.error('Registration error:', error.response ? error.response.data : error.message);

        // Throw the error message if it exists, otherwise return a generic error
        throw new Error(error.response?.data.message || 'Registration failed. Please try again.');
    }
};

// Login function
// src/services/authService.js
const login = async (email, password) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
        if (res.data.token) {
            localStorage.setItem('token', res.data.token); // Set token
            localStorage.setItem('userId', res.data.userId); // Save userId
            localStorage.setItem('role', res.data.role); // Save role if needed
        }
        return res;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// Check if the user is an admin
const isAdmin = () => {
    return localStorage.getItem('role') === 'admin';
};
// src/services/authService.js
const isAuthenticated = (token) => {
    // Check if the user token exists in localStorage or session storage
    console.log(localStorage.getItem('token') )
    return localStorage.getItem('token') !== null;
};

// Logout function
const logout = (token) => {
    localStorage.removeItem(token);
    localStorage.removeItem('role');
};

export {
    register,
    login,
    isAdmin,
    logout,
    isAuthenticated,

};
