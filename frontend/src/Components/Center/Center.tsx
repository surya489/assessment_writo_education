import React from "react";
import './Center.css';
// Define the interface for the props
interface CenterProps {
    children: React.ReactNode;
    classname?: string;
}

// Use the interface to type the component
const Center: React.FC<CenterProps> = ({ children, classname }) => {
    return (
        <div className={`${classname ? classname : ''} center`}>
            {children}
        </div>
    );
}

export default Center;
