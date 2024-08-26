import React from 'react';
import './WelcomePage.css';
import Center from '../Center/Center';

interface WelcomePageProps {
    userDetails: {
        firstName: string;
        lastName: string;
        email: string;
        contactMode: string;
    };
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userDetails }) => {
    console.log(userDetails);
    const fullName = userDetails.firstName + userDetails.lastName;
    const contact = userDetails.contactMode;
    const email = userDetails.email;
    return (
        <Center>
            <div className='welcomePage'>
                <div className='pageContents'>
                    <h2 className='pageTitle poppinsBlack'>Welcome to our platform, {fullName} <span className='textRed'>!</span></h2>
                    <p className='pageText lato'>{contact}</p>
                    <p className='pageText lato'>{email}</p>
                </div>
            </div>
        </Center>
    );
};

export default WelcomePage;
