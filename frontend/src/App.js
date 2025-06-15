import React, { useEffect, useState } from 'react';
import { auth } from './firebase';         // ✅ Your custom auth instance
import { signOut } from 'firebase/auth';   // ✅ Firebase function
import LoginModal from './LoginModal';

function App() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/ping')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error('Backend error:', err));
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      setShowModal(true);
    } else {
      if (window.confirm('Sign out?')) {
        signOut(auth).then(() => setUser(null));
      }
    }
  };

  return (
    <div className="App">
      <nav style={styles.nav}>
        <div style={styles.spacer}></div>
        <button style={styles.profileBtn} onClick={handleProfileClick}>
          {user ? user.displayName || 'Profile' : 'Profile'}
        </button>
      </nav>

      {showModal && <LoginModal onClose={() => setShowModal(false)} setUser={setUser} />}

      <div style={styles.content}>
        <h1>Welcome to Home Page</h1>
        {user && <p>Logged in as <strong>{user.displayName || user.email || user.phoneNumber}</strong></p>}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem',
    backgroundColor: '#f5f5f5'
  },
  spacer: {
    flex: 1
  },
  profileBtn: {
    padding: '0.5rem 1rem',
    cursor: 'pointer'
  },
  content: {
    padding: '2rem',
    textAlign: 'center'
  }
};

export default App;
