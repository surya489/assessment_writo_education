const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Added bcrypt import
const nodemailer = require('nodemailer'); // Import Nodemailer
require('dotenv').config();

const User = require('./models/User'); // Import the User model

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

// Define routes
app.post('/userForm', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'suryajaya4899@gmail.com',
            subject: 'Registration Successful',
            text: `Hello,\n\nThank you for register!`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'User registered successfully and email sent' });
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            res.status(400).json({ message: 'Email already exists' });
        } else {
            console.error('Error saving user:', err.message);
            console.error('Stack trace:', err.stack);
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
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
