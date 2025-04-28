import { useState, useEffect } from 'react';
import { 
    TrendingUp, TrendingDown, BarChart2, ArrowRight, ArrowLeft,
    Briefcase, PieChart, ChevronUp, ChevronDown, AlertCircle,
    Clock, Calendar, Zap, RefreshCw
  } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import yahooFinanceService from '../utils/yahooFinanceService';
import { useData } from '../context/DataContext';

export default function Dashboard() {
  // Get preloaded data from context
  const { 
    marketOverview: contextMarketOverview, 
    watchlistPerformance: contextWatchlistPerformance,
    performanceData: contextPerformanceData,
    dailyData: contextDailyData,
    weeklyData: contextWeeklyData,
    isLoading: contextIsLoading,
    refreshAllData
  } = useData();

  // State for chart data - initialized with context data
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartData, setChartData] = useState(contextDailyData.length > 0 ? contextDailyData : []);
  const [xAxisKey, setXAxisKey] = useState('time');
  
  // Use the preloaded data from context
  const [marketOverview, setMarketOverview] = useState(contextMarketOverview);
  const [watchlistPerformance, setWatchlistPerformance] = useState(contextWatchlistPerformance);
  const [performanceData, setPerformanceData] = useState(contextPerformanceData);
  const [dailyData, setDailyData] = useState(contextDailyData);
  const [weeklyData, setWeeklyData] = useState(contextWeeklyData);
  const [isLoading, setIsLoading] = useState(contextIsLoading);

  // Update local state when context data changes
  useEffect(() => {
    if (contextMarketOverview) setMarketOverview(contextMarketOverview);
    if (contextWatchlistPerformance.length > 0) setWatchlistPerformance(contextWatchlistPerformance);
    if (contextPerformanceData.length > 0) setPerformanceData(contextPerformanceData);
    if (contextDailyData.length > 0) setDailyData(contextDailyData);
    if (contextWeeklyData.length > 0) setWeeklyData(contextWeeklyData);
    setIsLoading(contextIsLoading);
  }, [
    contextMarketOverview, 
    contextWatchlistPerformance, 
    contextPerformanceData, 
    contextDailyData, 
    contextWeeklyData, 
    contextIsLoading
  ]);

  // Effect to update chart data based on selected timeframe
  useEffect(() => {
    switch(selectedTimeframe) {
      case '1D':
        setChartData(dailyData);
        setXAxisKey('time');
        break;
      case '1W':
        setChartData(weeklyData);
        setXAxisKey('day');
        break;
      case '1M':
        setChartData(performanceData.slice(-6));
        setXAxisKey('name');
        break;
      case '1Y':
        setChartData(performanceData);
        setXAxisKey('name');
        break;
      default:
        setChartData(dailyData);
        setXAxisKey('time');
    }
  }, [selectedTimeframe, dailyData, weeklyData, performanceData]);

  // Market overview and watchlist data are already defined above

  const [newsItems, setNewsItems] = useState([
    {
      title: 'Federal Reserve Maintains Interest Rates',
      description: 'The Federal Reserve announced today that interest rates will remain unchanged following their latest meeting, citing stable inflation metrics and continued economic growth.',
      time: '2 hours ago',
      source: 'Financial Times',
      important: true
    },
    {
      title: 'Tech Sector Sees Strong Q1 Earnings',
      description: 'Major technology companies reported better than expected earnings for Q1 2025, with cloud services and AI implementations driving significant revenue growth across the sector.',
      time: '4 hours ago',
      source: 'Market Watch',
      important: false
    },
    {
      title: 'Oil Prices Stabilize After OPEC Meeting',
      description: 'Crude oil prices have stabilized following the recent OPEC+ meeting where production quotas were maintained, providing a sense of certainty to the global energy markets.',
      time: '6 hours ago',
      source: 'Bloomberg',
      important: false
    }
  ]);

  // Calculate total watchlist performance
  const totalWatchlistChange = watchlistPerformance.reduce((acc, stock) => {
    return stock.isUp ? acc + stock.change : acc - stock.change;
  }, 0) / watchlistPerformance.length;

  const isWatchlistPositive = totalWatchlistChange > 0;

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Check if market is open (simplified - actual implementation would be more complex)
  const isMarketOpen = () => {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const day = currentDate.getDay();
    
    // Market is open Monday-Friday, 9:30 AM - 4:00 PM Eastern Time
    // This is a simplified check - would need timezone adjustments for accuracy
    return day >= 1 && day <= 5 && 
           ((hours === 9 && minutes >= 30) || (hours > 9 && hours < 16));
  };

  return (
    <main className="flex-grow py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good {currentDate.getHours() < 12 ? 'morning' : currentDate.getHours() < 18 ? 'afternoon' : 'evening'}, Investor</h1>
            <p className="text-gray-600">{formattedDate} • Market is {isMarketOpen() ? 'open' : 'closed'}</p>
          </div>
          <div className="flex space-x-3">
            <button 
                onClick={() => window.location.href = '/'} 
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center shadow-sm hover:bg-gray-50"
                >
             <ArrowLeft className="h-4 w-4 mr-2 text-gray-500" />
                Back
            </button>
            <button 
                onClick={() => refreshAllData()}
                disabled={isLoading}
                className={`px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center shadow-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
                <RefreshCw className={`h-4 w-4 mr-2 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-sm font-medium text-white flex items-center shadow-sm hover:from-purple-700 hover:to-indigo-700">
                <Zap className="h-4 w-4 mr-2" />
                Quick Trade
            </button>
          </div>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Loading market data...</span>
          </div>
        )}
        
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(marketOverview).map(([key, data]) => (
            <div key={key} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-500 uppercase text-sm font-medium">
                  {key === 'dow' ? 'Dow Jones' : 
                   key === 'sp500' ? 'S&P 500' : 
                   key === 'nasdaq' ? 'NASDAQ' : 'Bitcoin'}
                </span>
                {data.isUp ? 
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">{data.change}%</span>
                  </div> : 
                  <div className="flex items-center text-red-500">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">{data.change}%</span>
                  </div>
                }
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {key === 'bitcoin' ? '$' + data.value.toLocaleString() : data.value.toLocaleString()}
                </span>
                <span className={`ml-2 text-sm font-medium ${data.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {data.isUp ? '+' : ''}{data.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Portfolio & Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Performance Chart Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">Portfolio Performance</h2>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold text-gray-900">$145,200.43</span>
                    <span className="ml-2 text-sm font-medium text-green-500">+$2,632.11 (1.8%) today</span>
                  </div>
                </div>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {['1D', '1W', '1M', '1Y'].map((timeframe) => (
                    <button 
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                        selectedTimeframe === timeframe 
                          ? 'bg-white text-purple-700 shadow-sm' 
                          : 'text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey={xAxisKey} 
                      tick={{fontSize: 12, fill: '#6b7280'}} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={['dataMin - 2000', 'dataMax + 2000']} 
                      tick={{fontSize: 12, fill: '#6b7280'}}
                      tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                      labelFormatter={(label) => `${selectedTimeframe === '1D' ? 'Time' : 'Date'}: ${label}`}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      fill="url(#colorValue)" 
                      activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Watchlist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">Your Watchlist</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Average performance: 
                    <span className={`font-medium ml-1 ${isWatchlistPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {isWatchlistPositive ? '+' : ''}{totalWatchlistChange.toFixed(1)}%
                    </span>
                  </p>
                </div>
                <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              <div className="divide-y divide-gray-100">
                {watchlistPerformance.map((stock) => (
                  <div key={stock.name} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        stock.logo === 'A' ? 'bg-amber-100 text-amber-700' :
                        stock.logo === 'M' ? 'bg-indigo-100 text-indigo-700' :
                        stock.logo === 'G' ? 'bg-green-100 text-green-700' :
                        stock.logo === 'T' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {stock.logo}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{stock.name}</p>
                        <p className="text-xs text-gray-500">
                          {stock.name === 'AAPL' ? 'Apple Inc.' :
                           stock.name === 'MSFT' ? 'Microsoft Corp.' :
                           stock.name === 'GOOGL' ? 'Alphabet Inc.' :
                           stock.name === 'AMZN' ? 'Amazon.com Inc.' : 'Tesla Inc.'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${stock.price}</p>
                      <p className={`text-sm flex items-center justify-end ${stock.isUp ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.isUp ? 
                          <ChevronUp className="h-3 w-3 mr-1" /> : 
                          <ChevronDown className="h-3 w-3 mr-1" />
                        }
                        {stock.isUp ? '+' : ''}{stock.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                <button className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center">
                  Add to Watchlist <span className="ml-2 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">+</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-gray-900">Portfolio Summary</h2>
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Value</span>
                  <span className="font-semibold text-gray-900">$142,568.32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Day Change</span>
                  <span className="font-semibold text-green-500">+$1,245.78 (0.88%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Return</span>
                  <span className="font-semibold text-green-500">+$23,492.41 (19.7%)</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Asset Allocation</span>
                  <PieChart className="h-4 w-4 text-gray-400" />
                </div>
                <div className="relative h-4 w-full rounded-full overflow-hidden bg-gray-100 mb-3">
                  <div className="absolute h-full bg-purple-500" style={{ width: '45%' }}></div>
                  <div className="absolute h-full bg-blue-500" style={{ width: '20%', left: '45%' }}></div>
                  <div className="absolute h-full bg-green-500" style={{ width: '15%', left: '65%' }}></div>
                  <div className="absolute h-full bg-amber-500" style={{ width: '20%', left: '80%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-purple-500 rounded-full mr-1"></div>
                    <span className="text-gray-600">Technology (45%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full mr-1"></div>
                    <span className="text-gray-600">Healthcare (20%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-gray-600">Finance (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-amber-500 rounded-full mr-1"></div>
                    <span className="text-gray-600">Other (20%)</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <button className="w-full py-2 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  View Detailed Analysis
                </button>
              </div>
            </div>
            
            {/* Market News */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gray-900">Market News</h2>
                <button className="text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-md hover:bg-gray-200">Filter</button>
              </div>
              <div className="divide-y divide-gray-100">
                {newsItems.map((news, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      {news.important && (
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mr-2">
                          <AlertCircle className="h-3 w-3" />
                        </span>
                      )}
                      <h3 className="font-medium text-gray-900">{news.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm my-2 line-clamp-2">{news.description}</p>
                    <div className="flex justify-between text-xs text-gray-400 items-center">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{news.time}</span>
                      </div>
                      <span className="font-medium">{news.source}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium">View All News</a>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-lg text-gray-900 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-1">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-gray-700 text-center">Buy Stock</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-1">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-gray-700 text-center">Sell Stock</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-1">
                    <BarChart2 className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-gray-700 text-center">Screener</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}