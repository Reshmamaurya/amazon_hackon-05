import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import LoginPage from './LoginPage';
import HomePage from './HomePage'; // move homepage content here

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
