import React, { createContext, useState, useEffect, useContext } from 'react';
import yahooFinanceService from '../utils/yahooFinanceService';

// Create the context
const DataContext = createContext();

// Custom hook to use the data context
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // State for all the data we want to preload
  const [marketOverview, setMarketOverview] = useState({
    dow: { value: 39872.14, change: 0.68, isUp: true },
    sp500: { value: 5321.42, change: 0.57, isUp: true },
    nasdaq: { value: 17584.95, change: -0.23, isUp: false },
    bitcoin: { value: 68345.78, change: 2.46, isUp: true },
  });
  
  const [watchlistPerformance, setWatchlistPerformance] = useState([
    { name: 'AAPL', price: 175.28, change: 2.3, isUp: true, logo: 'A' },
    { name: 'MSFT', price: 327.64, change: 3.2, isUp: true, logo: 'M' },
    { name: 'GOOGL', price: 156.37, change: -1.2, isUp: false, logo: 'G' },
    { name: 'AMZN', price: 182.49, change: 0.8, isUp: true, logo: 'A' },
    { name: 'TSLA', price: 892.45, change: 4.8, isUp: true, logo: 'T' }
  ]);
  
  const [performanceData, setPerformanceData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to fetch market index data
  const fetchMarketIndices = async () => {
    try {
      const results = await yahooFinanceService.getMarketIndices();
      setMarketOverview(results);
      return results;
    } catch (error) {
      console.error('Error fetching market indices:', error);
      return null;
    }
  };

  // Function to fetch watchlist stock data
  const fetchWatchlistData = async () => {
    try {
      const watchlistSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
      const quotes = await yahooFinanceService.getQuotes(watchlistSymbols);
      
      const stockData = quotes.map((quote, index) => {
        const symbol = watchlistSymbols[index];
        const price = quote.regularMarketPrice || 0;
        const previousClose = quote.regularMarketPreviousClose || 0;
        const change = previousClose ? ((price - previousClose) / previousClose) * 100 : 0;
        
        return {
          name: symbol,
          price: price || 0,
          change: Math.abs(change).toFixed(2),
          isUp: change >= 0,
          logo: symbol.charAt(0),
        };
      });
      
      setWatchlistPerformance(stockData);
      return stockData;
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
      return null;
    }
  };

  // Function to fetch historical data for charts
  const fetchHistoricalData = async () => {
    try {
      // Fetch SPY (S&P 500 ETF) as a proxy for market performance
      const symbol = 'SPY';
      
      // Fetch daily data for 1D chart
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      
      const dailyResult = await yahooFinanceService.getHistoricalData(
        symbol, 
        startDate, 
        endDate, 
        '15m'
      );
      
      // Ensure dailyResult is an array before mapping
      const formattedDailyData = Array.isArray(dailyResult) ? dailyResult.map(item => ({
        time: new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: Math.round((item.close || 100) * 1000), // Scaling for visualization, fallback to 100 if close is undefined
      })) : [];
      
      if (formattedDailyData.length > 0) {
        setDailyData(formattedDailyData);
      }
      
      // Fetch weekly data
      startDate.setDate(endDate.getDate() - 7);
      const weeklyResult = await yahooFinanceService.getHistoricalData(
        symbol, 
        startDate, 
        endDate, 
        '1d'
      );
      
      // Ensure weeklyResult is an array before mapping
      const formattedWeeklyData = Array.isArray(weeklyResult) ? weeklyResult.map(item => ({
        day: new Date(item.date).toLocaleDateString([], { weekday: 'short' }),
        value: Math.round((item.close || 100) * 1000), // Scaling for visualization, fallback to 100 if close is undefined
      })) : [];
      
      if (formattedWeeklyData.length > 0) {
        setWeeklyData(formattedWeeklyData);
      }
      
      // Fetch monthly and yearly data
      startDate.setFullYear(endDate.getFullYear() - 1);
      const yearlyResult = await yahooFinanceService.getHistoricalData(
        symbol, 
        startDate, 
        endDate, 
        '1mo'
      );
      
      // Ensure yearlyResult is an array before mapping
      const formattedYearlyData = Array.isArray(yearlyResult) ? yearlyResult.map(item => ({
        name: new Date(item.date).toLocaleDateString([], { month: 'short' }),
        value: Math.round((item.close || 100) * 1000), // Scaling for visualization, fallback to 100 if close is undefined
      })) : [];
      
      if (formattedYearlyData.length > 0) {
        setPerformanceData(formattedYearlyData);
      }
      
      return {
        daily: formattedDailyData,
        weekly: formattedWeeklyData,
        yearly: formattedYearlyData
      };
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return null;
    }
  };

  // Function to refresh all data
  const refreshAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchMarketIndices(),
        fetchWatchlistData(),
        fetchHistoricalData()
      ]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Preload data when the app starts
  useEffect(() => {
    const preloadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchMarketIndices(),
          fetchWatchlistData(),
          fetchHistoricalData()
        ]);
      } catch (error) {
        console.error("Error preloading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    preloadData();
    
    // Set up a refresh interval (every 30 seconds)
    const refreshInterval = setInterval(() => {
      fetchMarketIndices().catch(err => console.error("Auto-refresh market indices failed:", err));
      fetchWatchlistData().catch(err => console.error("Auto-refresh watchlist failed:", err));
    }, 30 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Value to be provided by the context
  const value = {
    marketOverview,
    watchlistPerformance,
    performanceData,
    dailyData,
    weeklyData,
    isLoading,
    refreshAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;