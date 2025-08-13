import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'

/**
 * Fetch economic calendar records for the last N days
 * @param {number} days - Number of days to include (inclusive of today)
 * @returns {Promise<Array>} Array of economic events
 */
export const getEconomicCalendarByDays = async (days) => {    
    const { from, to } = calculateDateRange(days)

    const url = `/stable/economic-calendar?from=${from}&to=${to}&apikey=${FMP_API_KEY}`
    const response = await apiClient.get(url)
    return response.data
}

/**
 * Fetch random economic calendar records for the last N days
 * @param {number} days - Number of days to include (inclusive of today)
 * @param {number} count - Number of random records to return
 * @returns {Promise<Array>} Array of random economic events
 */
export const getRandomEconomicCalendarRecords = async (days, count) => {
    const all = await getEconomicCalendarByDays(days)
    if (!Array.isArray(all) || all.length === 0) return []
    const shuffled = all.slice().sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}


