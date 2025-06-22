import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path as needed
import './SplitDashboard.css';

const API_BASE = 'http://localhost:5000';

const SplitDashboard = ({ transaction = { title: 'Payment XYZ', amount: '₹1000.00' } }) => {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [splitMode, setSplitMode] = useState('equal');
  const [customAmounts, setCustomAmounts] = useState({});
  const [groups, setGroups] = useState([]);

  // ✅ Fetch currently logged in Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Optional: fetch full user data from backend using email
          const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(user.email)}`);
          setCurrentUser(res.data); // Ensure your backend returns name, email, _id
        } catch (err) {
          console.error('Error fetching user from backend:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch friends when current user is set
  useEffect(() => {
    if (!currentUser.email) return;
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/friends`);
        setFriends(res.data || []);
      } catch (err) {
        console.error('Error fetching friends:', err);
      }
    };

    fetchFriends();
  }, [currentUser.email]);


  const handleSelectFriend = (friend) => {
    setSelectedFriends((prev) =>
      prev.some((f) => f.email === friend.email)
        ? prev.filter((f) => f.email !== friend.email)
        : [...prev, friend]
    );
  };

  const handleCustomAmountChange = (email, amount) => {
    setCustomAmounts((prev) => ({ ...prev, [email]: amount }));
  };



const handleSplit = async () => {
  const total = parseFloat(transaction.amount.replace(/[₹,]/g, ''));
  const allParticipants = [currentUser, ...selectedFriends];

  let members;

  if (splitMode === 'equal') {
    const equalAmount = parseFloat((total / allParticipants.length).toFixed(2));
    members = allParticipants.map((user) => ({
      userId: user._id,
      email: user.email,
      contribution: equalAmount,
    }));
  } else {
    // Calculate total assigned to friends
    const assignedToFriends = selectedFriends.reduce((sum, friend) => {
      const amt = parseFloat(customAmounts[friend.email]) || 0;
      return sum + amt;
    }, 0);

    const creatorContribution = parseFloat((total - assignedToFriends).toFixed(2));

    members = [
      {
        userId: currentUser._id,
        email: currentUser.email,
        contribution: creatorContribution,
      },
      ...selectedFriends.map((friend) => ({
        userId: friend._id,
        email: friend.email,
        contribution: parseFloat(customAmounts[friend.email]) || 0,
      }))
    ];
  }

  try {
    const res = await axios.post(`${API_BASE}/api/groups/create-group`, {
      name: groupName || `Group ${groups.length + 1}`,
      creatorEmail: currentUser.email,
      transactionTitle: transaction.title,
      totalAmount: total,
      members,
    });

    alert('✅ Group created successfully');

    setGroups((prev) => [...prev, { name: groupName, details: members }]);
    setGroupName('');
    setSelectedFriends([]);
    setCustomAmounts({});
  } catch (err) {
    console.error('Group creation error:', err.response?.data || err);
    alert('❌ Failed to create group');
  }
};

  const filteredFriends = friends.filter((friend) =>
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
            <label key={friend.email} className="friend-item">
              <input
                type="checkbox"
                onChange={() => handleSelectFriend(friend)}
                checked={selectedFriends.some((f) => f.email === friend.email)}
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
              <div key={friend.email}>
                {friend.name}:
                <input
                  type="number"
                  placeholder="Amount"
                  value={customAmounts[friend.email] || ''}
                  onChange={(e) => handleCustomAmountChange(friend.email, e.target.value)}
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
                {group.details.map((member, idx) => (
                  <li key={idx}>{member.email}: ₹{member.contribution?.toFixed(2)}</li>

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
