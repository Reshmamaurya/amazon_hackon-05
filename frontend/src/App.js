import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import LoginPage from './pages/LoginPage';
import HomePage from './HomePage'; 
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './transactionhistory';
import TransactionDetail from './TransactionDetails'; // ✅ Import detail page
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/amazon-pay" element={<TransactionHistory />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} /> {/* ✅ Detail route */}
      </Routes>
    </Router>
  );
}

export default App;
