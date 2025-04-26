import { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Home, 
  Search, 
  Globe, 
  TrendingUp, 
  ChevronRight, 
  Clock, 
  ExternalLink,
  Filter
} from 'lucide-react';

export default function GlobalStockNewsApp() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Preset query for global stock news
  const stockQuery = "stock market OR global stocks OR financial markets OR trading";

  useEffect(() => {
    // Auto-fetch news when component mounts
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const baseUrl = "https://newsapi.org/v2/everything";
      const params = new URLSearchParams({
        "q": searchQuery || stockQuery,
        "apiKey": import.meta.env.VITE_NEWS_API_KEY,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": "15",
        "timestamp": new Date().getTime()
      });
      
      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();
      
      if (data.status !== "ok") {
        throw new Error(data.message || "Failed to fetch news");
      }
      
      if (!data.articles || data.articles.length === 0) {
        throw new Error("No news articles found");
      }
      
      setNews(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const goToHomePage = () => {
    window.location.href = "/";
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };
  
  const filterNewsByCategory = (articles) => {
    if (category === 'all') return articles;
    
    const categoryKeywords = {
      'us': ['us', 'united states', 'wall street', 'dow', 'nasdaq', 's&p'],
      'europe': ['europe', 'european', 'eu', 'euro', 'london', 'paris', 'frankfurt'],
      'asia': ['asia', 'china', 'japan', 'hong kong', 'nikkei', 'shanghai']
    };
    
    return articles.filter(article => {
      const content = (article.title + ' ' + article.description).toLowerCase();
      return categoryKeywords[category].some(keyword => content.includes(keyword));
    });
  };
  
  const filteredNews = filterNewsByCategory(news);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header with Navigation */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <TrendingUp className="text-purple-600 mr-2" size={28} />
              <h1 className="text-3xl font-bold text-purple-800">StockPulse</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={goToHomePage}
                className="flex items-center text-purple-600 hover:text-purple-800"
              >
                <Home size={16} className="mr-1" /> Home
              </button>
            </div>
          </div>
          
          <div className="border-b border-t border-purple-100 py-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl font-semibold flex items-center text-purple-700">
              <Globe className="mr-2" size={20} />
              Global Market Insights
            </div>
            
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search market news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 px-4 pr-10 rounded-l border border-purple-200 bg-white w-full md:w-64"
                />
                <Search className="absolute right-3 top-2.5 text-purple-400" size={16} />
              </div>
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-r"
              >
                Search
              </button>
            </form>
          </div>
        </header>
        
        {/* Category Filter */}
        <div className="mb-6 flex items-center">
          <Filter size={16} className="mr-2 text-purple-600" />
          <span className="mr-3 font-medium text-purple-800">Filter:</span>
          <div className="flex space-x-2">
            {['all', 'us', 'europe', 'asia'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded text-sm transition ${
                  category === cat 
                  ? "bg-purple-600 text-white" 
                  : "bg-purple-100 text-purple-800"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="ml-auto">
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-4 rounded transition-colors disabled:opacity-60"
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Updating...' : 'Refresh'}
            </button>
          </div>
        </div>
        
        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-r-transparent"></div>
              <p className="mt-4 text-purple-500">Gathering market insights...</p>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mx-auto max-w-lg mt-4 p-4 bg-red-50 text-red-700 rounded text-center">
            <p className="font-medium">Error loading news:</p>
            <p>{error}</p>
            <p className="text-sm mt-2">
              (Make sure your News API key is correctly configured)
            </p>
          </div>
        )}
        
        {/* Featured Article */}
        {!loading && filteredNews.length > 0 && (
          <>
            <div className="mb-8">
              <article className="rounded-xl overflow-hidden shadow-lg border border-purple-100 bg-white">
                <div className="md:flex">
                  <div className="md:w-2/5 h-64 md:h-auto">
                    <img 
                      src={filteredNews[0].urlToImage || "/api/placeholder/800/600"} 
                      alt={filteredNews[0].title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-600 text-white">FEATURED</span>
                      <span className="ml-2 text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {formatDate(filteredNews[0].publishedAt)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-purple-900">{filteredNews[0].title}</h2>
                    <p className="mb-4 text-gray-600">{filteredNews[0].description}</p>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Source: {filteredNews[0].source.name}
                        </span>
                        <a
                          href={filteredNews[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
                        >
                          Continue Reading <ChevronRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            
            {/* Market News Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center text-purple-800">
                <TrendingUp className="mr-2 text-purple-600" size={20} />
                Latest Market Updates
                {filteredNews.length > 1 && (
                  <span className="ml-2 text-sm font-normal text-purple-500">
                    ({filteredNews.length - 1} articles)
                  </span>
                )}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.slice(1).map((article, index) => (
                  <article 
                    key={index} 
                    className="bg-white border border-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
                  >
                    <div className="h-48 overflow-hidden rounded-t-lg bg-purple-50">
                      <img 
                        src={article.urlToImage || "/api/placeholder/400/300"} 
                        alt={article.title || "News image"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-purple-600">{article.source.name}</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-purple-800">{article.title}</h3>
                      
                      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{article.description}</p>
                      
                      <div className="pt-4 border-t border-purple-50 mt-auto flex justify-between items-center">
                        {article.author && (
                          <span className="text-xs truncate max-w-xs text-gray-500">
                            By {article.author}
                          </span>
                        )}
                        
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-purple-600 hover:text-purple-800 font-medium"
                        >
                          Read <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Empty State */}
        {!loading && filteredNews.length === 0 && !error && (
          <div className="text-center p-12 bg-purple-50 rounded-xl">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-2xl font-medium mb-2 text-purple-800">No Market News Found</h3>
            <p className="text-purple-600 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
                fetchNews();
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-purple-100 text-center text-sm text-gray-500">
          <div className="flex justify-center items-center mb-2">
            <TrendingUp size={16} className="mr-2 text-purple-600" />
            <p className="font-medium text-purple-700">StockPulse</p>
          </div>
          <p>Market data powered by News API • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}