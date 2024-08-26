import React from 'react';
import './WelcomePage.css';
import Center from '../Center/Center';

const WelcomePage: React.FC = () => {
    return (
        <Center>
            <div className='welcomePage'>
                <h2>Welcome to our platform!</h2>
                <p>Your registration was successful. Please verify your OTP to continue.</p>
            </div>
        </Center>
    );
};

export default WelcomePage;
