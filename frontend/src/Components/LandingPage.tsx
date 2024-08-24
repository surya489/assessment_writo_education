import React from 'react';
import { Link } from 'react-router-dom';
const LandingPage: React.FC = () => (
    <div>
        <h1>Welcome to the Assessment App</h1>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
    </div>
);

export default LandingPage;
