import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import './LandingPage.css';
import Center from '../Center/Center';
import signUpImage from '../../assets/images/signUp.png';
import Form from '../Form/Form';
import WelcomePage from '../WelcomePage/WelcomePage';

const LandingPage: React.FC = () => {
    const [firstName, setFirstName] = useState<string>(() => localStorage.getItem('firstName') || '');
    const [lastName, setLastName] = useState<string>(() => localStorage.getItem('lastName') || '');
    const [email, setEmail] = useState<string>(() => localStorage.getItem('email') || '');
    const [resetPassEmail, setResetPassEmail] = useState<string>(() => localStorage.getItem('email') || '');
    const [contactMode, setContactMode] = useState<string>(() => localStorage.getItem('contactMode') || '');
    const [verifyEmail, setVerifyEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const [isResetPass, setIsResetPass] = useState<string>('');
    const [isConfirmResetPass, setIsConfirmResetPass] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [statusClass, setStatusClass] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>('');
    const [isOTPVerify, setIsOTPVerify] = useState<boolean>(false);
    const [showWelcome, setShowWelcome] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(() => localStorage.getItem('isSignUp') === 'true');
    const [isSignIn, setIsSignIn] = useState<boolean>(() => localStorage.getItem('isSignIn') === 'true');
    const [showForgotPass, setShowForgotPass] = useState<boolean>(false);

    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://assessment-writo-education.onrender.com'
        : 'http://localhost:5000';

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            const userDetails = JSON.parse(storedUserDetails);
            setFirstName(userDetails.firstName || '');
            setLastName(userDetails.lastName || '');
            setEmail(userDetails.email || '');
            setContactMode(userDetails.contactMode || '');
            setShowWelcome(true);
            setIsSignUp(localStorage.getItem('isSignUp') === 'true');
            setIsSignIn(localStorage.getItem('isSignIn') === 'true');
        }
    }, []);

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatusClass('loading');

        try {
            const response = await axios.post(`${baseUrl}/userForm`, { email, password, confirmPassword, contactMode, firstName, lastName }, { withCredentials: true });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setStatusClass('success');
                setError(response.data.message);
                setIsOTPVerify(true);
            } else {
                setStatusClass('error');
                setError('An unexpected response was received.');
            }
        } catch (err) {
            setTimeout(() => {
                handleError(err);
                setLoading(false);
                setTimeout(() => {
                    setError('');
                }, 2000)
            }, 2000);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatusClass('loading');

        try {
            const response = await axios.post(`${baseUrl}/otpVerify`, { email, otp });
            if (response.status === 200) {
                localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
                localStorage.setItem('isSignUp', 'true');
                localStorage.setItem('isSignIn', 'true');
                localStorage.setItem('otpVerify', 'true');
                setStatusClass('success');
                setError('OTP verified successfully');
                setShowWelcome(true);
                setIsSignUp(true);
                setIsSignIn(true);
                setIsOTPVerify(false);
            } else {
                setStatusClass('error');
                setError('An unexpected response was received.');
            }
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
            removeLoadingClass();
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatusClass('loading');

        try {
            const response = await axios.post(`${baseUrl}/signIn`, { verifyEmail, verifyPassword });
            setLoading(true);
            if (response.status === 200) {
                const { userDetails } = response.data;
                localStorage.setItem('isSignIn', 'true');
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                setFirstName(userDetails.firstName || '');
                setLastName(userDetails.lastName || '');
                setEmail(userDetails.email || '');
                setContactMode(userDetails.contactMode || '');
                setStatusClass('success');
                setError('Signed in successfully');
                setShowWelcome(true);
                setIsSignIn(true);
            } else {
                setStatusClass('error');
                setError('An unexpected response was received.');
            }
        } catch (err) {
            setTimeout(() => {
                handleError(err);
                setLoading(false);
                setTimeout(() => {
                    setError('');
                }, 2000)
            }, 2000);
        }
    };

    const resetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatusClass('loading');

        try {
            const response = await axios.post(`${baseUrl}/reSetPass`, { isResetPass, isConfirmResetPass, resetPassEmail });
            setLoading(true);
            if (response.status === 200) {
                const { userDetails } = response.data;
                localStorage.setItem('isSignIn', 'true');
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                setFirstName(userDetails.firstName || '');
                setLastName(userDetails.lastName || '');
                setEmail(userDetails.email || '');
                setContactMode(userDetails.contactMode || '');
                setStatusClass('success');
                setError('Password reset successfully & you`ll be signed in..');
                setTimeout(() => {
                    setShowWelcome(true);
                    setIsSignIn(true);
                    setLoading(false);
                    removeLoadingClass();
                }, 2000);
            } else {
                setLoading(true);
                setTimeout(() => {
                    setStatusClass('error');
                    setError('An unexpected response was received.');
                    removeLoadingClass();
                    setLoading(false);
                }, 2000);
            }
        } catch (err) {
            setLoading(true);
            setTimeout(() => {
                handleError(err);
                setLoading(false);
                setTimeout(() => {
                    setError('')
                }, 2000)
            }, 2000);
        }
    };

    const removeLoadingClass = () => {
        setTimeout(() => {
            setStatusClass('');
        }, 2000);
    };

    const handleError = (err: unknown) => {
        setLoading(false);
        const axiosError = err as AxiosError;
        if (axiosError.response && axiosError.response.data) {
            const errorData = axiosError.response.data;
            setError(typeof errorData === 'string' ? errorData : (errorData as any).message || 'An error occurred.');
        } else {
            setError('An unknown error occurred.');
        }
        setStatusClass('error');
    };

    const handleSignOut = () => {
        localStorage.removeItem('userDetails');
        const otpVerify = localStorage.getItem('otpVerify');
        if (otpVerify) {
            setIsOTPVerify(false);
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setVerifyEmail('');
        setPassword('');
        setConfirmPassword('');
        setVerifyPassword('');
        setError('');
        setContactMode('');
        setShowWelcome(false);
        setIsSignUp(true);
        localStorage.setItem('isSignIn', 'false');
        setIsSignIn(false);
        setResetPassEmail('');
        setIsResetPass('');
        setIsConfirmResetPass('');
        setShowForgotPass(false)
    };

    const handleSignUp = () => {
        setError('');
        localStorage.removeItem('isSignUp');
        localStorage.removeItem('isSignIn');
        localStorage.removeItem('otpVerify');
        setIsSignUp(false);
    };

    const handleClick = () => {
        setError('');
        setIsSignUp(true);
        setIsOTPVerify(false);
        setIsSignIn(false);
        setResetPassEmail('');
        setIsResetPass('');
        setIsConfirmResetPass('');
        setVerifyPassword('');
        setVerifyEmail('');
    }

    const forgotPassword = () => {
        setShowForgotPass(true);
        setError('');
        setVerifyPassword('');
        setVerifyEmail('');
    }

    const closeForgotPass = () => {
        setShowForgotPass(false);
        setError('');
        setIsConfirmResetPass('');
        setIsResetPass('');
        setResetPassEmail('');
    }

    return (
        <Center>
            {showWelcome && isSignIn ? (
                <WelcomePage
                    userDetails={{ firstName, lastName, email, contactMode }} // Pass state values populated from localStorage
                    onSignOut={handleSignOut}
                />
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
                    ) : isSignUp && !isSignIn ? (
                        <Form
                            handleSubmit={handleSignIn}
                            email={verifyEmail}
                            setEmail={setVerifyEmail}
                            resetPassEmail={resetPassEmail}
                            setResetPassEmail={setResetPassEmail}
                            verifyPassword={verifyPassword}
                            setVerifyPassword={setVerifyPassword}
                            isSignUp={false}
                            isOTPVerify={false}
                            error={error}
                            statusClass={statusClass}
                            loading={loading}
                            onClick={handleSignUp}
                            showForgotPass={showForgotPass}
                            forgotPassword={forgotPassword}
                            closeForgotPass={closeForgotPass}
                            resetPassword={resetPassword}
                            resetPass={isResetPass}
                            setResetPass={setIsResetPass}
                            confirmResetPass={isConfirmResetPass}
                            setConfirmResetPass={setIsConfirmResetPass}
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
                            clickEvent={handleClick}
                        />
                    )}
                </div>
            )}
        </Center>
    );
};

export default LandingPage;
