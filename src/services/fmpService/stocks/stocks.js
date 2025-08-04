import { apiClient } from '../../../utils/apiClient.js'
import { FMP_API_KEY } from '../../../config/env.js'
import { formatPercentage } from '../../../utils/formatPercentage.js'
import { calculateDateRange } from '../../../utils/calculateDateRange.js'
import { formatDate, formatDateTimeEST } from '../../../utils/DateUtils.js';

/**
 * Fetches real-time stock quote data
 * @function getRealTimeStockQuote
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT', 'GOOGL')
 * @returns {Promise<Object>} Real-time stock quote data
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const quote = await getRealTimeStockQuote('AAPL');
 * // Returns: { symbol: 'AAPL', price: 150.25, change: 2.5, volume: 50000000, ... }
 */
export const getRealTimeStockQuote = async (symbol) => {
    const response = await apiClient.get(`/stable/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    return response.data
}

/* [
    {
        "symbol": "AAPL",
        "1D": -0.61533,
        "5D": -2.20307,
        "1M": 2.33952,
        "3M": -1.19059,
        "6M": -11.62507,
        "ytd": -13.89379,
        "1Y": -4.03565,
        "3Y": 30.00433,
        "5Y": 118.28672,
        "10Y": 586.40078,
        "max": 163491.74133
    }
] */

/**
 * Fetches comprehensive stock price change data across multiple time periods
 * @function getStockPriceChanges
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Object containing formatted percentage changes for all time periods
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const changes = await getStockPriceChanges('AAPL');
 * // Returns: { symbol: 'AAPL', oneDay: '+2.5%', oneWeek: '-1.2%', oneMonth: '+5.3%', ... }
 */
export const getStockPriceChanges = async (symbol) => {
    const response = await apiClient.get(`/stable/stock-price-change?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    const data = response.data[0];
    
    return {
        symbol: data.symbol,
        oneDay: formatPercentage(data['1D']),
        oneWeek: formatPercentage(data['5D']),
        oneMonth: formatPercentage(data['1M']),
        threeMonth: formatPercentage(data['3M']),
        sixMonth: formatPercentage(data['6M']),
        yearToDate: formatPercentage(data['ytd']),
        oneYear: formatPercentage(data['1Y']),
        threeYear: formatPercentage(data['3Y']),
        fiveYear: formatPercentage(data['5Y']),
        tenYear: formatPercentage(data['10Y']),
        max: formatPercentage(data['max'])
    }
}

/**
 * Fetches one-year stock price change percentage
 * @function getStockPriceChangeByOneYear
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Object containing symbol and one-year change percentage
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const change = await getStockPriceChangeByOneYear('AAPL');
 * // Returns: { symbol: 'AAPL', oneYearChangePercentage: '+15.3%' }
 */
export const getStockPriceChangeByOneYear = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneYearChangePercentage: changes.oneYear
    }
}

/**
 * Fetches six-month stock price change percentage
 * @function getStockPriceChangeBySixMonth
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Object containing symbol and six-month change percentage
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const change = await getStockPriceChangeBySixMonth('AAPL');
 * // Returns: { symbol: 'AAPL', sixMonthChangePercentage: '+8.7%' }
 */
export const getStockPriceChangeBySixMonth = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        sixMonthChangePercentage: changes.sixMonth
    }
}

/**
 * Fetches one-month stock price change percentage
 * @function getStockPriceChangeByOneMonth
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Object containing symbol and one-month change percentage
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const change = await getStockPriceChangeByOneMonth('AAPL');
 * // Returns: { symbol: 'AAPL', oneMonthChangePercentage: '+3.2%' }
 */
export const getStockPriceChangeByOneMonth = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneMonthChangePercentage: changes.oneMonth
    }
}

/**
 * Fetches one-week stock price change percentage
 * @function getStockPriceChangeByOneWeek
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Object containing symbol and one-week change percentage
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const change = await getStockPriceChangeByOneWeek('AAPL');
 * // Returns: { symbol: 'AAPL', oneWeekChangePercentage: '-1.5%' }
 */
export const getStockPriceChangeByOneWeek = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneWeekChangePercentage: changes.oneWeek
    }
}

/**
 * Fetches one-day stock price change percentage
 * @function getStockPriceChangeByOneDay
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Object containing symbol and one-day change percentage
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const change = await getStockPriceChangeByOneDay('AAPL');
 * // Returns: { symbol: 'AAPL', oneDayChangePercentage: '+2.1%' }
 */
export const getStockPriceChangeByOneDay = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneDayChangePercentage: changes.oneDay
    }
}

/**
 * Fetches the last hour's stock data for a specific symbol
 * @function getLastHourStockData
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object|null>} Object containing symbol and last hour's record with calculated change percentage, or null if no data
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const data = await getLastHourStockData('AAPL');
 * // Returns: { symbol: 'AAPL', record: { date: '2024-01-01 15:00:00', open: 150, close: 152, changePercent: 1.33, ... } }
 */
