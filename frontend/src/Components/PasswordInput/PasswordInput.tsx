import React, { useState } from 'react';

import './PasswordInput.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface PasswordInputProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword, placeholder }) => {
    // State to manage password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={placeholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '2rem' }} // Adjust padding for the icon
            />
            <span
                onClick={togglePasswordVisibility}
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                }}
                className={`${isPasswordVisible ? 'show' : ''}`}
            >
                {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
        </div>
    );
};

export default PasswordInput;
