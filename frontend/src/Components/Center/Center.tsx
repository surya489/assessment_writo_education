import React from "react";
import './Center.css';
// Define the interface for the props
interface CenterProps {
    children: React.ReactNode;
}

// Use the interface to type the component
const Center: React.FC<CenterProps> = ({ children }) => {
    return (
        <div className="center">
            {children}
        </div>
    );
}

export default Center;
