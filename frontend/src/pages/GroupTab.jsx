// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './GroupTab.css';

// const API_BASE = 'http://localhost:5000';

// const GroupTab = () => {
//   const storedUser = JSON.parse(localStorage.getItem('currentUser'));
//   const currentUser = storedUser || { email: '' };

//   const [activeTab, setActiveTab] = useState('notifications');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [friendRequestSent, setFriendRequestSent] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [friends, setFriends] = useState([]);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications`);
//       setNotifications(res.data || []);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//     }
//   }, [currentUser.email]);

//  const fetchGroups = useCallback(async () => {
//   try {
//     const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups`);
//     setGroups(res.data || []);
//   } catch (err) {
//     console.error('Error fetching groups:', err);
//   }
// }, [currentUser.email]);


//   const fetchFriends = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/friends`);
//       console.log("Friends fetched:", res.data);
//       setFriends(res.data || []);
//     } catch (err) {
//       console.error('Error fetching friends:', err);
//     }
//   }, [currentUser.email]);

//   useEffect(() => {
//     if (!currentUser.email) return;
//     fetchNotifications();
//     fetchGroups();
//     fetchFriends();
//   }, [currentUser.email, fetchNotifications, fetchGroups, fetchFriends]);

//   const handleSearch = async () => {
//     if (!searchTerm) return;
//     try {
//       await axios.post(`${API_BASE}/api/users/friend-request`, {
//         fromEmail: currentUser.email,
//         toEmail: searchTerm,
//       });
//       setFriendRequestSent(true);
//       setTimeout(() => setFriendRequestSent(false), 2000);
//       setSearchTerm('');
//     } catch (err) {
//       console.error('Failed to send friend request:', err);
//     }
//   };

//   return (
//     <div className="group-tab-container">
//       <h2>Group Dashboard</h2>

//       <div className="group-tabs">
//         <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>Notifications</button>
//         <button onClick={() => setActiveTab('my-groups')} className={activeTab === 'my-groups' ? 'active' : ''}>My Groups</button>
//         <button onClick={() => setActiveTab('my-friends')} className={activeTab === 'my-friends' ? 'active' : ''}>My Friends</button>
//       </div>

//       <div className="group-search">
//         <input
//           type="text"
//           placeholder="Search by email to send friend request"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>Send Request</button>
//       </div>
//       {friendRequestSent && <p className="success-msg">✅ Friend request sent!</p>}

//       <div className="group-tab-content">
//         {activeTab === 'notifications' && (
//           <div>
//             {notifications.length === 0 ? (
//               <p>You have no new notifications.</p>
//             ) : (
//               <ul>
//                 {notifications.map((n, idx) => (
//                   <li key={idx}>{n.message}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === 'my-groups' && (
//           <div>
//             {groups.length === 0 ? (
//               <p>You are not part of any groups yet.</p>
//             ) : (
//               <ul>
//                 {groups.map((g, idx) => (
//                   <li key={idx}>{g.name}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === 'my-friends' && (
//           <div>
//             {friends.length === 0 ? (
//               <p>No friends added yet.</p>
//             ) : (
//               <ul>
//                 {friends.map((f, idx) => (
//                   <li key={idx}>{f.name} ({f.email})</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GroupTab;


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './GroupTab.css';

// const API_BASE = 'http://localhost:5000';

// const GroupTab = () => {
//   const storedUser = JSON.parse(localStorage.getItem('currentUser'));
// const [currentUser, setCurrentUser] = useState({ email: '' });

// useEffect(() => {
//   // const user = JSON.parse(localStorage.getItem('currentUser'));
//     const user = JSON.parse(localStorage.getItem('b23cs1034@iitj.ac.in'));
//   if (user && user.email) {
//     setCurrentUser(user);
//   }
// }, []);
// console.log(currentUser);


//   const [activeTab, setActiveTab] = useState('notifications');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [friendRequestSent, setFriendRequestSent] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [friends, setFriends] = useState([]);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications`);
//       setNotifications(res.data || []);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//     }
//   }, [currentUser.email]);

//   const fetchGroups = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups`);
//       setGroups(res.data || []);
//     } catch (err) {
//       console.error('Error fetching groups:', err);
//     }
//   }, [currentUser.email]);

//   const fetchFriends = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/friends`);
//       setFriends(res.data || []);
//     } catch (err) {
//       console.error('Error fetching friends:', err);
//     }
//   }, [currentUser.email]);

//   useEffect(() => {
//     if (!currentUser.email) return;
//     fetchNotifications();
//     fetchGroups();
//     fetchFriends();
//   }, [currentUser.email, fetchNotifications, fetchGroups, fetchFriends]);

//   const handleSearch = async () => {
//     if (!searchTerm) return;
//     try {
//       await axios.post(`${API_BASE}/api/users/friend-request`, {
//         fromEmail: currentUser.email,
//         toEmail: searchTerm,
//       });
//       setFriendRequestSent(true);
//       setTimeout(() => setFriendRequestSent(false), 2000);
//       setSearchTerm('');
//     } catch (err) {
//       console.error('Failed to send friend request:', err);
//     }
//   };

//   const respondToNotification = async (notificationId, action) => {
//     try {
//       await axios.post(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications/${notificationId}/respond`, {
//         action
//       });
//       fetchNotifications();
//       fetchFriends();
//       fetchGroups();
//     } catch (err) {
//       console.error('Failed to respond to notification:', err);
//     }
//   };

//   return (
//     <div className="group-tab-container">
//       <h2>Group Dashboard</h2>

//       <div className="group-tabs">
//         <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>Notifications</button>
//         <button onClick={() => setActiveTab('my-groups')} className={activeTab === 'my-groups' ? 'active' : ''}>My Groups</button>
//         <button onClick={() => setActiveTab('my-friends')} className={activeTab === 'my-friends' ? 'active' : ''}>My Friends</button>
//       </div>

//       <div className="group-search">
//         <input
//           type="text"
//           placeholder="Search by email to send friend request"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>Send Request</button>
//       </div>
//       {friendRequestSent && <p className="success-msg">✅ Friend request sent!</p>}

//       <div className="group-tab-content">
//         {activeTab === 'notifications' && (
//           <div>
//             {notifications.length === 0 ? (
//               <p>You have no new notifications.</p>
//             ) : (
//               <ul className="notification-list">
//                 {notifications.map((n, idx) => (
//                   <li key={idx} className="notification-item">
//                     <p>{n.message}</p>
//                     {n.status === 'pending' && (n.type === 'group-invite' || n.type === 'friend-request') && (
//                       <div className="notification-actions">
//                         <button onClick={() => respondToNotification(n._id, 'accepted')}>Accept</button>
//                         <button onClick={() => respondToNotification(n._id, 'declined')}>Decline</button>
//                       </div>
//                     )}
//                     {n.status !== 'pending' && <p>Status: {n.status}</p>}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === 'my-groups' && (
//           <div>
//             {groups.length === 0 ? (
//               <p>You are not part of any groups yet.</p>
//             ) : (
//               <ul>
//                 {groups.map((g, idx) => (
//                   <li key={idx}>{g.name}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === 'my-friends' && (
//           <div>
//             {friends.length === 0 ? (
//               <p>No friends added yet.</p>
//             ) : (
//               <ul>
//                 {friends.map((f, idx) => (
//                   <li key={idx}>{f.name} ({f.email})</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GroupTab;


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase'; // Update path based on your project
// import './GroupTab.css';

// const API_BASE = 'http://localhost:5000';

// const GroupTab = () => {
//   const [currentUser, setCurrentUser] = useState({ email: '', _id: '', name: '' });
//   const [activeTab, setActiveTab] = useState('notifications');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [friendRequestSent, setFriendRequestSent] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [friends, setFriends] = useState([]);

