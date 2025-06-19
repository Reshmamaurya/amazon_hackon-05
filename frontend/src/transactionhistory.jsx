import React from 'react';
import './TransactionHistory.css';
import { Link } from 'react-router-dom';

const transactions = [
  {
    id: 1,
    title: 'Payment to BBQ Nation',
    amount: '₹1,200.00',
    date: '19 Jun, 2025 at 7:45 PM',
    status: 'Successful',
    type: 'Dining'
  },
  {
    id: 2,
    title: 'Mobile Recharge - Jio',
    amount: '₹299.00',
    date: '18 Jun, 2025 at 9:12 AM',
    status: 'Successful',
    type: 'Recharge'
  },
  {
    id: 3,
    title: 'Order on Amazon',
    amount: '₹2,499.00',
    date: '17 Jun, 2025 at 1:30 PM',
    status: 'Successful',
    type: 'Shopping'
  }
];

const TransactionHistory = () => {
  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Amazon Pay - Transaction History</h2>
      <div className="transaction-list">
        {transactions.map(tx => (
          <Link to={`/transaction/${tx.id}`} className="transaction-card" key={tx.id}>
            <div className="transaction-info">
              <p className="transaction-name">{tx.title}</p>
              <p className="transaction-date">{tx.date}</p>
              <span className="transaction-status">{tx.status}</span>
            </div>
            <div className="transaction-meta">
              <p className="transaction-amount">{tx.amount}</p>
              <p className="transaction-type">{tx.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
