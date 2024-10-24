// src/components/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/adminService';
import {
    getAllAttendanceRecords,
    startAttendance,
    endAttendance,
    startBreak,
    endBreak,
} from '../services/attendenceService';
import '../css/adminpanel.css'
const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [userId, setUserId] = useState(''); // Example userId, should be dynamically set
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token for authentication
                const response = await getAllUsers(token); // Fetch all users from the backend
                setUsers(response.data); // Store the fetched users' data in the state
            } catch (err) {
                setError('Failed to fetch users',err);
            }
        };

        fetchUsers(); // Fetch users when the component is mounted
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllAttendanceRecords();
                setAttendanceRecords(response.data);
            } catch (error) {
                console.error('Error fetching attendance records:', error);
            }
        };

        fetchData();
    }, []);
    const handleStartAttendance = async () => {
        try {
            await startAttendance(userId);
            alert('Attendance started successfully!');
        } catch (error) {
            console.error('Error starting attendance:', error);
        }
    };

    const handleEndAttendance = async () => {
        try {
            await endAttendance(userId);
            alert('Attendance ended successfully!');
        } catch (error) {
            console.error('Error ending attendance:', error);
        }
    };

    const handleStartBreak = async () => {
        try {
            await startBreak(userId);
            alert('Break started successfully!');
        } catch (error) {
            console.error('Error starting break:', error);
        }
    };

    const handleEndBreak = async () => {
        try {
            await endBreak(userId);
            alert('Break ended successfully!');
        } catch (error) {
            console.error('Error ending break:', error);
        }
    };

    return (
        <div className="adminmain">
            <h2>Admin Panel - Users List</h2>
        <div className="admin-panel">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                    <th>Employee ID</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Breaks</th>
                        <th>Total Working Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            
                           
                            
                            <td>{user.startAttendance ? new Date(user.startAttendance).toLocaleString() : 'N/A'}</td>
                            <td>{user.breakDuration || 'N/A'}</td>
                            <td>{user.endAttendance ? new Date(user.endAttendance).toLocaleString() : 'N/A'}</td>
                            <td>{user.totalWorkingHours || 'N/A'}</td>
                        </tr>
                    ))}
                    {attendanceRecords.map((record) => (
                        <tr key={record._id}>
                            <td>{record.userId?.email}</td>
                            <td>{new Date(record.timeIn).toLocaleString()}</td>
                            <td>{record.timeOut ? new Date(record.timeOut).toLocaleString() : 'N/A'}</td>
                            <td>
                                {record.breaks.map((brk, index) => (
                                    <div key={index}>
                                        Start: {new Date(brk.start).toLocaleString()} <br />
                                        End: {brk.end ? new Date(brk.end).toLocaleString() : 'N/A'}
                                    </div>
                                ))}
                            </td>
                            <td>{record.totalWorkHours ? `${record.totalWorkHours.toFixed(2)} hrs` : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AdminPanel;
