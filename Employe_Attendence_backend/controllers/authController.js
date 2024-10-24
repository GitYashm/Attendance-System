const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Register new user
// controllers/authController.js
const register = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if the user already exists
        const userId = uuidv4();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password and save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ userId, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User created', userId: newUser.userId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Login user
const login = async (req,res)=>{
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(409)
            res.json({message:"Authentication failed",success:false});
        }
        const IsPassword = await bcrypt.compare(password,user.password);
        if(!IsPassword){
            return res.status(409)
            .json({message:"Authentication failed",success:false});
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, userId: user._id, role: user.role });
    }
    catch (err){
        res.status(500)
            .json({message:"Internal Server Error",success:false});
    }
}


module.exports = {register,login};
