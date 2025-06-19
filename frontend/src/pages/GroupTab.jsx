// import React, { useState } from 'react';
// import './GroupTab.css';

// const GroupTab = () => {
//   const [searchInput, setSearchInput] = useState('');
//   const [friends, setFriends] = useState(['john@example.com', 'ravi@gmail.com']);
//   const [groups, setGroups] = useState(['Trip to Goa', 'BBQ Dinner']);
//   const [notifications, setNotifications] = useState([
//     'Ravi added you to BBQ Dinner',
//     'Payment request from John: ₹300',
//   ]);

//   const handleSendRequest = () => {
//     if (searchInput) {
//       alert(`Friend request sent to ${searchInput}`);
//       setSearchInput('');
//     }
//   };

//   return (
//     <div className="group-tab">
//       <h2>Groups & Friends</h2>

//       {/* Search to add friends */}
//       <div className="search-friends">
//         <input
//           type="text"
//           placeholder="Enter email or phone number"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//         />
//         <button onClick={handleSendRequest}>Send Friend Request</button>
//       </div>

//       {/* Sections */}
//       <div className="group-sections">

//         {/* Notifications */}
//         <div className="group-card">
//           <h3>🔔 Notifications</h3>
//           {notifications.length === 0 ? (
//             <p>No notifications</p>
//           ) : (
//             <ul>
//               {notifications.map((note, i) => (
//                 <li key={i}>{note}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* My Groups */}
//         <div className="group-card">
//           <h3>👥 My Groups</h3>
//           {groups.length === 0 ? (
//             <p>You are not in any group</p>
//           ) : (
//             <ul>
//               {groups.map((grp, i) => (
//                 <li key={i}>{grp}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* My Friend List */}
//         <div className="group-card">
//           <h3>🧑‍🤝‍🧑 My Friend List</h3>
//           {friends.length === 0 ? (
//             <p>No friends yet</p>
//           ) : (
//             <ul>
//               {friends.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default GroupTab;

import React, { useState } from 'react';
import './GroupTab.css';

const GroupTab = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  const handleSearch = () => {
    if (searchTerm) {
      setFriendRequestSent(true);
      setTimeout(() => setFriendRequestSent(false), 2000);
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
          placeholder="Search by phone or email to send friend request"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Send Request</button>
      </div>
      {friendRequestSent && <p className="success-msg">✅ Friend request sent!</p>}

      <div className="group-tab-content">
        {activeTab === 'notifications' && (
          <div>
            <p>You have no new notifications.</p>
          </div>
        )}
        {activeTab === 'my-groups' && (
          <div>
            <p>You are not part of any groups yet.</p>
          </div>
        )}
        {activeTab === 'my-friends' && (
          <div>
            <p>No friends added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupTab;
