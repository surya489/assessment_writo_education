const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Added bcrypt import
const nodemailer = require('nodemailer'); // Import Nodemailer
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User'); // Import the User model
const authenticateJWT = require('./middleware/jwtMiddleware');

const app = express();
const url = process.env.MONGO_URI;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3002', // Update to the correct frontend URL
    methods: ['GET', 'POST'],
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS // Your email password or app password
    }
});

// Function to generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Define routes
app.post('/userForm', async (req, res) => {
    const { email, password, confirmPassword, contactMode } = req.body;

    if (!email && !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    } else if (!email) {
        return res.status(400).json({ message: 'Please enter email' });
    } else if (!password || !confirmPassword) {
        return res.status(400).json({ message: 'Please enter password' });
    } else if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords should match' });
    } else if (!contactMode) {
        return res.status(400).json({ message: 'please select' });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a 6-digit OTP
        const otp = generateOTP();

        // Create a new user
        const otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

        const newUser = new User({
            email,
            password: hashedPassword,
            otp,
            otpExpires,
        });
        await newUser.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Registration Successful',
            text: `Hello,\n\nThank you for registering!\n\nYour OTP is: ${otp}\n\nPlease use this OTP to complete your registration.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'User registered successfully and email sent' });
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            res.status(400).json({ message: 'Email already exists' });
        } else {
            console.error('Error saving user:', err.message);
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
});


// Update the otpVerify route
app.post('/otpVerify', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP after successful verification
        user.otp = '';
        user.otpExpires = null;
        await user.save();

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id }, // Payload with user ID
            process.env.JWT_SECRET, // Secret key from .env
            { expiresIn: '1h' } // Token expiration time
        );

        // Set token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (err) {
        console.error('Error verifying OTP:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Example protected route
app.get('/protectedRoute', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});



// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
