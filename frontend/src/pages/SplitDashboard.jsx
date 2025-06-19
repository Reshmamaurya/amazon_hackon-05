import React, { useState } from 'react';
import './SplitDashboard.css';

const dummyFriends = [
  { id: 1, name: 'Aditi', email: 'aditi@example.com' },
  { id: 2, name: 'Ravi', email: 'ravi@example.com' },
  { id: 3, name: 'Priya', email: 'priya@example.com' },
  { id: 4, name: 'Rohan', email: 'rohan@example.com' },
];

const SplitDashboard = ({ transaction = { title: 'Payment XYZ', amount: '₹1000.00' } }) => {
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [splitMode, setSplitMode] = useState('equal');
  const [customAmounts, setCustomAmounts] = useState({});
  const [groups, setGroups] = useState([]);

  const handleSelectFriend = (friend) => {
    setSelectedFriends((prev) =>
      prev.some((f) => f.id === friend.id)
        ? prev.filter((f) => f.id !== friend.id)
        : [...prev, friend]
    );
  };

  const handleCustomAmountChange = (id, amount) => {
    setCustomAmounts((prev) => ({ ...prev, [id]: amount }));
  };

  const handleSplit = () => {
    const total = parseFloat(transaction.amount.replace(/[₹,]/g, ''));
    let splitDetails = [];

    if (splitMode === 'equal') {
      const amount = (total / (selectedFriends.length + 1)).toFixed(2);
      splitDetails = selectedFriends.map((f) => ({
        ...f,
        amount,
      }));
    } else {
      splitDetails = selectedFriends.map((f) => ({
        ...f,
        amount: customAmounts[f.id] || '0',
      }));
    }

    const newGroup = {
      name: groupName || `Group ${groups.length + 1}`,
      members: selectedFriends,
      details: splitDetails,
    };

    setGroups([...groups, newGroup]);
    alert(`Group "${newGroup.name}" created.\nSplit:\n${splitDetails.map(f => `${f.name}: ₹${f.amount}`).join('\n')}`);
    
    // Reset form
    setGroupName('');
    setSelectedFriends([]);
    setCustomAmounts({});
  };

  const filteredFriends = dummyFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="split-dashboard-wrapper">
      <div className="split-dashboard-left">
        <h2>Split Payment: {transaction.title}</h2>

        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="group-name-input"
        />

        <input
          type="text"
          placeholder="Search friends"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="friend-selection">
          <h4>Select Friends:</h4>
          {filteredFriends.map((friend) => (
            <label key={friend.id} className="friend-item">
              <input
                type="checkbox"
                onChange={() => handleSelectFriend(friend)}
                checked={selectedFriends.some((f) => f.id === friend.id)}
              />
              {friend.name} ({friend.email})
            </label>
          ))}
        </div>

        <div className="split-mode">
          <label>
            <input
              type="radio"
              value="equal"
              checked={splitMode === 'equal'}
              onChange={() => setSplitMode('equal')}
            />
            Split Equally
          </label>
          <label>
            <input
              type="radio"
              value="custom"
              checked={splitMode === 'custom'}
              onChange={() => setSplitMode('custom')}
            />
            Custom Split
          </label>
        </div>

        {splitMode === 'custom' && (
          <div className="custom-amounts">
            {selectedFriends.map((friend) => (
              <div key={friend.id}>
                {friend.name}:
                <input
                  type="number"
                  placeholder="Amount"
                  value={customAmounts[friend.id] || ''}
                  onChange={(e) => handleCustomAmountChange(friend.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        <button onClick={handleSplit} disabled={selectedFriends.length === 0}>
          Create Group & Split
        </button>
      </div>

      <div className="split-dashboard-right">
        <h3>My Groups</h3>
        {groups.length === 0 ? (
          <p>No groups yet</p>
        ) : (
          groups.map((group, index) => (
            <div key={index} className="group-box">
              <strong>{group.name}</strong>
              <ul>
                {group.details.map((member) => (
                  <li key={member.id}>{member.name}: ₹{member.amount}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SplitDashboard;
