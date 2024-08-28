import React, { useState, useEffect } from 'react';
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
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://assessment-writo-education.onrender.com'
        : 'http://localhost:5000';

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserDetails = localStorage.getItem('userDetails');
            if (storedUserDetails) {
                const userDetails = JSON.parse(storedUserDetails);
                setFirstName(userDetails.firstName);
                setLastName(userDetails.lastName);
                setEmail(userDetails.email);
                setContactMode(userDetails.contactMode);
                setShowWelcome(true);
            }
        };

        fetchUserData();
    }, []);

    axios.defaults.withCredentials = true; // Include credentials in requests

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Show loading animation

        try {
            const response = await axios.post(`${baseUrl}/userForm`, { email, password, confirmPassword, contactMode, firstName, lastName }, { withCredentials: true });

            setTimeout(() => {
                if (response.status === 200) {
                    // Save token to local storage
                    localStorage.setItem('token', response.data.token);

                    setLoading(false);
                    setStatusClass('success');
                    setError(response.data.message);
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
        }
    };


    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${baseUrl}/otpVerify`, { email, otp });

            if (response.status === 200) {
                setStatusClass('success');
                setError('OTP verified successfully');
                // Update localStorage with user details
                localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
                setShowWelcome(true);
                setTimeout(() => setIsOTPVerify(false), 3000);
            } else {
                handleError('An unexpected response was received.');
            }

        } catch (err) {
            handleError(err as AxiosError | string);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error: AxiosError | string) => {
        let errorMessage = 'An unknown error occurred.';
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (axios.isAxiosError(error) && error.response) {
            errorMessage = (error.response.data as any).message || 'An error occurred.';
        }

        setError(errorMessage);
        setStatusClass('error');
    };

    return (
        <Center>
            {showWelcome ? (
                <WelcomePage userDetails={{ firstName, lastName, email, contactMode }} />
            ) : (
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
            )}
        </Center>
    );
};

export default LandingPage;
