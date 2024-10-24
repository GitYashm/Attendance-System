// src/components/Register.jsx
import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../css/register.css'
import user from '../../public/images/user.jpg';
import lock from '../../public/images/lock.jpg';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await register(email, password, role);
            setSuccess('Registration successful! Please login.');
            setEmail('');
            setPassword('');
            setRole('employee');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data.message || 'Registration failed');
        }
    };

    return (
        <div className='register'>
            <div className="logincontent">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
            <div className="imageinput1">
                <img src={user} alt="" />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="imageinput2">
                    <img src={lock} alt="" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <select className='select' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option className='option' value="employee">Employee</option>
                    <option className='option' value="admin">Admin</option>
                </select>
                <br />
                <button className='loginbtn' type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </div>
    );
};

export default Register;
