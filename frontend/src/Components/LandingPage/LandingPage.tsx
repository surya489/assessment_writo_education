import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

import './LandingPage.css';
import Center from '../Center/Center';
import signUpImage from '../../assets/images/signUp.png';
import Form from '../Form/Form';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Add loading class immediately

        try {
            const response = await axios.post('http://localhost:5000/userForm', { email, password, confirmPassword, contactMode });

            // Add a short delay before hiding the loading animation
            setTimeout(() => {
                if (response.status === 200) {
                    // Save token to local storage
                    localStorage.setItem('token', response.data.token);

                    setStatusClass('success');
                    setError(response.data.message);
                    setIsOTPVerify(true); // Switch to OTP verification after successful registration
                } else {
                    setStatusClass('error');
                    setError('An unexpected response was received.');
                }

                setLoading(false); // Remove loading class after delay
            }, 2000); // Adjust the delay as needed
        } catch (err) {
            const axiosError = err as AxiosError;

            // Add a short delay before hiding the loading animation
            setTimeout(() => {
                setLoading(false); // Remove loading class

                if (axiosError.response && axiosError.response.data) {
                    const errorData = axiosError.response.data;

                    if (typeof errorData === 'object' && (errorData as any).message) {
                        setError((errorData as any).message);
                    } else {
                        setError(typeof errorData === 'string' ? errorData : JSON.stringify(errorData));
                    }

                    setStatusClass('error');
                } else {
                    setError('An unknown error occurred.');
                    setStatusClass('error');
                }
            }, 2000); // Adjust the delay as needed
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

            // Add a short delay before hiding the loading animation
            setTimeout(() => {
                if (response.status === 200) {
                    setStatusClass('success');
                    setError('OTP verified successfully');
                    // Additional success logic
                } else {
                    setStatusClass('error');
                    setError('An unexpected response was received.');
                }

                setLoading(false); // Remove loading class after delay
            }, 2000); // Adjust the delay as needed
        } catch (err) {
            const axiosError = err as AxiosError;

            // Add a short delay before hiding the loading animation
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
                {isOTPVerify ? (
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
