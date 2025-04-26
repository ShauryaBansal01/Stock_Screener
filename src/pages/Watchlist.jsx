import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, ChevronDown, ChevronUp, MoreVertical, Plus, 
  Trash2, Edit, PlusCircle, X, Save, AlertCircle,
  TrendingUp, TrendingDown, Filter, ExternalLink, ArrowRightCircle,
  ArrowLeft, Search
} from 'lucide-react';

export default function EnhancedWatchlist() {
  const navigate = useNavigate();
  const [activeWatchlist, setActiveWatchlist] = useState('My Watchlist');
  const [watchlists, setWatchlists] = useState([
    { name: 'My Watchlist', stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 198.45, change: 2.34, percentChange: 1.19, isFavorite: true, todayHighLow: { high: 200.12, low: 196.22 }, volume: '34.2M' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 417.88, change: -1.22, percentChange: -0.29, isFavorite: false, todayHighLow: { high: 420.05, low: 416.30 }, volume: '22.5M' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 172.63, change: 0.87, percentChange: 0.51, isFavorite: false, todayHighLow: { high: 173.45, low: 171.20 }, volume: '18.7M' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 183.95, change: 3.45, percentChange: 1.91, isFavorite: true, todayHighLow: { high: 184.50, low: 180.33 }, volume: '12.9M' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 111.68, change: -2.13, percentChange: -1.87, isFavorite: false, todayHighLow: { high: 114.22, low: 110.45 }, volume: '45.8M' }
    ]},
    { name: 'Tech Giants', stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 198.45, change: 2.34, percentChange: 1.19, isFavorite: false, todayHighLow: { high: 200.12, low: 196.22 }, volume: '34.2M' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 417.88, change: -1.22, percentChange: -0.29, isFavorite: false, todayHighLow: { high: 420.05, low: 416.30 }, volume: '22.5M' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 172.63, change: 0.87, percentChange: 0.51, isFavorite: false, todayHighLow: { high: 173.45, low: 171.20 }, volume: '18.7M' }
    ]},
    { name: 'ETFs', stocks: [
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 520.47, change: 1.23, percentChange: 0.24, isFavorite: false, todayHighLow: { high: 522.15, low: 518.90 }, volume: '52.6M' },
      { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 437.92, change: 2.15, percentChange: 0.49, isFavorite: false, todayHighLow: { high: 439.75, low: 435.80 }, volume: '32.4M' }
    ]}
  ]);
  
  const [stockActionMenu, setStockActionMenu] = useState(null);
  const [watchlistActionMenu, setWatchlistActionMenu] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [isEditingLists, setIsEditingLists] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [editingListName, setEditingListName] = useState({ index: null, name: '' });
  const [filterText, setFilterText] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [newStockSymbol, setNewStockSymbol] = useState('');

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleFavorite = (symbol) => {
    setWatchlists(watchlists.map(watchlist => {
      if (watchlist.name === activeWatchlist) {
        return {
          ...watchlist,
          stocks: watchlist.stocks.map(stock => 
            stock.symbol === symbol ? { ...stock, isFavorite: !stock.isFavorite } : stock
          )
        };
      }
      return watchlist;
    }));
  };

  const toggleStockMenu = (symbol) => {
    if (stockActionMenu === symbol) {
      setStockActionMenu(null);
    } else {
      setStockActionMenu(symbol);
    }
  };

  const removeStock = (symbol) => {
    setWatchlists(watchlists.map(watchlist => {
      if (watchlist.name === activeWatchlist) {
        return {
          ...watchlist,
          stocks: watchlist.stocks.filter(stock => stock.symbol !== symbol)
        };
      }
      return watchlist;
    }));
    setStockActionMenu(null);
  };

  const getCurrentWatchlist = () => {
    return watchlists.find(list => list.name === activeWatchlist) || { stocks: [] };
  };

  const sortedAndFilteredStocks = () => {
    const currentList = getCurrentWatchlist();
    let filteredStocks = currentList.stocks;
    
    if (filterText) {
      const searchTerm = filterText.toLowerCase();
      filteredStocks = filteredStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm) || 
        stock.name.toLowerCase().includes(searchTerm)
      );
    }
    
    if (!sortConfig.key) return filteredStocks;
    
    return [...filteredStocks].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const createNewList = () => {
    if (!newListName.trim()) return;
    
    setWatchlists([...watchlists, { name: newListName.trim(), stocks: [] }]);
    setActiveWatchlist(newListName.trim());
    setNewListName('');
    setIsCreatingList(false);
  };

  const deleteWatchlist = (listName) => {
    const filteredLists = watchlists.filter(list => list.name !== listName);
    setWatchlists(filteredLists);
    
    if (activeWatchlist === listName && filteredLists.length > 0) {
      setActiveWatchlist(filteredLists[0].name);
    }
    
    setWatchlistActionMenu(false);
  };

  const startEditingListName = (index, currentName) => {
    setEditingListName({ index, name: currentName });
  };

  const saveEditedListName = (index) => {
    if (!editingListName.name.trim()) return;
    
    const updatedLists = [...watchlists];
    const oldName = updatedLists[index].name;
    updatedLists[index].name = editingListName.name.trim();
    
    setWatchlists(updatedLists);
    
    if (activeWatchlist === oldName) {
      setActiveWatchlist(editingListName.name.trim());
    }
    
    setEditingListName({ index: null, name: '' });
  };

  const addNewStock = () => {
    if (!newStockSymbol.trim()) return;
    
    const newStock = {
      symbol: newStockSymbol.toUpperCase(),
      name: `${newStockSymbol.toUpperCase()} Inc.`,
      price: 100 + Math.random() * 200,
      change: (Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
      percentChange: (Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1),
      isFavorite: false,
      todayHighLow: { 
        high: 100 + Math.random() * 220, 
        low: 90 + Math.random() * 180 
      },
      volume: `${Math.floor(Math.random() * 50)}M`
    };
    
    setWatchlists(watchlists.map(watchlist => {
      if (watchlist.name === activeWatchlist) {
        return {
          ...watchlist,
          stocks: [...watchlist.stocks, newStock]
        };
      }
      return watchlist;
    }));
    
    setNewStockSymbol('');
    setIsAddingStock(false);
  };

  const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto px-6 py-6">
        {/* Header Section */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Watchlist</h1>
              <div className="mt-1 flex items-center space-x-2 text-gray-600">
                <span>{watchlists.length} watchlists</span>
                <span>•</span>
                <span>{getCurrentWatchlist().stocks.length} symbols</span>
                <span>•</span>
                <span className="text-green-600">Market Open</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={handleBackClick}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <button 
                onClick={() => setIsAddingStock(true)}
                className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white flex items-center hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Stock
              </button>
            </div>
          </div>

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'S&P 500', value: '4,927.93', change: '+0.82%', isUp: true },
              { label: 'Dow Jones', value: '38,519.84', change: '+0.37%', isUp: true },
              { label: 'Nasdaq', value: '15,628.95', change: '-0.23%', isUp: false },
              { label: 'VIX', value: '13.85', change: '-5.21%', isUp: false },
            ].map((index) => (
              <div key={index.label} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">{index.label}</span>
                  <span className={`text-sm font-medium ${index.isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {index.change}
                  </span>
                </div>
                <div className="mt-1 text-lg font-semibold text-gray-900">{index.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select 
                value={activeWatchlist}
                onChange={(e) => setActiveWatchlist(e.target.value)}
                className="pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500"
              >
                {watchlists.map(list => (
                  <option key={list.name} value={list.name}>{list.name}</option>
                ))}
              </select>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search stocks..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stocks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol/Company</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Last Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">P/E Ratio</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">52W Range</th>
                  <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedAndFilteredStocks().map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star 
                          className={`h-4 w-4 mr-3 cursor-pointer ${
                            stock.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                          onClick={() => toggleFavorite(stock.symbol)}
                        />
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{stock.symbol}</span>
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                              {stock.exchange || 'NYSE'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">{stock.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-gray-900">${stock.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stock.percentChange >= 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      $245.6B
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {stock.volume}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      28.5
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      ${stock.todayHighLow.low.toFixed(2)} - ${stock.todayHighLow.high.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Last Updated: <time className="font-medium">Just now</time>
              </span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing <span className="font-medium">{sortedAndFilteredStocks().length}</span> stocks
                </span>
                <button className="text-purple-600 hover:text-purple-900 text-sm font-medium">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}