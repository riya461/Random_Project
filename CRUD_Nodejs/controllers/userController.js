const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide name, email and password');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        hashedPassword
    });
    res.json({
        message: 'Register users',
        data: user
    });
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }
    const user = await User.findOne({ email });
    if (user&& (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({ 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'});
        res.status(200).json({accessToken });
    }else{
        res.status(401);
        throw new Error('Invalid credentials');
    }
    res.json({
        message: 'Login users'
    });
});

const getCurrentUser = asyncHandler( async (req, res) => {
    res.json({
        message: 'Get current user'
    });
});

module.exports = { registerUser, loginUser, getCurrentUser };