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
        setLoading(true); // Show loading animation

        try {
            setTimeout(async () => {
                try {
                    const response = await axios.post('http://localhost:5000/userForm', { email, password, confirmPassword, contactMode });

                    // Check status code for success
                    if (response.status === 200) {
                        // Remove loading animation, then show success message
                        setLoading(false);
                        setStatusClass('success');
                        setError(response.data.message);
                        setIsOTPVerify(true); // Switch to OTP verification after successful registration
                    } else {
                        setError('An unexpected response was received.');
                        setStatusClass('error');
                        setLoading(false); // Remove loading animation
                    }
                } catch (err) {
                    const axiosError = err as AxiosError;
                    setLoading(false); // Remove loading animation

                    if (axiosError.response && axiosError.response.data) {
                        const errorData = axiosError.response.data;

                        // Show error message
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

                    // Remove error message after 2 seconds
                    setTimeout(() => {
                        setError('');
                        setStatusClass('');
                    }, 2000); // Message display duration
                }
            }, 2000); // Initial loading duration
        } catch (err) {
            const axiosError = err as AxiosError;
            setLoading(false);

            if (axiosError.response && axiosError.response.data) {
                setError((axiosError.response.data as any).message || 'An error occurred.');
                setStatusClass('error');
            } else {
                setError('An unknown error occurred.');
                setStatusClass('error');
            }

            // Remove error message after 2 seconds
            setTimeout(() => {
                setError('');
                setStatusClass('');
            }, 2000); // Message display duration
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/otpVerify', { email, otp });

            if (response.status === 200) {
                setStatusClass('success');
                setError('OTP verified successfully');
                // Additional success logic
            } else {
                setStatusClass('error');
                setError('An unexpected response was received.');
            }
        } catch (err) {
            const axiosError = err as AxiosError;
            if (axiosError.response && axiosError.response.data) {
                setError((axiosError.response.data as any).message || 'An error occurred.');
                setStatusClass('error');
            } else {
                setError('An unknown error occurred.');
                setStatusClass('error');
            }
        } finally {
            setLoading(false);
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
