import React from "react";

import './Form.css';
import Button from "../Button/Button";
import PasswordInput from "../PasswordInput/PasswordInput";  // Import PasswordInput component

interface SignUpFormProps {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    isSignUp: true;
}

interface SignInFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    verifyPassword: string;
    setVerifyPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    isSignUp: false;
}

type FormProps = SignUpFormProps | SignInFormProps;

const Form: React.FC<FormProps> = (props) => {
    if (props.isSignUp) {
        // Sign-up form
        const {
            firstName,
            setFirstName,
            lastName,
            setLastName,
            email,
            setEmail,
            password,
            setPassword,
            newPassword,
            setNewPassword,
            handleSubmit
        } = props as SignUpFormProps;

        return (
            <div className="signUpFormWrap col_60">
                <div className='title'>
                    <h2>Let us Know<span className='textRed'>!</span></h2>
                    <Button isSubmit={false} isLink={true} text="<span class='textPlum'>Sign</span><span class='textRed'>In</span>" href="/signup" />
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
                    {/* Use PasswordInput component for password field */}
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                        placeholder="Password"
                    />
                    {/* Use PasswordInput component for retype password field */}
                    <PasswordInput
                        password={newPassword}
                        setPassword={setNewPassword}
                        placeholder="Retype Password"
                    />
                    <select>
                        <option value='contactMode'>Contact Mode</option>
                        <option value='call'>Call</option>
                        <option value='mail'>Mail</option>
                    </select>
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button isSubmit={true} isLink={false} text="Sign Up" />
                </form>
            </div>
        );
    }

    // Sign-in form
    const {
        email,
        setEmail,
        verifyPassword,
        setVerifyPassword,
        handleSubmit
    } = props as SignInFormProps;

    return (
        <div className="signInFormWrap col_50">
            <div className='title'>
                <h2>Fill what we know<span className='textRed'>!</span></h2>
            </div>
            <form className="signInForm col_50" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Use PasswordInput component for password field */}
                <PasswordInput
                    password={verifyPassword}
                    setPassword={setVerifyPassword}
                    placeholder="Password"
                />
                <Button isSubmit={true} isLink={false} text="Sign In" />
                <Button isSubmit={false} isLink={true} text="<span class='textPlum'>Sign</span><span class='textRed'>Up</span>" href="/signup" />
            </form>
        </div>
    );
};

export default Form;
