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
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [statusClass, setStatusClass] = useState<string>(''); // State for status class

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/userForm', { email, password });

            // Check status code for success
            if (response.status === 200) {
                setError('');
                setStatusClass('success'); // Add success class
            } else {
                setError('An unexpected response was received.');
                setStatusClass('error'); // Add error class
            }

            // Check if response data has a 'message' property
            if (typeof response.data === 'object' && (response.data as any).message) {
                setError((response.data as any).message);
            }

        } catch (err) {
            const axiosError = err as AxiosError;
            if (axiosError.response && axiosError.response.data) {
                const errorData = axiosError.response.data;

                // Check if errorData is an object and has a 'message' property
                if (typeof errorData === 'object' && (errorData as any).message) {
                    setError((errorData as any).message);
                } else {
                    setError(typeof errorData === 'string' ? errorData : JSON.stringify(errorData));
                }

                // Set class based on status code
                if (axiosError.response.status === 400) {
                    setStatusClass('error'); // Add error class for status code 400
                } else if (axiosError.response.status === 500) {
                    setStatusClass('error'); // Add error class for status code 500
                } else {
                    setStatusClass('error'); // Generic error class
                }

            } else {
                setError('An unknown error occurred.');
                setStatusClass('error'); // Generic error class
            }
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
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    isSignUp={true}
                    error={error}
                    statusClass={statusClass} // Pass status class as prop
                />
            </div>
        </Center>
    );
};

export default LandingPage;
