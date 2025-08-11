import { apiClient } from '../../../utils/apiClient.js'
import { FMP_API_KEY } from '../../../config/env.js'
import { calculateDateRange } from '../../../utils/calculateDateRange.js'

/**
 * Fetches historical sectors performance for a given number of days and sector name
 * @function getSectorsHistoricalPerformanceByDays
 * @param {number} days - Number of calendar days to include (must be positive)
 * @param {string} sector - Sector display name (e.g., Energy, Healthcare, Technology)
 * @returns {Promise<Array>} Array of { date, sector, changePercent }
 */
export const getSectorsHistoricalPerformanceByDays = async (days, sector) => {

  if (!days || Number.isNaN(Number(days)) || Number(days) <= 0) {
    throw new Error('Days parameter must be a positive number')
  }
  if (!sector || typeof sector !== 'string' || sector.trim().length === 0) {
    throw new Error('Sector parameter is required')
  }

  const { from, to } = calculateDateRange(Number(days))
  console.log('from', from)
  console.log('to', to)

  const url = `/stable/historical-sector-performance?sector=${sector}&from=${from}&to=${to}&apikey=${FMP_API_KEY}`
  console.log('url', url)
  const response = await apiClient.get(url)

  return response.data

}
