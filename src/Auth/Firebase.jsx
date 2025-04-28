
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";

// IMPORTANT: Replace this with the configuration from your Firebase console
// after creating a new project and registering a web app
const firebaseConfig = {
  apiKey: "AIzaSyDuSjQPRFsA7mkM3LMztqXGS4_drpOMBCw",
  authDomain: "stocklens-a336d.firebaseapp.com",
  projectId: "stocklens-a336d",
  storageBucket: "stocklens-a336d.firebasestorage.app",
  messagingSenderId: "381083480031",
  appId: "1:381083480031:web:9462bde9931193ff159e6a",
  measurementId: "G-M6LQYTFXY8"
};

// Log the Firebase configuration for debugging
console.log('Firebase Config:', firebaseConfig);

let app, db, auth, googleProvider, githubProvider;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
  
  // Initialize Firestore and Auth
  db = getFirestore(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  githubProvider = new GithubAuthProvider();
  
  // Log success
  console.log('Firebase services initialized successfully');
} catch (error) {
  // Log any initialization errors
  console.error('Firebase initialization error:', error);
  throw error;
}

// Helper function to get current user
const getCurrentUser = () => {
  return auth.currentUser;
};

// Helper function to check if user is logged in
const isUserLoggedIn = () => {
  return !!auth.currentUser;
};

export { 
  db, 
  auth, 
  googleProvider,
  githubProvider,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  getCurrentUser,
  isUserLoggedIn,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  GithubAuthProvider
};