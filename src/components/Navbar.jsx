import { useState } from 'react';
import { Search, TrendingUp, BarChart2, BookOpen, Bell, Settings, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', active: true, icon: <TrendingUp className="h-4 w-4 mr-1" /> },
    { name: 'Screener', href: '/screener', active: false, icon: <BarChart2 className="h-4 w-4 mr-1" /> },
    { name: 'Watchlists', href: '/watchlist', active: false, icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { name: 'Alerts', href: '/alert', active: false, icon: <Bell className="h-4 w-4 mr-1" /> },
    { name: 'Research', href: '#', active: false, icon: <Search className="h-4 w-4 mr-1" /> },
  ];

  return (
    <div className="relative z-20 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center flex-shrink-0">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md flex items-center justify-center mr-2">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">StockLens</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href !== '#' ? item.href : '#'} 
                className={`flex items-center text-gray-700 hover:text-purple-700 relative px-3 py-5 font-medium transition-colors duration-200 group ${
                  item.active ? 'text-purple-700' : ''
                }`}
              >
                {item.icon}
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-purple-600 transition-transform duration-200 origin-left ${
                  item.active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </div>
          
          {/* Right-side items */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-64"
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <button className="text-gray-500 hover:text-purple-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <Link to="/login" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow flex items-center">
              <User className="h-4 w-4 mr-1" />
              Sign In
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href !== '#' ? item.href : '#'}
                className={`block py-3 px-4 rounded-md flex items-center ${
                  item.active ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile search */}
            <div className="relative mt-3 px-4">
              <input
                type="text"
                placeholder="Search stocks..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full"
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-7 top-1/2 transform -translate-y-1/2" />
            </div>
            
            {/* Mobile settings and login */}
            <div className="mt-4 flex flex-col space-y-2 px-4">
              <button className="flex items-center text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50">
                <Settings className="h-5 w-5 mr-2" />
                <span>Settings</span>
              </button>
              
              <Link to="/login" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow flex items-center justify-center">
                <User className="h-4 w-4 mr-2" />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}