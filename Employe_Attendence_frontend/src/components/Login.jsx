// src/components/Login.jsx
import React, { useState } from 'react';
import {login} from '../services/authService'
import { useNavigate } from 'react-router-dom';
import '../css/login.css'
import user from '../../public/images/user.jpg';
import lock from '../../public/images/lock.jpg';
import { Link } from 'react-router-dom';
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error

        try {
            const res = await login(email, password);
            const token = res.data.token;
            const role = res.data.role;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            onLogin(token);
            navigate('/');
        } catch (err) {
            // Check if the error has a response from the backend
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };
    
    return (
        <div className='login'>
            <div className="logincontent">
            <h2>Login</h2>
            <form  onSubmit={handleLogin}>
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
               
                <br />
                <button className='loginbtn' type="submit">Login</button>
                <p>Don't have any account ? <Link style={{textDecoration:'none'}} to="/register">Register</Link> </p>
            </form>
            </div>
            {error && <p className='errorpara' style={{ color: 'red' }}>{error}</p>}
        </div>
        
    );
};

export default Login;
