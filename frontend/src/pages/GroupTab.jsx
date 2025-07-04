import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import './GroupTab.css';

const API_BASE = 'http://localhost:5000';

const GroupTab = () => {
  const [currentUser, setCurrentUser] = useState({ email: '', _id: '', name: '' });
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(user.email)}`);
          setCurrentUser(res.data);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications`);
      setNotifications((res.data || []).filter(n => n.status === 'pending'));
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, [currentUser.email]);

  const fetchGroups = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups`);
      const acceptedGroups = res.data
        .map(group => {
          const member = group.members.find(m => m.userId === currentUser._id);
          if (!member) return null;

          return {
            ...group,
            paymentStatus: member.hasPaid ? 'true' : 'false',
            status: member.status
          };
        })
  //     const acceptedGroups = res.data
  // .map(group => {
  //   const member = group.members.find(m => m.userId === currentUser._id);
  //   if (!member || (member.status !== 'accepted' && member.status !== 'invited')) return null;

  //   return {
  //     ...group,
  //     members: group.members, // <--- preserve this!
  //     paymentStatus: member.hasPaid ? 'true' : 'false',
  //     status: member.status
  //   };
  // })
  // // .filter(Boolean);

        .filter(Boolean);
      setGroups(acceptedGroups);
    } catch (err) {
      console.error('Error fetching groups:', err);
    }
  }, [currentUser.email]);

  const fetchFriends = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/friends`);
      setFriends(res.data || []);
    } catch (err) {
      console.error('Error fetching friends:', err);
    }
  }, [currentUser.email]);

  useEffect(() => {
    if (currentUser.email) {
      fetchNotifications();
      fetchGroups();
      fetchFriends();
    }
  }, [currentUser.email, fetchNotifications, fetchGroups, fetchFriends]);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      await axios.post(`${API_BASE}/api/users/friend-request`, {
        fromEmail: currentUser.email,
        toEmail: searchTerm,
      });
      setFriendRequestSent(true);
      setTimeout(() => setFriendRequestSent(false), 2000);
      setSearchTerm('');
    } catch (err) {
      console.error('Failed to send friend request:', err);
    }
  };

  const respondToNotification = async (notificationId, action) => {
    try {
      await axios.post(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications/${notificationId}/respond`, {
        action
      });
      fetchNotifications();
      fetchFriends();
      fetchGroups();
    } catch (err) {
      console.error('Failed to respond to notification:', err);
    }
  };

  const handlePayment = useCallback(async (groupId) => {
    try {
      await axios.post(
        `${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups/${groupId}/pay`
      );
      fetchGroups();
    } catch (err) {
      console.error('Payment failed:', err);
      alert('Payment failed. Please try again.');
    }
  }, [currentUser.email, fetchGroups]);

  return (
    <div className="group-tab-container amazon-theme">
      <h2>Group Dashboard</h2>

      <div className="group-tabs">
        <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>Notifications</button>
        <button onClick={() => setActiveTab('my-groups')} className={activeTab === 'my-groups' ? 'active' : ''}>My Groups</button>
        <button onClick={() => setActiveTab('my-friends')} className={activeTab === 'my-friends' ? 'active' : ''}>My Friends</button>
      </div>

      <div className="group-search">
        <input
          type="text"
          placeholder="Search by email to send friend request"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Send Request</button>
      </div>
      {friendRequestSent && <p className="success-msg">✅ Friend request sent!</p>}

      <div className="group-tab-content">
        {activeTab === 'notifications' && (
          <div>
            {notifications.length === 0 ? (
              <p>You have no new notifications.</p>
            ) : (
              <ul className="notification-list">
                {notifications.map((n, idx) => (
                  <li key={idx} className="notification-item">
                    <p>{n.message}</p>
                    {(n.type === 'group-invite' || n.type === 'friend-request' || n.type ==='payment-reminder' || n.type==='payment-confirmation') && (
                      <div className="notification-actions">
                        <button onClick={() => respondToNotification(n._id, 'accepted')}>Accept</button>
                        <button onClick={() => respondToNotification(n._id, 'declined')}>Decline</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'my-groups' && (
          <div>
            {groups.length === 0 ? (
              <p>You are not part of any groups yet.</p>
            ) : (
              <ul className="group-list">
                {groups.map((g, idx) => {
                  const member = g.members.find(m => m.userId === currentUser._id);
                  return (
                    <li key={idx} className="group-item">
                      <p><strong>{g.name}</strong></p>
                      {g.requiresPayment && member ? (
                        member.hasPaid ? (
                          <p className="paid-label">✅ Payment Completed</p>
                        ) : (
                          <div className="pay-now-section">
                            <p>💰 Payment Pending</p>
                            <button className="pay-now-btn" onClick={() => handlePayment(g._id)}>Pay Now</button>
                          </div>
                        )
                      ) : (
                        <p>No payment required</p>
                      )}
                      {/* {g.requiresPayment && member ? (
  member.status !== 'accepted' ? (
    <p className="info-label">⏳ Please accept the invite to proceed with payment.</p>
  ) : member.hasPaid ? (
    <p className="paid-label">✅ Payment Completed</p>
  ) : (
    <div className="pay-now-section">
      <p>💰 Payment Pending</p>
      <button className="pay-now-btn" onClick={() => handlePayment(g._id)}>Pay Now</button>
    </div>
  )
) : (
  <p>No payment required</p>
)} */}

                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'my-friends' && (
          <div>
            {friends.length === 0 ? (
              <p>No friends added yet.</p>
            ) : (
              <ul className="friend-list">
                {friends.map((f, idx) => (
                  <li key={idx}>{f.name} ({f.email})</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupTab;
