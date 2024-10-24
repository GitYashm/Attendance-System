import axios from 'axios';
const startBreak = async (userId, token) => {
    const response = await axios.post(
        'http://localhost:5000/api/attendance/break/start',
        { userId },
        {
            headers: {
                'x-auth-token': token
            }
        }
    );
    return response.data;
};


const endBreak = async (userId, token) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/attendance/break/end',
            { userId },
            {
                headers: { 'x-auth-token': token },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error in endBreak:', error);
        throw error;
    }
};
export{
startBreak,endBreak
}