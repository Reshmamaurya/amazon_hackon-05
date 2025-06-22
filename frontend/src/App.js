import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './transactionhistory';
// import TransactionDetail from './TransactionDetails';
import SplitDashboard from './pages/SplitDashboard';
import GroupTab from './pages/GroupTab'; // ✅ Group Tab Import
import CartPage from './pages/CartPage';
import SharedCartPage from './pages/SharedCartPage';
import './App.css';
import TransactionDetail from './TransactionDetails';



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
        {/* <Route path="/transaction/:id" element={<TransactionDetail />} /> */}
        <Route path="/split/:id" element={<SplitDashboard />} />
        <Route path="/group" element={<GroupTab />} /> 
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/shared-cart" element={<SharedCartPage />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
