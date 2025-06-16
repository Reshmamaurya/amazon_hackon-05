import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import LoginPage from './LoginPage';
import HomePage from './HomePage'; // move homepage content here
import SignupPage from './SignupPage';
import SmartSpend from './SmartSpend';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/smartspend" element={<SmartSpend />} />
      </Routes>
    </Router>
  );
}

export default App;
