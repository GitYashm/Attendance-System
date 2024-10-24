// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAdmin, logout } from '../services/authService';
import logo from '../../public/images/07-Schedule-Your-Employee.png'
import { useState,useEffect } from 'react';


import '../css/Navbar.css'
const Navbar = ({ isAuthenticated, handleLogout }) => {
    const navigate = useNavigate();
    
    

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };
    

    return (
        <nav>
            <img src={logo} alt="" />
            <ul>
                <li><Link style={{textDecoration:'none'}} to="/">Home</Link></li>
                {isAdmin() && <li><Link style={{textDecoration:'none'}}  to="/admin">Admin Panel</Link></li>}
            </ul>
            {isAuthenticated && (
                    <>
                        
                        <button onClick={onLogout}>Logout</button>
                    </>
                )}
                
        </nav>
    );
};

export default Navbar;
