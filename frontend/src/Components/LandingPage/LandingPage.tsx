import React, { useState } from 'react';
import axios from 'axios'; // Fixed the import

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
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/userForm', { email, password });
            console.log(response.data);
        } catch (err) {
            console.error(err);
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
                />
            </div>
        </Center>
    );
};

export default LandingPage;
