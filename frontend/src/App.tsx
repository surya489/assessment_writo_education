import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import SignUpForm from './Components/SignUpForm';
import OTPVerification from './Components/OTPVerification';
import SignInForm from './Components/SignInForm';
import ThankYouPage from './Components/ThankYouPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  </Router>
);

export default App;
