
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stocklens-59dbf.firebaseapp.com",
  projectId: "stocklens-59dbf",
  storageBucket: "stocklens-59dbf.firebasestorage.app",
  messagingSenderId: "1058194121954",
  appId: "1:1058194121954:web:fb5401a281c4a407daeabb"
};
    
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup };