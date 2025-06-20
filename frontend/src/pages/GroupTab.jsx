// import React, { useState } from 'react';
// import './GroupTab.css';

// const GroupTab = () => {
//   const [activeTab, setActiveTab] = useState('notifications');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [friendRequestSent, setFriendRequestSent] = useState(false);

//   const handleSearch = () => {
//     if (searchTerm) {
//       setFriendRequestSent(true);
//       setTimeout(() => setFriendRequestSent(false), 2000);
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
//           placeholder="Search by phone or email to send friend request"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>Send Request</button>
//       </div>
//       {friendRequestSent && <p className="success-msg">✅ Friend request sent!</p>}

//       <div className="group-tab-content">
//         {activeTab === 'notifications' && (
//           <div>
//             <p>You have no new notifications.</p>
//           </div>
//         )}
//         {activeTab === 'my-groups' && (
//           <div>
//             <p>You are not part of any groups yet.</p>
//           </div>
//         )}
//         {activeTab === 'my-friends' && (
//           <div>
//             <p>No friends added yet.</p>
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

//   const fetchGroups = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/groups/user/${encodeURIComponent(currentUser.email)}`);
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

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './GroupTab.css';

const API_BASE = 'http://localhost:5000';

const GroupTab = () => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentUser = storedUser || { email: '' };

  const [activeTab, setActiveTab] = useState('notifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/notifications`);
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, [currentUser.email]);

 const fetchGroups = useCallback(async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/groups`);
    setGroups(res.data || []);
  } catch (err) {
    console.error('Error fetching groups:', err);
  }
}, [currentUser.email]);


  const fetchFriends = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${encodeURIComponent(currentUser.email)}/friends`);
      console.log("Friends fetched:", res.data);
      setFriends(res.data || []);
    } catch (err) {
      console.error('Error fetching friends:', err);
    }
  }, [currentUser.email]);

  useEffect(() => {
    if (!currentUser.email) return;
    fetchNotifications();
    fetchGroups();
    fetchFriends();
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

  return (
    <div className="group-tab-container">
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
              <ul>
                {notifications.map((n, idx) => (
                  <li key={idx}>{n.message}</li>
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
              <ul>
                {groups.map((g, idx) => (
                  <li key={idx}>{g.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'my-friends' && (
          <div>
            {friends.length === 0 ? (
              <p>No friends added yet.</p>
            ) : (
              <ul>
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
