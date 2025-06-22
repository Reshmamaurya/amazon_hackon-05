import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TransactionDetail.css';

const TransactionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const transaction = location.state?.transaction;

  if (!transaction) {
    return (
      <div className="transaction-detail-container">
        <h2>❌ Transaction Not Found</h2>
        <p>Please access this page from the transaction history.</p>
        <button className="back-btn" onClick={() => navigate('/transactions')}>
          ← Back to History
        </button>
      </div>
    );
  }

  return (
    <div className="transaction-detail-container">
      <h2>✅ Transaction Successful</h2>
      <p><strong>Transaction ID:</strong> {transaction.id}</p>
      <p><strong>Paid To:</strong> {transaction.title}</p>
      <p><strong>Amount:</strong> {transaction.amount}</p>
      <p><strong>Date:</strong> {transaction.date}</p>
      <p><strong>Type:</strong> {transaction.type}</p>
      <p><strong>Status:</strong> {transaction.status}</p>

     <button
  className="split-btn"
  onClick={() =>
    navigate(`/split/${transaction.id}`, {
      state: {
        transaction: {
          title: transaction.title,
          amount: transaction.amount,
        }
      }
    })
  }
>
  Split Payment
</button>

    </div>
  );
};

export default TransactionDetail;

