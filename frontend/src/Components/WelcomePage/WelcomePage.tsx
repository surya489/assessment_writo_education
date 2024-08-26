import React from 'react';
import './WelcomePage.css'; // Add your own styles here

interface WelcomePageProps {
    onProceed?: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onProceed }) => {
    return (
        <div className='welcomePage'>
            <h2>Welcome to our platform!</h2>
            <p>Your registration was successful. Please verify your OTP to continue.</p>
            <button onClick={onProceed}>Proceed to OTP Verification</button>
        </div>
    );
};

export default WelcomePage;
