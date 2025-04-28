import { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from './Firebase';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  // Set up an observer on the Auth object
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the observer when the component unmounts
    return unsubscribe;
  }, []);

  // Value object that will be passed to components using this context
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}