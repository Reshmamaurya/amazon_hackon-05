import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Create this CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('This email ID is not registered. Please sign up first.');
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Incorrect email or password.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('Login failed. Please try again.');
          break;
      }
    }
  };
  
  const handleGoogleSignIn = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        }),
      });
  
      navigate('/');
    } catch (err) {
      setError('Google Sign-In failed: ' + err.message);
    }
  };
  

  return (
    <div className="login-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="amazon-logo" />
      <div className="login-box">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email or mobile phone number</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">Sign-In</button>
        </form>

        <p className="or">or</p>
        <button onClick={handleGoogleSignIn} className="google-btn">Sign in with Google</button>

        {error && <p className="error-msg">{error}</p>}

        <p className="new-account">
          New to Amazon? <a href="/signup">Create your Amazon account</a>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
