import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'
import { formatDate, formatDateTimeEST } from '../../utils/DateUtils.js';

/**
 * Fetches real-time cryptocurrency quote data
 * @function getRealTimeCryptoQuote
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'BTCUSD', 'ETHUSD')
 * @returns {Promise<Object>} Real-time cryptocurrency quote data
 * @throws {Error} When API call fails or symbol is invalid
 * @example
 * const quote = await getRealTimeCryptoQuote('BTCUSD');
 * // Returns: { symbol: 'BTCUSD', price: 45000, change: 2.5, ... }
 */
export const getRealTimeCryptoQuote = async (symbol) => {
    const response = await apiClient.get(`/stable/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    return response.data
}

/**
 * Fetches historical daily price data for a cryptocurrency
 * @function getCryptoHistoricalDailyPrices
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'BTCUSD', 'ETHUSD')
 * @param {number} [days] - Number of days to fetch (if provided, overrides from/to)
 * @param {string} [from] - Start date in YYYY-MM-DD format
 * @param {string} [to] - End date in YYYY-MM-DD format
 * @returns {Promise<Array>} Array of historical daily price data
 * @throws {Error} When API call fails or parameters are invalid
 * @example
 * const prices = await getCryptoHistoricalDailyPrices('BTCUSD', 30);
 * // Returns: [{ date: '2024-01-01', open: 45000, close: 46000, ... }, ...]
 */
export const getCryptoHistoricalDailyPrices = async (symbol, days, from, to) => {
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
 * Fetches historical hourly data for a cryptocurrency in EST timezone
 * @function getCryptoHistoricalByHours
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'BTCUSD', 'ETHUSD')
 * @param {number} hours - Number of hours to fetch (must be positive)
 * @returns {Promise<Array>} Array of historical hourly data filtered by EST timezone
 * @throws {Error} When hours parameter is invalid or API call fails
 * @example
 * const hourlyData = await getCryptoHistoricalByHours('BTCUSD', 24);
 * // Returns: [{ date: '2024-01-01 10:00:00', open: 45000, close: 45100, ... }, ...]
 */
export const getCryptoHistoricalByHours = async (symbol, hours) => {
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