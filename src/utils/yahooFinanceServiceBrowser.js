/**
 * Mock service for simulating Yahoo Finance data
 * This provides realistic-looking mock data without making actual API calls
 */
const yahooFinanceServiceBrowser = {
  // Stock data cache to ensure consistent values during the session
  _stockCache: {
    'AAPL': { price: 175.28, change: 2.3, isUp: true, prevClose: 171.34 },
    'MSFT': { price: 327.64, change: 3.2, isUp: true, prevClose: 317.48 },
    'GOOGL': { price: 156.37, change: -1.2, isUp: false, prevClose: 158.27 },
    'AMZN': { price: 182.49, change: 0.8, isUp: true, prevClose: 181.04 },
    'TSLA': { price: 892.45, change: 4.8, isUp: true, prevClose: 851.58 },
    'META': { price: 432.18, change: 1.5, isUp: true, prevClose: 425.79 },
    'NFLX': { price: 628.75, change: -0.7, isUp: false, prevClose: 633.17 },
    'NVDA': { price: 1024.36, change: 5.2, isUp: true, prevClose: 973.73 },
    'AMD': { price: 156.82, change: 2.1, isUp: true, prevClose: 153.59 },
    'INTC': { price: 32.45, change: -1.8, isUp: false, prevClose: 33.04 }
  },
  
  // Market indices cache
  _indicesCache: {
    'dow': { value: 39872.14, change: 0.68, isUp: true, prevClose: 39601.47 },
    'sp500': { value: 5321.42, change: 0.57, isUp: true, prevClose: 5291.22 },
    'nasdaq': { value: 17584.95, change: -0.23, isUp: false, prevClose: 17625.45 },
    'bitcoin': { value: 68345.78, change: 2.46, isUp: true, prevClose: 66705.82 }
  },
  
  /**
   * Add some randomness to the data to simulate market movement
   * @private
   */
  _updatePrices() {
    // Update stock prices with small random changes
    Object.keys(this._stockCache).forEach(symbol => {
      const stock = this._stockCache[symbol];
      const randomChange = (Math.random() * 2 - 1) * 0.5; // Random change between -0.5% and +0.5%
      const newPrice = stock.price * (1 + randomChange / 100);
      const newChange = ((newPrice - stock.prevClose) / stock.prevClose) * 100;
      
      this._stockCache[symbol] = {
        price: parseFloat(newPrice.toFixed(2)),
        change: parseFloat(Math.abs(newChange).toFixed(2)),
        isUp: newChange >= 0,
        prevClose: stock.prevClose
      };
    });
    
    // Update indices with small random changes
    Object.keys(this._indicesCache).forEach(index => {
      const indexData = this._indicesCache[index];
      const randomChange = (Math.random() * 2 - 1) * 0.3; // Random change between -0.3% and +0.3%
      const newValue = indexData.value * (1 + randomChange / 100);
      const newChange = ((newValue - indexData.prevClose) / indexData.prevClose) * 100;
      
      this._indicesCache[index] = {
        value: parseFloat(newValue.toFixed(2)),
        change: parseFloat(Math.abs(newChange).toFixed(2)),
        isUp: newChange >= 0,
        prevClose: indexData.prevClose
      };
    });
  },
  
  /**
   * Get real-time quote for a single symbol
   * @param {string} symbol - Stock symbol (e.g., 'AAPL')
   * @returns {Promise<Object>} - Quote data
   */
  getQuote: async (symbol) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Update prices to simulate market movement
    yahooFinanceServiceBrowser._updatePrices();
    
    // Get stock data from cache or generate random data if not in cache
    const stockData = yahooFinanceServiceBrowser._stockCache[symbol] || {
      price: parseFloat((100 + Math.random() * 50).toFixed(2)),
      change: parseFloat((Math.random() * 5).toFixed(2)),
      isUp: Math.random() > 0.4,
      prevClose: parseFloat((100 + Math.random() * 50).toFixed(2))
    };
    
    return {
      regularMarketPrice: stockData.price,
      regularMarketPreviousClose: stockData.prevClose,
      regularMarketChangePercent: stockData.isUp ? stockData.change : -stockData.change,
      symbol: symbol,
      shortName: `${symbol} Inc.`,
      longName: `${symbol} Corporation`
    };
  },

  /**
   * Get real-time quotes for multiple symbols
   * @param {string[]} symbols - Array of stock symbols
   * @returns {Promise<Object[]>} - Array of quote data
   */
  getQuotes: async (symbols) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update prices to simulate market movement
    yahooFinanceServiceBrowser._updatePrices();
    
    return Promise.all(symbols.map(symbol => yahooFinanceServiceBrowser.getQuote(symbol)));
  },

  /**
   * Get historical data for a symbol
   * @param {string} symbol - Stock symbol
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {string} interval - Data interval ('1d', '1wk', '1mo', etc.)
   * @returns {Promise<Object[]>} - Historical data
   */
  getHistoricalData: async (symbol, startDate, endDate, interval = '1d') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return generateHistoricalData(symbol, startDate, endDate, interval);
  },

  /**
   * Get market indices data
   * @returns {Promise<Object>} - Market indices data
   */
  getMarketIndices: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Update prices to simulate market movement
    yahooFinanceServiceBrowser._updatePrices();
    
    return yahooFinanceServiceBrowser._indicesCache;
  },

  /**
   * Search for stocks, ETFs, etc.
   * @param {string} query - Search query
   * @param {number} limit - Maximum number of results
   * @returns {Promise<Object[]>} - Search results
   */
  search: async (query, limit = 10) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allStocks = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'TSLA', name: 'Tesla, Inc.' },
      { symbol: 'META', name: 'Meta Platforms, Inc.' },
      { symbol: 'NFLX', name: 'Netflix, Inc.' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation' },
      { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.' },
      { symbol: 'INTC', name: 'Intel Corporation' }
    ];
    
    // Filter stocks based on query
    const results = allStocks
      .filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
        stock.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit)
      .map(stock => ({
        symbol: stock.symbol,
        shortname: stock.name,
        longname: stock.name,
        typeDisp: 'Equity',
        exchDisp: 'NASDAQ'
      }));
    
    return results;
  },
};

