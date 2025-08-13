import { chromium } from 'playwright'
import { parseMacroWorldFromHtml } from '../../utils/scraping/dynamicHtml/tvMacroParser.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'
import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'

const INDICATOR_URLS = {
  inflation: 'https://www.tradingview.com/markets/world-economy/indicators/inflation-rate/?market=Worldwide',
  unemployment: 'https://www.tradingview.com/markets/world-economy/indicators/unemployment-rate/?market=Worldwide',
  centralBankLendingRate: 'https://www.tradingview.com/markets/world-economy/indicators/central-bank-lending-rate/?market=Worldwide'
}

async function fetchWorldIndicator(url) {
  const browser = await chromium.launch({ headless: true })
  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      locale: 'en-US',
      extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' }
    })
    const page = await context.newPage()
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
    const html = await page.content()
    const rows = parseMacroWorldFromHtml(html)
    return rows
  } finally {
    await browser.close()
  }
}

export const getWorldIndicator = async (indicator) => {
  const url = INDICATOR_URLS[indicator]
  if (!url) throw new Error('Unsupported indicator')
  return await fetchWorldIndicator(url)
}

export const getWorldIndicatorByCountry = async (indicator, country) => {
  const rows = await getWorldIndicator(indicator)
  const lower = country.trim().toLowerCase()
  return rows.filter(r => (r.country || '').toLowerCase().includes(lower))
}

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


