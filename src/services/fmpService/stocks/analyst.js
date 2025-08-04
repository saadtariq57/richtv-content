import { apiClient } from '../../../utils/apiClient.js'
import { FMP_API_KEY } from '../../../config/env.js'

/**
 * Fetches analyst price target news for a specific stock symbol
 * @function getAnalystPriceTargetNews
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Array>} Array of analyst price target news for the specified symbol
 * @throws {Error} When symbol is missing or API call fails
 * @example
 * const news = await getAnalystPriceTargetNews('AAPL');
 * // Returns: [{ title: 'Analyst raises AAPL target to $200', symbol: 'AAPL', ... }, ...]
 */
export const getAnalystPriceTargetNews = async (symbol) => {
    if (!symbol) {
        throw new Error('Symbol is required');
    }
    const url = `/stable/price-target-news?symbol=${symbol}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    return response.data;
}

/**
 * Fetches a random selection of analyst price target news for a specific stock symbol
 * @function getRandomAnalystPriceTargetNews
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @param {number} [count=1] - The number of random news items to return (must be at least 1)
 * @returns {Promise<Array>} Array of randomly selected analyst price target news
 * @throws {Error} When symbol is missing, count is invalid, or API call fails
 * @example
 * const news = await getRandomAnalystPriceTargetNews('AAPL', 3);
 * // Returns: [{ title: 'Analyst raises AAPL target to $200', symbol: 'AAPL', ... }, ...] (3 items)
 */
export const getRandomAnalystPriceTargetNews = async (symbol, count = 1) => {
    if (!symbol) {
        throw new Error('Symbol is required');
    }
    if (count < 1) {
        throw new Error('Count must be at least 1');
    }
    const url = `/stable/price-target-news?symbol=${symbol}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    // Shuffle the array and take the first 'count' elements
    const shuffled = data.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, data.length));
}

/**
 * Fetches the most recent analyst price target updates for all stock symbols
 * @function getLatestAnalystPriceTargetNews
 * @returns {Promise<Array>} Array of the latest analyst price target news objects
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const latestNews = await getLatestAnalystPriceTargetNews();
 * // Returns: [{ title: 'Analyst raises AAPL target to $200', symbol: 'AAPL', ... }, ...]
 */
export const getLatestAnalystPriceTargetNews = async () => {
    const url = `/stable/price-target-latest-news?apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    return response.data;
}

/**
 * Fetches a random selection of the most recent analyst price target updates for all stock symbols
 * @function getRandomLatestAnalystPriceTargetNews
 * @param {number} [count=1] - The number of random analyst price target news objects to return (must be at least 1)
 * @returns {Promise<Array>} Array of randomly selected latest analyst price target news objects
 * @throws {Error} When count is invalid or API call fails
 * @example
 * const randomNews = await getRandomLatestAnalystPriceTargetNews(5);
 * // Returns: [{ title: 'Analyst raises AAPL target to $200', symbol: 'AAPL', ... }, ...] (5 items)
 */
export const getRandomLatestAnalystPriceTargetNews = async (count = 1) => {
    if (count < 1) {
        throw new Error('Count must be at least 1');
    }
    const url = `/stable/price-target-latest-news?apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    // Shuffle the array and take the first 'count' elements
    const shuffled = data.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, data.length));
}


/**
 * Fetches the latest (current month) analyst ratings for a specific stock symbol
 * @function getAnalystsRatings
 * @param {string} symbol - The stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Object of analyst ratings for the specified symbol
 * @throws {Error} When symbol is missing or API call fails
 * @example
 * const ratings = await getAnalystsRatings('AAPL');
 * // Returns: [{ rating: 'Buy', analyst: 'John Doe', ... }, ...]
 */
export const getAnalystsRatings = async (symbol) => {
    const url = `/stable/grades-historical?symbol=${symbol}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    return response.data[0];
}   

/**
 * Fetches the latest analyst ratings news and filters records to only include those from the last 30 days.
 * @function getLatestAnalystRatingsNewsLast30Days
 * @returns {Promise<Array>} Array of analyst ratings news objects from the last 30 days
 * @throws {Error} When API call fails
 * @example
 * const news = await getLatestAnalystRatingsNewsLast30Days();
 * // Returns: [{ symbol: 'PYPL', publishedDate: '2025-02-04T19:18:04.000Z', ... }, ...] (only records from last 30 days)
 */
export const getLatestAnalystRatingsNewsLast30Days = async () => {
    const url = `/stable/grades-latest-news?limit=30&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Filter records to only include those from the last 30 days
    const filtered = data.filter(item => {
        // Try to parse the date field (could be 'date' or 'publishedDate')
        const dateStr = item.date || item.publishedDate;
        if (!dateStr) return false;
        const recordDate = new Date(dateStr);
        return !isNaN(recordDate) && recordDate >= thirtyDaysAgo;
    });

    return filtered;
}


/**
 * Fetches the latest analyst ratings news from the last 30 days and returns a single random record.
 * @function getRandomLatestAnalystRatingsNewsLast30Days
 * @returns {Promise<Object|null>} A random analyst ratings news object from the last 30 days, or null if none found
 * @throws {Error} When API call fails
 * @example
 * const news = await getRandomLatestAnalystRatingsNewsLast30Days();
 * // Returns: { symbol: 'PYPL', publishedDate: '2025-02-04T19:18:04.000Z', ... }
 */
export const getRandomLatestAnalystRatingsNewsLast30Days = async () => {
    const url = `/stable/grades-latest-news?limit=30&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Filter records to only include those from the last 30 days
    const filtered = data.filter(item => {
        const dateStr = item.date || item.publishedDate;
        if (!dateStr) return false;
        const recordDate = new Date(dateStr);
        return !isNaN(recordDate) && recordDate >= thirtyDaysAgo;
    });

    if (filtered.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}

