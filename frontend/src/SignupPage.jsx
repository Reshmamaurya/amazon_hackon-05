// SignupPage.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // You'll create this for styling

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== rePassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Signup failed. Please try again.');
          break;
      }
    }
  };

  return (
    <div className="signup-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="amazon-logo" />
      <div className="signup-box">
        <h2>Create account</h2>
        <form onSubmit={handleSignup}>
          <label>Your name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Mobile number or email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="At least 6 characters" />

          <label>Re-enter password</label>
          <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />

          <button type="submit" className="create-btn">Continue</button>
        </form>

        {error && <p className="error-msg">{error}</p>}

        <p className="terms">
          By creating an account, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
        </p>

        <hr />

        <p className="existing-account">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
