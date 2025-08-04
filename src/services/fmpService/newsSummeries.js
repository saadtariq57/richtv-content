import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { getTodayDate } from '../../utils/DateUtils.js';
import { trustedSites } from '../../utils/trustedSites.js';

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