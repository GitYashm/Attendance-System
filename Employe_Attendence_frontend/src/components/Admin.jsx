// src/components/Admin.jsx
import React, { useEffect, useState } from 'react';
import { getAllUsers, getAttendanceRecords } from '../services/adminService';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAllUsers(token);
                setUsers(res.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        const fetchAttendanceRecords = async () => {
            try {
                const res = await getAttendanceRecords(token);
                setAttendanceRecords(res.data);
            } catch (err) {
                console.error('Failed to fetch attendance records:', err);
            }
        };

        fetchUsers();
        fetchAttendanceRecords();
    }, [token]);

    return (
        <div>
            <h2>Admin Panel</h2>
            <div>
                <h3>Users</h3>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.email} - {user.role}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Attendance Records</h3>
                <ul>
                    {attendanceRecords.map(record => (
                        <li key={record._id}>
                            User ID: {record.userId}, Time In: {new Date(record.timeIn).toLocaleString()}, 
                            Time Out: {record.timeOut ? new Date(record.timeOut).toLocaleString() : 'N/A'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
