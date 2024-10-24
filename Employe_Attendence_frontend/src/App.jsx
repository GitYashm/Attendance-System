// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Attendance from './components/Attendance';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import { useState,useEffect } from 'react';
import { logout } from './services/authService';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/login"element={<Login onLogin={handleLogin} />}/>
                    {/* Use PrivateRoute to protect the AdminPanel */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminPanel />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
