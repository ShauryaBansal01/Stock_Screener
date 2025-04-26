import { useState } from 'react';
import { Filter, ArrowDownAZ, ArrowUpAZ, BarChart2, TrendingUp, TrendingDown, ArrowLeft, Search, Sliders, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Screener() {
  const navigate = useNavigate();
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 1000],
    marketCap: 'all',
    sector: 'all',
    performance: 'all'
  });
  
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 187.32, change: 1.24, marketCap: 2.95, sector: 'Technology', volume: 62.4 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 402.56, change: -0.76, marketCap: 3.2, sector: 'Technology', volume: 28.7 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 174.25, change: 2.31, marketCap: 1.8, sector: 'Consumer Cyclical', volume: 45.2 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 873.38, change: 3.87, marketCap: 2.15, sector: 'Technology', volume: 56.1 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 164.84, change: -0.52, marketCap: 2.05, sector: 'Communication Services', volume: 22.8 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 474.72, change: 1.83, marketCap: 1.22, sector: 'Communication Services', volume: 19.5 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 215.39, change: -2.17, marketCap: 0.68, sector: 'Consumer Cyclical', volume: 102.3 },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 406.27, change: 0.32, marketCap: 0.89, sector: 'Financial Services', volume: 4.2 }
  ]);
  
  const [sortBy, setSortBy] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const handleSortChange = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };
  
  // Filter and sort stocks
  const filteredAndSortedStocks = [...stocks]
    .filter(stock => {
      // Apply search query filter
      if (searchQuery && !stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !stock.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply price range filter
      if (stock.price < selectedFilters.priceRange[0] || stock.price > selectedFilters.priceRange[1]) {
        return false;
      }
      
      // Apply sector filter
      if (selectedFilters.sector !== 'all' && stock.sector !== selectedFilters.sector) {
        return false;
      }
      
      // Apply performance filter
      if (selectedFilters.performance === 'positive' && stock.change <= 0) {
        return false;
      }
      if (selectedFilters.performance === 'negative' && stock.change >= 0) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  
  const marketCapOptions = [
    { value: 'all', label: 'All Market Caps' },
    { value: 'mega', label: 'Mega Cap (>$200B)' },
    { value: 'large', label: 'Large Cap ($10B-$200B)' },
    { value: 'mid', label: 'Mid Cap ($2B-$10B)' },
    { value: 'small', label: 'Small Cap ($300M-$2B)' },
    { value: 'micro', label: 'Micro Cap (<$300M)' }
  ];
  
  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Financial Services', label: 'Financial Services' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Consumer Cyclical', label: 'Consumer Cyclical' },
    { value: 'Industrials', label: 'Industrials' },
    { value: 'Communication Services', label: 'Communication Services' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Basic Materials', label: 'Basic Materials' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Consumer Defensive', label: 'Consumer Defensive' }
  ];
  
  const performanceOptions = [
    { value: 'all', label: 'All Performance' },
    { value: 'positive', label: 'Positive Change' },
    { value: 'negative', label: 'Negative Change' },
    { value: 'top_gainers', label: 'Top Gainers' },
    { value: 'top_losers', label: 'Top Losers' }
  ];

  const resetFilters = () => {
    setSelectedFilters({
      priceRange: [0, 1000],
      marketCap: 'all',
      sector: 'all',
      performance: 'all'
    });
    setSearchQuery('');
  };

  // Check if any filter is active
  const isFilterActive = 
    selectedFilters.priceRange[0] > 0 || 
    selectedFilters.priceRange[1] < 1000 || 
    selectedFilters.marketCap !== 'all' || 
    selectedFilters.sector !== 'all' || 
    selectedFilters.performance !== 'all' ||
    searchQuery !== '';

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBackClick} 
            className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart2 className="h-6 w-6 mr-2 text-purple-600" />
            Stock Screener
          </h1>
          
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Search Bar and Filter Toggle */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search by symbol or company name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors"
              >
                <Sliders className="h-5 w-5 mr-2" />
                <span>Filters</span>
                {isFilterActive && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-purple-600 rounded-full">
                    !
                  </span>
                )}
              </button>
              
              {isFilterActive && (
                <button 
                  onClick={resetFilters}
                  className="flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                >
                  <X className="h-4 w-4 mr-1" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Filters Panel - Expandable */}
          {filtersExpanded && (
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 space-y-4">
              <div className="flex items-center mb-2">
                <Filter className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-gray-800">Advanced Filters</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range ($)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="Min"
                      min="0"
                      value={selectedFilters.priceRange[0]}
                      onChange={(e) => setSelectedFilters({
                        ...selectedFilters,
                        priceRange: [Number(e.target.value), selectedFilters.priceRange[1]]
                      })}
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="Max"
                      min="0"
                      value={selectedFilters.priceRange[1]}
                      onChange={(e) => setSelectedFilters({
                        ...selectedFilters,
                        priceRange: [selectedFilters.priceRange[0], Number(e.target.value)]
                      })}
                    />
                  </div>
                </div>
                
                {/* Market Cap Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Market Cap</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedFilters.marketCap}
                    onChange={(e) => setSelectedFilters({...selectedFilters, marketCap: e.target.value})}
                  >
                    {marketCapOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Sector Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedFilters.sector}
                    onChange={(e) => setSelectedFilters({...selectedFilters, sector: e.target.value})}
                  >
                    {sectorOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Performance Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Performance</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedFilters.performance}
                    onChange={(e) => setSelectedFilters({...selectedFilters, performance: e.target.value})}
                  >
                    {performanceOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Results Summary */}
          <div className="bg-white px-6 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">{filteredAndSortedStocks.length}</span> stocks found
              </p>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">Sort by:</span> {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
              </div>
            </div>
          </div>
          
          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('symbol')}
                  >
                    <div className="flex items-center">
                      Symbol
                      {sortBy === 'symbol' && (
                        sortDirection === 'asc' ? 
                          <ArrowDownAZ className="h-4 w-4 ml-1 text-purple-600" /> : 
                          <ArrowUpAZ className="h-4 w-4 ml-1 text-purple-600" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('name')}
                  >
                    <div className="flex items-center">
                      Company
                      {sortBy === 'name' && (
                        sortDirection === 'asc' ? 
                          <ArrowDownAZ className="h-4 w-4 ml-1 text-purple-600" /> : 
                          <ArrowUpAZ className="h-4 w-4 ml-1 text-purple-600" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('price')}
                  >
                    <div className="flex items-center">
                      Price
                      {sortBy === 'price' && (
                        sortDirection === 'asc' ? 
                          <ArrowDownAZ className="h-4 w-4 ml-1 text-purple-600" /> : 
                          <ArrowUpAZ className="h-4 w-4 ml-1 text-purple-600" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('change')}
                  >
                    <div className="flex items-center">
                      Change
                      {sortBy === 'change' && (
                        sortDirection === 'asc' ? 
                          <ArrowDownAZ className="h-4 w-4 ml-1 text-purple-600" /> : 
                          <ArrowUpAZ className="h-4 w-4 ml-1 text-purple-600" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('marketCap')}
                  >
                    <div className="flex items-center">
                      Market Cap (T)
                      {sortBy === 'marketCap' && (
                        sortDirection === 'asc' ? 
                          <ArrowDownAZ className="h-4 w-4 ml-1 text-purple-600" /> : 
                          <ArrowUpAZ className="h-4 w-4 ml-1 text-purple-600" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('sector')}
                  >
                    <div className="flex items-center">
                      Sector
                      {sortBy === 'sector' && (
                        sortDirection === 'asc' ? 
                          <ArrowDownAZ className="h-4 w-4 ml-1 text-purple-600" /> : 
                          <ArrowUpAZ className="h-4 w-4 ml-1 text-purple-600" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSortChange('volume')}
                  >
                    <div className="flex items-center">
                      Volume (M)
                      {sortBy === 'volume' && (
                        sortDirection === 'asc' ? 
                          <ArrowDownAZ className="h-4 w-4 ml-1 text-purple-600" /> : 
                          <ArrowUpAZ className="h-4 w-4 ml-1 text-purple-600" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedStocks.length > 0 ? (
                  filteredAndSortedStocks.map((stock) => (
                    <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-purple-600">{stock.symbol}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stock.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${stock.marketCap.toFixed(2)}T</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-800">
                          {stock.sector}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stock.volume.toFixed(1)}M</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 mr-4">View</button>
                        
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Search className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-lg font-medium">No stocks found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAndSortedStocks.length}</span> of{' '}
                  <span className="font-medium">{filteredAndSortedStocks.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-purple-500 bg-purple-50 text-sm font-medium text-purple-600">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}