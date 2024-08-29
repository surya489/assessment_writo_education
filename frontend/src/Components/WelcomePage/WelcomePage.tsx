import React from 'react';
import './WelcomePage.css';
import Center from '../Center/Center';
import Button from '../Button/Button';

interface WelcomePageProps {
    userDetails: {
        firstName: string;
        lastName: string;
        email: string;
        contactMode: string;
    };
    onSignOut: () => void; // Add onSignOut prop
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userDetails, onSignOut }) => {
    const fullName = `${userDetails.firstName} ${userDetails.lastName}`;
    const contact = userDetails.contactMode;
    const email = userDetails.email;
    return (
        <Center>
            <div className='welcomePage'>
                <div className='pageContents'>
                    <h2 className='pageTitle poppinsBlack'>
                        Hey, <span className='highlight'>{fullName}</span>!
                    </h2>
                    <p className='pageSubtitle lato'>
                        Welcome to Writo Education! We are thrilled to have you here. Let’s explore the endless possibilities together!
                    </p>
                    <p className='pageText lato'>
                        <span className='highlightText'>Preferred Contact :</span> <span className='textDarkPlum'>{contact}</span>
                    </p>
                    <p className='pageText lato'>
                        <span className='highlightText'>Email :</span> <span className='textDarkPlum'>{email}</span>
                    </p>
                    {/* Update Button component to call onSignOut */}
                    <Button text='Sign Out' isLink={false} isSubmit={false} onClick={onSignOut} />
                </div>
            </div>
        </Center>
    );
};

export default WelcomePage;