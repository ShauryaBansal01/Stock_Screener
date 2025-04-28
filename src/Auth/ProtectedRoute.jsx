import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Component to protect routes that require authentication
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components
  return children;
}