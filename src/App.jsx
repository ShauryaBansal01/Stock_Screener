import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Dashboard from './pages/Dashboard';
import Screener from './pages/Screener';
import WatchList from './pages/Watchlist'; 
import Login from './components/Auth/Login';
import GlobalStockNewsApp from './pages/alert';
import Signup from './components/Auth/Signup';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/screener" element={<Screener/>} />
          <Route path="/watchlist" element={<WatchList/>} />
          <Route path="/alert" element={<GlobalStockNewsApp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;