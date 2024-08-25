import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    isLink: boolean;
    isSubmit: boolean; // Determines if the button is for form submission
    href?: string; // Optional, used for navigation
}

const Button: React.FC<ButtonProps> = ({ text, isSubmit, href, isLink }) => {
    if (isSubmit) {
        return (
            <input className="btn fillBtn" type="submit" value={text} />
        );
    }

    if (isLink && href) {
        return (
            <Link to={href} className="btn borderedBtn">
                {/* Render HTML safely using dangerouslySetInnerHTML */}
                <span dangerouslySetInnerHTML={{ __html: text }} />
            </Link>
        );
    }

    return null; // Return nothing if neither isSubmit nor href is provided
};

export default Button;
