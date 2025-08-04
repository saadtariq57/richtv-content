import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'
import { formatDate, formatDateTimeEST } from '../../utils/DateUtils.js';

/**
 * Fetches real-time quotes for all available commodities
 * @function getRealTimeAllCommoditiesQuote
 * @returns {Promise<Array>} Array of real-time commodity quotes
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const commodities = await getRealTimeAllCommoditiesQuote();
 * // Returns: [{ symbol: 'GCUSD', price: 2000, change: 1.5, ... }, ...]
 */
export const getRealTimeAllCommoditiesQuote = async () => {
    const response = await apiClient.get(`/api/v3/quotes/commodity?apikey=${FMP_API_KEY}`);
    return response.data;
}

/**
 * Fetches real-time quote for a specific commodity
 * @function getRealTimeCommodityQuote
 * @param {string} symbol - The commodity symbol (e.g., 'GCUSD' for Gold, 'CLUSD' for Crude Oil)
 * @returns {Promise<Object>} Real-time commodity quote data
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const quote = await getRealTimeCommodityQuote('GCUSD');
 * // Returns: { symbol: 'GCUSD', price: 2000, change: 1.5, ... }
 */
export const getRealTimeCommodityQuote = async (symbol) => {
    const response = await apiClient.get(`/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`);
    return response.data;
}

/**
 * Fetches historical daily price data for a commodity
 * @function getCommodityHistoricalDailyPrices
 * @param {string} symbol - The commodity symbol (e.g., 'GCUSD', 'CLUSD')
 * @param {number} [days] - Number of days to fetch (if provided, overrides from/to)
 * @param {string} [from] - Start date in YYYY-MM-DD format
 * @param {string} [to] - End date in YYYY-MM-DD format
 * @returns {Promise<Object>} Historical daily price data object
 * @throws {Error} When API call fails or parameters are invalid
 * @example
 * const prices = await getCommodityHistoricalDailyPrices('GCUSD', 30);
 * // Returns: { symbol: 'GCUSD', historical: [{ date: '2024-01-01', open: 2000, close: 2010, ... }, ...] }
 */
export const getCommodityHistoricalDailyPrices = async (symbol, days, from, to) => {
    let url = `/api/v3/historical-price-full/${symbol}?apikey=${FMP_API_KEY}`
   
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
 * Fetches historical hourly data for a commodity in EST timezone
 * @function getCommodityHistoricalByHours
 * @param {string} symbol - The commodity symbol (e.g., 'GCUSD', 'CLUSD')
 * @param {number} hours - Number of hours to fetch (must be positive)
 * @returns {Promise<Array>} Array of historical hourly data filtered by EST timezone
 * @throws {Error} When hours parameter is invalid or API call fails
 * @example
 * const hourlyData = await getCommodityHistoricalByHours('GCUSD', 24);
 * // Returns: [{ date: '2024-01-01 10:00:00', open: 2000, close: 2010, ... }, ...]
 */
export const getCommodityHistoricalByHours = async (symbol, hours) => {
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


