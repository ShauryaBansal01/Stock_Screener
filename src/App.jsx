import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Dashboard from './pages/Dashboard';
import Screener from './pages/Screener';
import WatchList from './pages/Watchlist'; 
import Login from './components/Auth/Login';
import GlobalStockNewsApp from './pages/alert';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import { AuthProvider } from './Auth/AuthContext';
import ProtectedRoute from './Auth/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/screener" 
              element={
                <ProtectedRoute>
                  <Screener />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/watchlist" 
              element={
                <ProtectedRoute>
                  <WatchList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/alert" 
              element={
                <ProtectedRoute>
                  <GlobalStockNewsApp />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;