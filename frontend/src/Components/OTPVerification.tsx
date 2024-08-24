import React, { useState } from 'react';

const OTPVerification: React.FC = () => {
    const [otp, setOtp] = useState('');

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call backend API to verify OTP
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp }),
        });

        if (response.ok) {
            alert('OTP verified!');
        } else {
            alert('Invalid OTP.');
        }
    };

    return (
        <form onSubmit={handleVerify}>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit">Verify OTP</button>
        </form>
    );
};

export default OTPVerification;
