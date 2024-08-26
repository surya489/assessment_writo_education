import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

import './LandingPage.css';
import Center from '../Center/Center';
import signUpImage from '../../assets/images/signUp.png';
import Form from '../Form/Form';
import WelcomePage from '../WelcomePage/WelcomePage'; // Import the new component

const LandingPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [statusClass, setStatusClass] = useState<string>(''); // State for status class
    const [loading, setLoading] = useState<boolean>(false); // New loading state
    const [contactMode, setContactMode] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [isOTPVerify, setIsOTPVerify] = useState<boolean>(false); // New state to handle OTP verification
    const [showWelcome, setShowWelcome] = useState<boolean>(false); // State for showing welcome page

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Show loading animation

        try {
            const response = await axios.post('http://localhost:5000/userForm', { email, password, confirmPassword, contactMode });

            setTimeout(() => {
                if (response.status === 200) {
                    // Save token to local storage
                    localStorage.setItem('token', response.data.token);

                    setLoading(false);
                    setStatusClass('success');
                    setError(response.data.message);
                    setShowWelcome(true); // Show welcome page
                    setTimeout(() => setIsOTPVerify(true), 3000); // Transition to OTP verification after 3 seconds
                } else {
                    setError('An unexpected response was received.');
                    setStatusClass('error');
                    setLoading(false); // Remove loading animation
                }
            }, 2000);
        } catch (err) {
            const axiosError = err as AxiosError;


            setTimeout(() => {
                setLoading(false); // Remove loading animation

                if (axiosError.response && axiosError.response.data) {
                    const errorData = axiosError.response.data;

                    setError(typeof errorData === 'object' && (errorData as any).message
                        ? (errorData as any).message
                        : typeof errorData === 'string'
                            ? errorData
                            : JSON.stringify(errorData)
                    );
                    setStatusClass('error');
                } else {
                    setError('An unknown error occurred.');
                    setStatusClass('error');
                }
            }, 2000); // Adjust the delay as needed
            // setError('');
            //     setStatusClass('');
        }
    };


    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Add loading class immediately

        // Retrieve token from local storage
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/otpVerify', { email, otp }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setTimeout(() => {
                if (response.status === 200) {
                    setStatusClass('success');
                    setError('OTP verified successfully');
                    // Additional success logic
                    setTimeout(() => setIsOTPVerify(false), 3000); // Hide OTP verification form after 3 seconds and show sign-in form
                } else {
                    setStatusClass('error');
                    setError('An unexpected response was received.');
                }

                setLoading(false); // Remove loading class after delay
            }, 2000)
        } catch (err) {
            const axiosError = err as AxiosError;
            setTimeout(() => {
                setLoading(false); // Remove loading class

                if (axiosError.response && axiosError.response.data) {
                    setError((axiosError.response.data as any).message || 'An error occurred.');
                    setStatusClass('error');
                } else {
                    setError('An unknown error occurred.');
                    setStatusClass('error');
                }
            }, 2000); // Adjust the delay as needed
        }
    };


    return (
        <Center>
            <div className='hero'>
                <div className='imageWrap col_40'>
                    <div className='sizer'></div>
                    <div className='image' style={{ backgroundImage: `url(${signUpImage})` }}></div>
                </div>
                {showWelcome && !isOTPVerify ? (
                    <WelcomePage onProceed={() => setIsOTPVerify(true)} />
                ) : isOTPVerify ? (
                    <Form
                        handleSubmit={handleVerify}
                        otp={otp}
                        setOtp={setOtp}
                        isSignUp={false}
                        isOTPVerify={true}
                        error={error}
                        statusClass={statusClass}
                        loading={loading}
                    />
                ) : (
                    <Form
                        handleSubmit={handleSubmit}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        contactMode={contactMode}
                        setContactMode={setContactMode}
                        isSignUp={true}
                        isOTPVerify={false}
                        error={error}
                        statusClass={statusClass}
                        loading={loading}
                    />
                )}
            </div>
        </Center>
    );
};

export default LandingPage;
