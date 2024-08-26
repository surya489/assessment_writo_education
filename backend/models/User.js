// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    lastName: { type: String, required: false, unique: false },
    firstName: { type: String, required: false, unique: false },
    contactMode: { type: String, required: false, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, default: '' },
    otpExpires: { type: Date, default: null },
});

module.exports = mongoose.model('User', UserSchema);
