// src/pages/TransactionDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TransactionDetail.css';

const TransactionDetail = () => {
  const { id } = useParams(); // from URL
  const navigate = useNavigate();

  return (
    <div className="transaction-detail-container">
      <h2>✅ Transaction Successful</h2>
      <p>Transaction ID: {id}</p>
      <p>Paid To: The Spice Lounge Restaurant</p>
      <p>Amount: ₹2,500</p>
      <p>Date: June 19, 2025</p>

      <button className="split-btn" onClick={() => navigate(`/split/${id}`)}>
        Split Payment
      </button>
    </div>
  );
};

export default TransactionDetail;