/**
 * Generate realistic historical data
 * @param {string} symbol - Stock symbol
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @param {string} interval - Data interval
 * @returns {Array} - Historical data
 */
function generateHistoricalData(symbol, startDate, endDate, interval) {
  const historicalData = [];
  const dayMilliseconds = 24 * 60 * 60 * 1000;
  const intervalMilliseconds = 
    interval === '1d' ? dayMilliseconds :
    interval === '1wk' ? 7 * dayMilliseconds :
    interval === '1mo' ? 30 * dayMilliseconds :
    interval === '15m' ? 15 * 60 * 1000 : dayMilliseconds;
  
  // Get base price from cache or use default
  const stockData = yahooFinanceServiceBrowser._stockCache[symbol] || { price: 100 };
  let basePrice = stockData.price * 0.9; // Start a bit lower than current price
  
  // Generate data with a realistic trend (generally upward with some volatility)
  let currentDate = new Date(startDate);
  const endDateTime = new Date(endDate).getTime();
  
  // Create a trend pattern (e.g., generally upward with some dips)
  const trendFactor = 0.001; // Overall trend direction and strength
  const volatilityFactor = 0.02; // Day-to-day volatility
  
  while (currentDate.getTime() <= endDateTime) {
    // Calculate price movement
    const trend = trendFactor * (currentDate.getTime() - startDate.getTime());
    const volatility = (Math.random() - 0.5) * volatilityFactor;
    const priceChange = basePrice * (trend + volatility);
    
    // Calculate prices for this interval
    const close = basePrice + priceChange;
    const open = basePrice * (1 + (Math.random() - 0.5) * 0.01);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    const volume = Math.floor(1000000 + Math.random() * 9000000);
    
    historicalData.push({
      date: new Date(currentDate),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: volume
    });
    
    // Update base price for next interval
    basePrice = close;
    
    // Move to next interval
    currentDate = new Date(currentDate.getTime() + intervalMilliseconds);
  }
  
  return historicalData;
}

export default yahooFinanceServiceBrowser;