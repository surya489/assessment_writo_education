const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/verify-otp', authController.verifyOTP);
router.post('/signin', authController.signin);

module.exports = router;
