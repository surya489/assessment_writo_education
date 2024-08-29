import React from "react";

import './Form.css';
import Button from "../Button/Button";
import PasswordInput from "../PasswordInput/PasswordInput";
import loader from '../../assets/images/loader.png';

interface SignUpFormProps {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    contactMode: string,
    setContactMode: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    isSignUp: boolean;
    error: string;
    statusClass: string; // New prop for status class
    loading: boolean; // New loading prop
    isOTPVerify: boolean;
    clickEvent?: () => void;
}

interface SignInFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    verifyPassword: string;
    setVerifyPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    isSignUp: boolean;
    error: string;
    statusClass: string; // New prop for status class
    loading: boolean; // New loading prop
    isOTPVerify: boolean;
    onClick?: () => void;
}

interface OTPVerfyFormProps {
    otp: string;
    setOtp: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    isSignUp: boolean;
    error: string;
    statusClass: string; // New prop for status class
    loading: boolean; // New loading prop
    isOTPVerify: boolean;
}

type FormProps = SignUpFormProps | SignInFormProps | OTPVerfyFormProps;

const Form: React.FC<FormProps> = (props) => {
    if (props.isSignUp) {
        const {
            firstName,
            setFirstName,
            lastName,
            setLastName,
            email,
            setEmail,
            password,
            setPassword,
            confirmPassword,
            setConfirmPassword,
            contactMode,
            setContactMode,
            error,
            handleSubmit,
            clickEvent,
            statusClass // Destructure statusClass
        } = props as SignUpFormProps;

        return (
            <div className={`signUpFormWrap col_60 ${props.loading ? 'loading' : ''}`}>
                <div className='title' >
                    <h2 className="poppinsBlack">Let us Know<span className='textRed'>!</span></h2>
                    <Button
                        isSubmit={false}
                        hasClickEvent={true}
                        isLink={false}
                        text="<span class='textPlum lato'>Sign</span><span class='textRed lato'>In</span>"
                        onClick={clickEvent}
                    />
                </div>
                <form className="signUpForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                        placeholder="Password"
                    />
                    <PasswordInput
                        password={confirmPassword}
                        setPassword={setConfirmPassword}
                        placeholder="Retype Password"
                    />
                    <select value={contactMode} onChange={(e) => setContactMode(e.target.value)}>
                        <option value='' disabled>Contact Mode</option>
                        <option value='phone'>Phone</option>
                        <option value='mail'>Mail</option>
                    </select>
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="btnWrap">
                        <div className="loader">
                            <img src={loader} alt="loader" />
                        </div>
                        <Button isSubmit={true} isLink={false} text="Sign Up" />
                    </div>
                </form>
                {error && <div className={`message ${statusClass}`}> {error}</div >}
            </div >
        );
    }

    if (props.isOTPVerify) {
        const {
            otp,
            setOtp,
            error,
            handleSubmit,
            statusClass // Destructure statusClass
        } = props as OTPVerfyFormProps;

        return (
            <div className={`signInFormWrap col_60 ${props.loading ? 'loading' : ''}`}> {/* Conditionally add loading class */}
                <div className='title' >
                    <h2 className="poppinsBlack">Fill what we know<span className='textRed'>!</span></h2>
                </div>
                <form className="signInForm" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className="btnWrap">
                        <div className="loader">
                            <img src={loader} alt="loader" />
                        </div>
                        <Button isSubmit={true} isLink={false} text="Verify" />
                    </div>
                </form>
                {error && <div className={`message ${statusClass}`}> {error}</div >}
            </div >
        );

    }

    // Sign-in form
    const {
        email,
        setEmail,
        verifyPassword,
        setVerifyPassword,
        error,
        handleSubmit,
        statusClass,
        onClick
    } = props as SignInFormProps;

    return (
        <div className={`signInFormWrap col_60 ${props.loading ? 'loading' : ''}`}> {/* Conditionally add loading class */}
            <div className='title' >
                <h2 className="poppinsBlack">Fill what we know<span className='textRed'>!</span></h2>
            </div>
            <form className="signInForm" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                    password={verifyPassword}
                    setPassword={setVerifyPassword}
                    placeholder="Password"
                />
                <div className="btnWrap">
                    <div className="loader">
                        <img src={loader} alt="loader" />
                    </div>
                    <Button isSubmit={true} isLink={false} text="Sign In" />
                </div>
                <Button isSignUp={true} hasClickEvent={true} isSubmit={false} isLink={false} onClick={onClick} text="Sign Up" />
            </form>
            {error && <div className={`message ${statusClass}`}> {error}</div >}
        </div>
    );
};

export default Form;