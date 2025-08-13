import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { getTodayDate } from '../../utils/DateUtils.js';
import { trustedSites } from '../../utils/trustedSites.js';
import { calculateDateRange } from '../../utils/calculateDateRange.js'

/**
 * Fetches today's major financial headlines from trusted news sources
 * @function getTodayMajorFinancialHeadlines
 * @returns {Promise<Array>} Array of financial news headlines filtered by trusted sites
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const headlines = await getTodayMajorFinancialHeadlines();
 * // Returns: [{ title: "...", site: "reuters.com", ... }, ...]
 */
export const getTodayMajorFinancialHeadlines = async () => {
    const todayDate = getTodayDate();
    const url = `/stable/news/general-latest?from=${todayDate}&to=${todayDate}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const filteredByTrustedSites = response.data.filter(item => trustedSites.includes(item.site) )

    return filteredByTrustedSites;
}

/**
 * Fetches five random major financial headlines from today's trusted news sources
 * @function getFiveRandomTodayMajorFinancialHeadlines
 * @returns {Promise<Array>} Array of 5 randomly selected financial news headlines
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const headlines = await getFiveRandomTodayMajorFinancialHeadlines();
 * // Returns: [{ title: "...", site: "reuters.com", ... }, ...] (5 items)
 */
export const getFiveRandomTodayMajorFinancialHeadlines = async () => {
    const todayDate = getTodayDate();
    const url = `/stable/news/general-latest?from=${todayDate}&to=${todayDate}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const filteredByTrustedSites = response.data.filter(item => trustedSites.includes(item.site) )
    const randomFive = filteredByTrustedSites.sort(() => Math.random() - 0.5).slice(0, 5);

    return randomFive;
}

/**
 * Fetches one random major financial headline from today's trusted news sources
 * @function getOneRandomTodayMajorFinancialHeadlines
 * @returns {Promise<Array>} Array containing 1 randomly selected financial news headline
 * @throws {Error} When API call fails or response is invalid
 * @example
 * const headlines = await getOneRandomTodayMajorFinancialHeadlines();
 * // Returns: [{ title: "...", site: "reuters.com", ... }] (1 item)
 */
export const getOneRandomTodayMajorFinancialHeadlines = async () => {
    const todayDate = getTodayDate();
    const url = `/stable/news/general-latest?from=${todayDate}&to=${todayDate}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const filteredByTrustedSites = response.data.filter(item => trustedSites.includes(item.site) )
    const randomOne = filteredByTrustedSites.sort(() => Math.random() - 0.5).slice(0, 1);

    return randomOne;
}

/**
 * Fetches FMP Articles within the last N days
 * @param {number} days
 * @returns {Promise<Array>}
 */
export const getFmpArticlesByDays = async (days) => {
    const { from, to } = calculateDateRange(days)
    const page = 0
    const limit = 200
    const url = `/stable/fmp-articles?page=${page}&limit=${limit}&apikey=${FMP_API_KEY}`
    const response = await apiClient.get(url)

    const fromTs = `${from} 00:00:00`
    const toTs = `${to} 23:59:59`
    const filtered = Array.isArray(response.data)
        ? response.data.filter(item => item.date >= fromTs && item.date <= toTs)
        : []

    return filtered
}

/**
 * Fetches random FMP Articles within the last N days
 * @param {number} days
 * @param {number} count
 * @returns {Promise<Array>}
 */
export const getRandomFmpArticlesByDays = async (days, count) => {
    const all = await getFmpArticlesByDays(days)
    if (!Array.isArray(all) || all.length === 0) return []
    return all.slice().sort(() => Math.random() - 0.5).slice(0, count)
}