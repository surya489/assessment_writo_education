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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Show loading animation

        // Helper function to handle resetting form and states
        const resetForm = () => {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setContactMode('contactMode');
            setError('');
            setStatusClass('');
        };

        try {
            // Wait for 2 seconds to simulate loading
            setTimeout(async () => {
                try {
                    const response = await axios.post('http://localhost:5000/userForm', { email, password, confirmPassword, contactMode });

                    // Check status code for success
                    if (response.status === 200) {
                        // Remove loading animation, then show success message
                        setLoading(false);
                        setStatusClass('success');
                        setError(response.data.message);
                    } else {
                        setError('An unexpected response was received.');
                        setStatusClass('error');
                        setLoading(false); // Remove loading animation
                    }

                    // Remove success or error message after 2 seconds
                    setTimeout(() => {
                        setError(''); // Clear error message
                        setStatusClass(''); // Reset status class
                        if (response.status === 200) {
                            resetForm(); // Reset form fields and states
                        }
                    }, 2000); // Message display duration

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
            setLoading(false); // Ensure loading is removed in case of error

            const axiosError = err as AxiosError;
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
    };



    return (
        <Center>
            <div className='hero'>
                <div className='imageWrap col_40'>
                    <div className='sizer'></div>
                    <div className='image' style={{ backgroundImage: `url(${signUpImage})` }}>
                    </div>
                </div>
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
                    statusClass={statusClass} // Pass status class as prop
                    loading={loading} // Pass loading state
                />
            </div>
        </Center>
    );
};

export default LandingPage;