export const getLastHourStockData = async (symbol) => {
    // Get today's date in America/New_York timezone (Eastern Time)
    const now = new Date();
    // Convert to US Eastern Time
    const estOffset = -5 * 60; // EST is UTC-5
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estDate = new Date(utc + (estOffset * 60000));
    const yyyy = estDate.getFullYear();
    const mm = String(estDate.getMonth() + 1).padStart(2, '0');
    const dd = String(estDate.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // Use today's date for both from and to
    let url = `/stable/historical-chart/1hour?symbol=${symbol}&apikey=${FMP_API_KEY}&from=${todayStr}&to=${todayStr}`;

    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    // Get the last hour's record (assuming data is sorted from latest to oldest)
    const lastRecord = data[0];

    if (!lastRecord) {
        return null;
    }

    let changePercent = null;
    if (typeof lastRecord.open === 'number' && typeof lastRecord.close === 'number' && lastRecord.open !== 0) {
        changePercent = ((lastRecord.close - lastRecord.open) / lastRecord.open) * 100;
    }

    return {
        symbol,
        record: {
            ...lastRecord,
            changePercent
        }
    };
}

/**
 * Fetches the most actively traded stocks with random selection
 * @function getMostActiveStocks
 * @returns {Promise<Array>} Array of 10 randomly selected most active stocks
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const activeStocks = await getMostActiveStocks();
 * // Returns: [{ symbol: 'AAPL', price: 150.25, volume: 50000000, ... }, ...] (10 items)
 */
export const getMostActiveStocks = async () => {
    const response = await apiClient.get(`/stable/most-actives?apikey=${FMP_API_KEY}`)
    // Return the 10 random active stocks
    const activeStocks = response.data.sort(() => Math.random() - 0.5).slice(0, 10)
    return activeStocks
}

/**
 * Fetches the biggest gaining stocks with random selection
 * @function getBiggestGainerStocks
 * @returns {Promise<Array>} Array of 10 randomly selected biggest gainer stocks
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const gainerStocks = await getBiggestGainerStocks();
 * // Returns: [{ symbol: 'TSLA', price: 250.50, change: 15.5, ... }, ...] (10 items)
 */
export const getBiggestGainerStocks = async () => {
    const response = await apiClient.get(`/stable/biggest-gainers?apikey=${FMP_API_KEY}`)
    // Return the 10 random gainer stocks
    const gainerStocks = response.data.sort(() => Math.random() - 0.5).slice(0, 10)
    return gainerStocks
}

/**
 * Fetches the biggest losing stocks with random selection
 * @function getBiggestLoserStocks
 * @returns {Promise<Array>} Array of 10 randomly selected biggest loser stocks
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const loserStocks = await getBiggestLoserStocks();
 * // Returns: [{ symbol: 'NFLX', price: 450.25, change: -12.3, ... }, ...] (10 items)
 */
export const getBiggestLoserStocks = async () => {
    const response = await apiClient.get(`/stable/biggest-losers?apikey=${FMP_API_KEY}`)
    // Return the 10 random loser stocks
    const loserStocks = response.data.sort(() => Math.random() - 0.5).slice(0, 10)
    return loserStocks
}

/**
 * Fetches historical daily price data for a stock
 * @function getStockHistoricalDailyPrices
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @param {number} [days] - Number of days to fetch (if provided, overrides from/to)
 * @param {string} [from] - Start date in YYYY-MM-DD format
 * @param {string} [to] - End date in YYYY-MM-DD format
 * @returns {Promise<Array>} Array of historical daily price data
 * @throws {Error} When API call fails or parameters are invalid
 * @example
 * const prices = await getStockHistoricalDailyPrices('AAPL', 30);
 * // Returns: [{ date: '2024-01-01', open: 150, close: 152, high: 153, low: 149, ... }, ...]
 */
export const getStockHistoricalDailyPrices = async (symbol, days, from, to) => {
    let url = `/stable/historical-price-eod/full?symbol=${symbol}&apikey=${FMP_API_KEY}`
    
    if (days) {
        const dateRange = calculateDateRange(days)
        url += `&from=${dateRange.from}&to=${dateRange.to}`
    } else if (from && to) {
        url += `&from=${from}&to=${to}`
    }
    
    const response = await apiClient.get(url)
    return response.data
}

/**
 * Fetches historical hourly data for a stock in EST timezone
 * @function getStockHistoricalByHours
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @param {number} hours - Number of hours to fetch (must be positive)
 * @returns {Promise<Array>} Array of historical hourly data filtered by EST timezone
 * @throws {Error} When hours parameter is invalid or API call fails
 * @example
 * const hourlyData = await getStockHistoricalByHours('AAPL', 24);
 * // Returns: [{ date: '2024-01-01 10:00:00', open: 150, close: 152, high: 153, low: 149, ... }, ...]
 */
export const getStockHistoricalByHours = async (symbol, hours) => {
    if (!hours || hours <= 0) {
        throw new Error('Hours parameter must be a positive number');
    }

    // Get UTC time and convert to EST
    const now = Date.now();
    const estNow = new Date(now - (4 * 60 * 60 * 1000)); // UTC-4 for EST
    const estCutoff = new Date(estNow.getTime() - hours * 60 * 60 * 1000);

    // Format date as YYYY-MM-DD
    const from = formatDate(estCutoff);
    const to = formatDate(estNow);
    
    // Get data from FMP
    const url = `/stable/historical-chart/1hour?symbol=${symbol}&from=${from}&to=${to}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const estNowStr = formatDateTimeEST(estNow);
    const estCutoffStr = formatDateTimeEST(estCutoff);

    // Filter data according to N hours in EST
    const filtered = data.filter(item => {
        return item.date >= estCutoffStr && item.date <= estNowStr;
    });

    // Sort ascending (oldest to newest)
    filtered.sort((a, b) => {
        const aTime = new Date(a.date.replace(' ', 'T') + '-04:00').getTime();
        const bTime = new Date(b.date.replace(' ', 'T') + '-04:00').getTime();
        return aTime - bTime;
    });

    return filtered;
}




