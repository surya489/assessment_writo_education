const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Function to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        const user = new User({ email, password, otp, otpExpires });
        await user.save();

        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'User registered, OTP sent to email' });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up user' });
    }
};

exports.verifyOTP = async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findOne({ otp, otpExpires: { $gt: new Date() } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'OTP verified', token });
    } catch (error) {
        res.status(500).json({ error: 'Error verifying OTP' });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'User signed in', token });
    } catch (error) {
        res.status(500).json({ error: 'Error signing in user' });
    }
};
