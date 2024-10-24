// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        try {
            const response = await axios.post('/api/auth/login', credentials);
            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token); // Store token
        } catch (error) {
            console.error('Login failed', error);
            throw error; // Propagate error to the component
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // Remove token from local storage
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
