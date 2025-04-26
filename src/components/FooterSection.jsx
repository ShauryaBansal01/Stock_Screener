import { Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

// Footer Component
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">StockScreen</h2>
              <p className="mt-3 text-gray-400 max-w-md">
                Professional stock screening tools to help investors make data-driven decisions and discover winning opportunities.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Subscribe to our newsletter</h3>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full max-w-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition duration-300">
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">API Access</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 StockScreen. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}