// client/src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDZGUwJDuXHotsaGLDUjDat0H5xdZKLAJE",
    authDomain: "hackon-ce7c6.firebaseapp.com",
    projectId: "hackon-ce7c6",
    storageBucket: "hackon-ce7c6.firebasestorage.app",
    messagingSenderId: "303732289149",
    appId: "1:303732289149:web:eb2db300aae35e17ba0b14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };