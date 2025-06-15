import React, { useState, useRef, useEffect } from 'react';
import { auth, provider } from './firebase';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';

export default function LoginModal({ onClose, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const recaptchaRef = useRef(null);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => console.log('reCAPTCHA solved'),
      });
    }
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        onClose();
      })
      .catch((err) => alert(err.message));
  };

  const handleEmailAuth = () => {
    const authFn = isRegister ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
    authFn(auth, email, password)
      .then((result) => {
        setUser(result.user);
        onClose();
      })
      .catch((err) => alert(err.message));
  };

  const handleSendOtp = () => {
    if (!phone.startsWith('+')) return alert('Phone must include country code (e.g., +91)');
    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        alert('OTP sent to phone');
      })
      .catch((err) => alert(err.message));
  };

  const handleVerifyOtp = () => {
    confirmationResult
      .confirm(otp)
      .then((result) => {
        setUser(result.user);
        onClose();
      })
      .catch((err) => alert('Invalid OTP'));
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{isRegister ? 'Register' : 'Sign In'}</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailAuth}>
          {isRegister ? 'Create Account' : 'Login'}
        </button>

        <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer', marginTop: '1rem' }}>
          {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
        </p>

        <hr style={{ margin: '1rem 0' }} />
        <button onClick={signInWithGoogle}>Sign in with Google</button>

        <hr style={{ margin: '1rem 0' }} />
        <h3>Phone Sign In</h3>
        <input
          style={styles.input}
          type="tel"
          placeholder="Phone (+91...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {confirmationResult ? (
          <>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        ) : (
          <button onClick={handleSendOtp}>Send OTP</button>
        )}

        <div id="recaptcha-container" ref={recaptchaRef}></div>
        <button onClick={onClose} style={styles.close}>X</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 2000
  },
  modal: {
    backgroundColor: '#fff', padding: '2rem', borderRadius: '10px',
    position: 'relative', width: '300px', textAlign: 'center'
  },
  input: {
    width: '100%', padding: '0.5rem', marginBottom: '1rem'
  },
  close: {
    position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'
  }
};
