import React from "react";

import './Button.css';
import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    isLink?: boolean;
    isSubmit?: boolean;
    href?: string;
    isSignUp?: boolean;
    hasClickEvent?: boolean;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, isSubmit = false, href, isLink = false, onClick, hasClickEvent = false, isSignUp = false }) => {
    const buttonType = isSubmit ? 'submit' : 'button';
    if (isSubmit) {
        return (
            <input className="btn fillBtn" type="submit" value={text} />
        );
    }

    if (href) {
        return (
            <Link to={href} className={`${isLink ? 'link' : 'btn borderedBtn'}`}>
                <span dangerouslySetInnerHTML={{ __html: text }} />
            </Link>
        );
    }

    if (onClick && hasClickEvent) {
        return (
            <button
                type={buttonType}
                className={`${isSignUp ? 'btn borderedBtn' : ''}`}
                onClick={hasClickEvent ? onClick : undefined}>
                <span dangerouslySetInnerHTML={{ __html: text }} />
            </button>
        )
    }

    return (
        <button className="borderedBtn btn signOut" onClick={onClick}>{text}</button>
    );
};

export default Button;
