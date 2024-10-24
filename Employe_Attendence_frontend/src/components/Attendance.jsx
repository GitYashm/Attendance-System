// src/components/Attendance.jsx
import React, { useState,useEffect} from 'react';
import { startAttendance, endAttendance } from '../services/attendenceService';
import '../css/attendance.css'

const Attendance = () => {
    const [status, setStatus] = useState('');
    const [token, setToken] = useState('');
    const [timer, setTimer] = useState(0); // State to track the timer in seconds
    const [isTiming, setIsTiming] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [breakDuration,setBreakDuration] = useState('');
    const [isAttendanceStarted, setIsAttendanceStarted] = useState(false);
    const [endTime, setEndTime] = useState(null);

   
    const userId = localStorage.getItem('userId'); // Get userId from local storage

    useEffect(() => {
        // Retrieve the token from localStorage
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            
        } else {
            setStatus('User is not authenticated');
        }
    }, []);
    useEffect(() => {
        let interval = null;
        if (isTiming) {
            // Start the interval when the timer is active
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime + 1);
            }, 1000); // Update every second
        } else {
            // Clear the interval when the timer is stopped
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTiming]);

    
    const handleStart = async () => {
        if (isTiming) {
            // If the timer is already running, do not restart it
            setStatus('Attendance is already started');
            setTimeout(() => {
                setStatus('');
            }, 3000);
            return;
        }
        try {
            await startAttendance(userId, token);
            console.log(userId);
            console.log(token);
            setStatus('Attendance started');
            const currentTime = new Date(); // Get the current time
            setStartTime(currentTime); 
            setIsAttendanceStarted(true); // Set attendance status to true
            
            setTimeout(() => {
                setStatus('');
            }, 3000);
        } catch (err) {
            setStatus('Failed to start attendance',err);
        }
    };

    const handleEnd = async () => {
        if (!isAttendanceStarted) {
            // If attendance is not started, do nothing
            setStatus('Attendance has not been started');
            setTimeout(() => {
                setStatus('');
            }, 3000);
            return;
        }
        try {
            await endAttendance(userId, token); // Call your endAttendance function
            console.log(userId);
            setStatus('Attendance ended');
    
            const currentTime = new Date(); // Get the current laptop time
            setEndTime(currentTime); // Set the end time
            setIsAttendanceStarted(false); // Reset the attendance status to false
            setIsTiming(false); // Stop the timer if it is running
            
            setTimeout(() => {
                setStatus('');
            }, 3000);
        } catch (err) {
            setStatus('Failed to end attendance');
            console.error(err); // Log the error for debugging
        }
    };
    
    const handleStartBreak = async()=>{
        if (isTiming) {
            // If the timer is already running, do not restart it
            setStatus('Break is already started');
            setTimeout(() => {
                setStatus('');
            }, 3000);
            return;
        }
        try {
            await startAttendance(userId, token);
            console.log(userId);
            console.log(token);
            setStatus('Break started');
            setTimer(0); // Reset the timer
            setIsTiming(true); // Start the timer
            setTimeout(() => {
                setStatus('');
            }, 2000);
        } catch (err) {
            setStatus('Failed to start attendance',err);
        }
    };
    
    // Attendance.jsx
const handleEndBreak = async () => {
    if (!isTiming) {
        // If the timer is not running, display a message
        setStatus('No active break to end');
        setTimeout(() => {
            setStatus('');
        }, 3000);
        return;
    }

    try {
        // End the break by calling the endBreak function from the service (you can implement the actual API call here)
        const endTime = new Date(); // Get the current time
        setIsTiming(false); // Stop the timer

        // Calculate the break duration in seconds
        const durationInSeconds = Math.floor((endTime - startTime) / 1000);

        // Convert to a readable format (hours, minutes, seconds)
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        setStatus(`Break ended. Duration: ${hours}h ${minutes}m ${seconds}s`);

        // Optionally, you can store the break duration in a state variable for permanent display
        setBreakDuration(`Your Break Duration: ${hours}h ${minutes}m ${seconds}s`);

        // Clear the status message after 3 seconds
        setTimeout(() => {
            setStatus('');
        }, 3000);
    } catch (err) {
        setStatus('Failed to end break');
        console.error(err); // Log the error for debugging
    }
};

    const formatedate = (date) => {
        if (!date) return '';
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className='attendance'>
            <div className="attendancecontent">
            <h2>Attendance</h2>
            <div className="attendancebtn">
            {!isAttendanceStarted && (
            <button onClick={handleStart}>Start Attendance</button>
        )}
            
            {isAttendanceStarted && (
            <>
                <button onClick={handleStartBreak}>Start Break</button>
                <button onClick={handleEndBreak}>End Break</button>
                <button onClick={handleEnd}>End Attendance</button>
            </>
        )}
            </div>
            <p>{status}</p>
            {startTime && <p>Start Time: {formatedate(startTime)}</p>} 
            {endTime && <p>End Time: {endTime.toLocaleTimeString()}</p>}
            {isTiming && <p>Break started: {formatTime(timer)}</p>} {/* Show the timer */}
            {breakDuration && <p>{breakDuration}</p>}
            
            </div>
            <br />
        </div>
    );
};

export default Attendance;
