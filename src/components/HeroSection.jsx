import { useState, useEffect } from 'react';
import { TrendingUp, Shield, PieChart, ArrowRight, User, Filter, LineChart, Search } from 'lucide-react';
import { Footer } from './FooterSection'; 
import Navbar from './Navbar';
import { useData } from '../context/DataContext';

// Your existing HeroSection component
function HeroSection() {
  const [email, setEmail] = useState('');
  
  // Access the data context to trigger preloading
  const { refreshAllData } = useData();
  
  // Trigger data preloading when the hero section loads
  useEffect(() => {
    // This will silently preload all the data in the background
    // so it's ready when the user navigates to the dashboard
    refreshAllData();
  }, []);

  const features = [
    { icon: <TrendingUp className="h-6 w-6" />, title: "Advanced Screening", description: "Filter through thousands of stocks with customizable parameters" },
    { icon: <Shield className="h-6 w-6" />, title: "Real-Time Alerts", description: "Instant notifications for price movements and trading signals" },
    { icon: <PieChart className="h-6 w-6" />, title: "Portfolio Analysis", description: "AI-powered tools to optimize your investment strategy" }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-purple-600">Professional Stock Screening</h2>
              <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block text-gray-900">Discover winning</span>
                <span className="block bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">stock opportunities</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-lg">
                StockScreen helps you find the best investment opportunities with powerful screening tools, technical analysis, and market insights.
              </p>
            </div>

            <div className="max-w-md">
              <form className="mt-3 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition duration-300 flex items-center justify-center"
                >
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
              <p className="mt-3 text-sm text-gray-500">Free 14-day trial. No credit card required.</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {/* Using Lucide User icons instead of placeholder images */}
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center border-2 border-white">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white">
                    <User className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center border-2 border-white">
                    <User className="h-4 w-4 text-violet-600" />
                  </div>
                </div>
                <p className="ml-3 text-sm text-gray-700">Join <span className="font-medium">20,000+</span> traders</p>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-700">4.8/5 rating</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl transform -rotate-6 opacity-70"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Top Performers Today</h3>
                <span className="text-green-500 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> Market Up
                </span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">T</div>
                    <div>
                      <p className="font-medium">TSLA</p>
                      <p className="text-sm text-gray-500">Tesla Inc.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$892.45</p>
                    <p className="text-sm text-green-500">+4.8%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mr-3">A</div>
                    <div>
                      <p className="font-medium">AAPL</p>
                      <p className="text-sm text-gray-500">Apple Inc.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$175.28</p>
                    <p className="text-sm text-green-500">+2.3%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">M</div>
                    <div>
                      <p className="font-medium">MSFT</p>
                      <p className="text-sm text-gray-500">Microsoft Corp.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$327.64</p>
                    <p className="text-sm text-green-500">+3.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Powerful stock screening tools</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            StockScreen combines advanced analytics with an intuitive interface to help you make data-driven investment decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Here's the ScreenerInfo component that explains what a stock screener is
function ScreenerInfo() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What is a Stock Screener?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            A powerful tool that helps investors filter through thousands of stocks to find the best opportunities matching specific criteria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
              <Filter className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Custom Filters</h3>
            <p className="text-gray-600">
              Create personalized screening criteria based on fundamentals, technicals, and market performance to match your investment strategy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Technical Analysis</h3>
            <p className="text-gray-600">
              Identify patterns, trends, and key support/resistance levels with advanced charting and technical indicators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Market Discovery</h3>
            <p className="text-gray-600">
              Discover hidden gems and emerging opportunities before they become mainstream using our proprietary algorithms.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How Our Screener Works</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mt-1 mr-3">
                    1
                  </div>
                  <p className="text-gray-600"><span className="font-medium text-gray-900">Define your criteria</span> - Select from over 150+ financial metrics and indicators</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mt-1 mr-3">
                    2
                  </div>
                  <p className="text-gray-600"><span className="font-medium text-gray-900">Run your screen</span> - Our engine analyzes thousands of stocks in real-time</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mt-1 mr-3">
                    3
                  </div>
                  <p className="text-gray-600"><span className="font-medium text-gray-900">Review results</span> - Examine matches with detailed reports and charts</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mt-1 mr-3">
                    4
                  </div>
                  <p className="text-gray-600"><span className="font-medium text-gray-900">Take action</span> - Save your screens, set alerts, or export data</p>
                </li>
              </ul>
              <button className="mt-6 inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition duration-300">
                Try Our Screener <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl transform rotate-3 opacity-70"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Filter Category</span>
                    <span className="font-medium text-gray-700">Value</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Market Cap</span>
                    <span className="text-gray-900">$1B - $10B</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">P/E Ratio</span>
                    <span className="text-gray-900">&lt; 20</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Dividend Yield</span>
                    <span className="text-gray-900">&gt; 2%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">52-Week High</span>
                    <span className="text-gray-900">Within 10%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Average Volume</span>
                    <span className="text-gray-900">&gt; 500K</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">RSI</span>
                    <span className="text-gray-900">30 - 70</span>
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
                    <p className="text-purple-700 font-medium">8 stocks match your criteria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main App Component that combines everything
export default function StockScreenerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ScreenerInfo />
      </main>
      <Footer />
    </div>
  );
}