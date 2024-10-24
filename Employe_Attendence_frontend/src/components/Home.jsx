import React, { useState } from 'react'
import '../css/Home.css'
import graph from '../../public/images/future-ed-chronic-absenteeism.jpg'
import recent from '../../public/images/Employee Attendance Tracking Software  A Complete Solution for Remote Work.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    // Check for a token in local storage or a similar mechanism
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, otherwise false
  };

  // Handler for the button click
  const handleEmployeeAttendanceClick = () => {
    if (isAuthenticated()) {
      // If user is authenticated, navigate to the /attendance page
      navigate('/attendance');
    } else {
      // If not authenticated, navigate to the login page
      navigate('/login');
    }
  };

  return (
    <div className="main">
      <div className="startbtn1">
      <h1 className='attendanceHeading'>Employee Attendance Dashboard</h1>
      <button onClick={handleEmployeeAttendanceClick} >Employee Attendence</button>
      </div>
        
        <div className="details">
            <div className="total">
              <div className="content">
                <h1>450</h1>
                <p>Total Employee</p>
                </div>
            </div>
            <div className="onTime">
              <div className="content">
            <h1>300</h1>
            <p>On Time</p>
            </div>
            </div>
            <div className="late">
              <div className="content">
              <h1>100</h1>
              <p>Late</p>
              </div>
            
            </div>
            <div className="absent">
            <div className="content">
            <h1>50</h1>
            <p>Absent</p>
            </div>
            </div>
        </div>
        <div className="graph">
            <div className="graph-image">
    <img src={graph} alt="" />
            </div>
            <div className="recentattendance">
    <img src={recent} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Home;