//   // ✅ Get currently logged in user from Firebase and fetch full user data from backend
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user && user.email) {
//         try {
//           const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(user.email)}`);
//           setCurrentUser(res.data); // Expected fields: _id, email, name
//         } catch (err) {
//           console.error('Error fetching user from backend:', err);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // ✅ Fetch Data Hooks
//   const fetchNotifications = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications`);
//       setNotifications(res.data || []);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//     }
//   }, [currentUser.email]);

//   // const fetchGroups = useCallback(async () => {
//   //   try {
//   //     const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups`);
//   //     setGroups(res.data || []);
//   //   } catch (err) {
//   //     console.error('Error fetching groups:', err);
//   //   }
//   // }, [currentUser.email]);
//   const fetchGroups = useCallback(async () => {
//   try {
//     const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups`);
//     // Only show groups where user status is "accepted"
//     const acceptedGroups = res.data.filter(group => group.status === 'accepted');
//     setGroups(acceptedGroups);
//   } catch (err) {
//     console.error('Error fetching groups:', err);
//   }
// }, [currentUser.email]);

//   const fetchFriends = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/friends`);
//       setFriends(res.data || []);
//     } catch (err) {
//       console.error('Error fetching friends:', err);
//     }
//   }, [currentUser.email]);

//   // ✅ Fetch all when user is loaded
//   console.log(currentUser.email);
//   useEffect(() => {
//     if (!currentUser.email) return;
//     fetchNotifications();
//     fetchGroups();
//     fetchFriends();
//   }, [currentUser.email, fetchNotifications, fetchGroups, fetchFriends]);

//   // ✅ Send Friend Request
//   const handleSearch = async () => {
//     if (!searchTerm) return;
//     try {
//       await axios.post(`${API_BASE}/api/users/friend-request`, {
//         fromEmail: currentUser.email,
//         toEmail: searchTerm,
//       });
//       setFriendRequestSent(true);
//       setTimeout(() => setFriendRequestSent(false), 2000);
//       setSearchTerm('');
//     } catch (err) {
//       console.error('Failed to send friend request:', err);
//     }
//   };

//   // ✅ Respond to Notification
//   const respondToNotification = async (notificationId, action) => {
//     try {
//       await axios.post(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications/${notificationId}/respond`, {
//         action
//       });
//       fetchNotifications();
//       fetchFriends();
//       fetchGroups();
//     } catch (err) {
//       console.error('Failed to respond to notification:', err);
//     }
//   };
//   const handlePayment = async (groupId) => {
//   try {
//     // Optionally show a loader / modal
//     await axios.post(`${API_BASE}/api/groups/${groupId}/pay`, {
//       userEmail: currentUser.email,
//     });

//     // After successful payment, refresh groups
//     fetchGroups();
//   } catch (err) {
//     console.error('Payment failed:', err);
//     alert('Payment failed. Please try again.');
//   }
// };


//   // ✅ Render Component
//   return (
//     <div className="group-tab-container">
//       <h2>Group Dashboard</h2>

//       <div className="group-tabs">
//         <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>Notifications</button>
//         <button onClick={() => setActiveTab('my-groups')} className={activeTab === 'my-groups' ? 'active' : ''}>My Groups</button>
//         <button onClick={() => setActiveTab('my-friends')} className={activeTab === 'my-friends' ? 'active' : ''}>My Friends</button>
//       </div>

//       <div className="group-search">
//         <input
//           type="text"
//           placeholder="Search by email to send friend request"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>Send Request</button>
//       </div>
//       {friendRequestSent && <p className="success-msg">✅ Friend request sent!</p>}

//       <div className="group-tab-content">
//         {activeTab === 'notifications' && (
//           <div>
//             {notifications.length === 0 ? (
//               <p>You have no new notifications.</p>
//             ) : (
//               <ul className="notification-list">
//                 {notifications
//   .filter((n) => n.status === 'pending')
//   .map((n, idx) => (
//     <li key={idx} className="notification-item">
//       <p>{n.message}</p>
//       {(n.type === 'group-invite' || n.type === 'friend-request') && (
//         <div className="notification-actions">
//           <button onClick={() => respondToNotification(n._id, 'accepted')}>Accept</button>
//           <button onClick={() => respondToNotification(n._id, 'declined')}>Decline</button>
//         </div>
//       )}
//     </li>
// ))}

//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === 'my-groups' && (
//           <div>
//             {groups.length === 0 ? (
//               <p>You are not part of any groups yet.</p>
//             ) : (
//               <ul>
//                 {groups.map((g, idx) => (
//   <li key={idx} className="group-item">
//     <p><strong>{g.name}</strong></p>

//     {g.requiresPayment && g.paymentStatus !== 'paid' ? (
//       <button onClick={() => handlePayment(g._id)}>Pay Now</button>
//     ) : g.paymentStatus === 'paid' ? (
//       <p className="paid-label">✅ Payment Completed</p>
//     ) : (
//       <p>No payment required</p>
//     )}
//   </li>
// ))}

//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === 'my-friends' && (
//           <div>
//             {friends.length === 0 ? (
//               <p>No friends added yet.</p>
//             ) : (
//               <ul>
//                 {friends.map((f, idx) => (
//                   <li key={idx}>{f.name} ({f.email})</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GroupTab;


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

  // 🔐 Auth: Get logged-in user from Firebase & backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(user.email)}`);
          setCurrentUser(res.data); // expects { _id, email, name }
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔄 Fetch: Notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications`);
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, [currentUser.email]);

  // 🔄 Fetch: Groups (filter accepted)
  const fetchGroups = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups`);
      const acceptedGroups = res.data
  .map(group => {
    const member = group.members.find(m => m.userId === currentUser._id);
    if (!member || (member.status !== 'accepted' &&  member.status!=='invited')) return null;

    return {
      ...group,
      paymentStatus: member.hasPaid ? 'true' : 'false',
      status: member.status
    };
  })
  .filter(Boolean);

      setGroups(acceptedGroups);
    } catch (err) {
      console.error('Error fetching groups:', err);
    }
  }, [currentUser.email]);

  // 🔄 Fetch: Friends
  const fetchFriends = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/friends`);
      setFriends(res.data || []);
    } catch (err) {
      console.error('Error fetching friends:', err);
    }
  }, [currentUser.email]);

  // ⛓️ Trigger all fetches once user is ready
  useEffect(() => {
    if (currentUser.email) {
      fetchNotifications();
      fetchGroups();
      fetchFriends();
    }
  }, [currentUser.email, fetchNotifications, fetchGroups, fetchFriends]);

  // ➕ Friend Request
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

  // 🔔 Respond to Notification
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
    fetchGroups(); // Refresh group list
  } catch (err) {
    console.error('Payment failed:', err);
    alert('Payment failed. Please try again.');
  }
}, [currentUser.email, fetchGroups]);



  return (
    <div className="group-tab-container">
      <h2>Group Dashboard</h2>

      {/* 🗂️ Tabs */}
      <div className="group-tabs">
        <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>Notifications</button>
        <button onClick={() => setActiveTab('my-groups')} className={activeTab === 'my-groups' ? 'active' : ''}>My Groups</button>
        <button onClick={() => setActiveTab('my-friends')} className={activeTab === 'my-friends' ? 'active' : ''}>My Friends</button>
      </div>

      {/* 🔍 Friend Search */}
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

      {/* 📄 Tab Content */}
      <div className="group-tab-content">
        {activeTab === 'notifications' && (
          <div>
            {notifications.length === 0 ? (
              <p>You have no new notifications.</p>
            ) : (
              <ul className="notification-list">
                {notifications
                  .filter(n => n.status === 'pending')
                  .map((n, idx) => (
                    <li key={idx} className="notification-item">
                      <p>{n.message}</p>
                      {(n.type === 'group-invite' || n.type === 'friend-request') && (
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
         console.log(currentUser._id);
          return (
            <li key={idx} className="group-item">
              <p><strong>{g.name}</strong></p>

              {/* Show Pay Now if group requires payment and user is a member (even if invited) */}
              {g.requiresPayment && member ? (
                member.hasPaid ? (
                  <p className="paid-label">✅ Payment Completed</p>
                ) : (
                  <button onClick={() => handlePayment(g._id)}>Pay Now</button>

                )
              ) : (
                <p>No payment required</p>
              )}
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
