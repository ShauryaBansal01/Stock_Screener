# Stock Data Integration

This document explains how the stock data integration works in the FinWise-Reloaded application.

## Overview

The application uses a mock data service to simulate real-time and historical stock data. This approach provides:

- Simulated real-time market index data (Dow Jones, S&P 500, NASDAQ, Bitcoin)
- Simulated real-time stock quotes for watchlist items
- Generated historical data for charts (daily, weekly, monthly, yearly)

## Implementation Details

### Mock Finance Service

The integration is implemented through a service layer in `src/utils/yahooFinanceServiceBrowser.js`. This service provides methods for:

- Getting simulated real-time quotes for individual stocks
- Getting quotes for multiple stocks in a single request
- Generating historical data with different time intervals
- Getting market index data
- Searching for stocks and other financial instruments

The mock service includes realistic price movements and volatility to simulate actual market behavior.

### Dashboard Integration

The Dashboard component uses the mock finance service to:

1. Display simulated real-time market index data
2. Display simulated real-time stock data for watchlist items
3. Display generated historical data for the performance charts

Data is automatically refreshed when the component mounts and can be manually refreshed using the "Refresh Data" button.

## Usage

### Adding New Stocks to Watchlist

To add new stocks to the watchlist, modify the `watchlistSymbols` array in the `fetchWatchlistData` function:

```javascript
const watchlistSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NEW_SYMBOL'];
```

You can also add new stocks to the `_stockCache` in the `yahooFinanceServiceBrowser.js` file to provide specific data for those stocks.

### Changing Chart Data Source

By default, the charts use SPY (S&P 500 ETF) as a data source. To change this, modify the `symbol` variable in the `fetchHistoricalData` function:

```javascript
const symbol = 'YOUR_PREFERRED_SYMBOL';
```

### Data Refresh Interval

The dashboard automatically refreshes market data every 30 seconds (for demonstration purposes). To change this interval, modify the `refreshInterval` in the useEffect hook:

```javascript
const refreshInterval = setInterval(() => {
  fetchMarketIndices();
  fetchWatchlistData();
}, YOUR_PREFERRED_INTERVAL_IN_MS);
```

## Customizing Mock Data

### Stock Data

You can customize the mock stock data by modifying the `_stockCache` object in `yahooFinanceServiceBrowser.js`:

```javascript
_stockCache: {
  'AAPL': { price: 175.28, change: 2.3, isUp: true, prevClose: 171.34 },
  // Add or modify stocks here
}
```

### Market Indices

You can customize the market indices data by modifying the `_indicesCache` object:

```javascript
_indicesCache: {
  'dow': { value: 39872.14, change: 0.68, isUp: true, prevClose: 39601.47 },
  // Add or modify indices here
}
```

### Historical Data Generation

The historical data generation algorithm can be customized in the `generateHistoricalData` function to create different patterns or volatility levels.

## Moving to Real Data

When you're ready to use real data instead of mock data, you'll need to:

1. Implement a server-side proxy to fetch data from Yahoo Finance or another financial data provider
2. Update the service to use the proxy instead of generating mock data
3. Handle rate limiting and error cases appropriately

This approach avoids CORS issues that occur when trying to access financial APIs directly from the browser.