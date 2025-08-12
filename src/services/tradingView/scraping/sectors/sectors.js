import { load as cheerioLoad } from 'cheerio'

const SOURCE_URL = 'https://www.tradingview.com/markets/stocks-usa/sectorandindustry-sector/'

/**
 * Fetch raw HTML from TradingView with realistic headers
 */
const fetchHtml = async () => {
  const response = await fetch(SOURCE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Referer': 'https://www.tradingview.com/',
    },
  })
  if (!response.ok) {
    throw new Error(`TradingView fetch failed with status ${response.status}`)
  }
  return await response.text()
}

/**
 * Parse the embedded sectors array from HTML
 */
const parseSectorsArray = (html) => {
  // load once to satisfy cheerio requirement (even though we extract via string)
  cheerioLoad(html)

  const anchor = '"data":{"screener":{"data":{"data":'
  const anchorIndex = html.indexOf(anchor)
  if (anchorIndex === -1) {
    throw new Error('Sectors anchor not found in HTML')
  }

  const startIndex = html.indexOf('[', anchorIndex)
  const endMarker = '],"totalCount"'
  const endIndex = html.indexOf(endMarker, startIndex)
  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Failed to locate sectors array bounds in HTML')
  }

  const arrayJson = html.slice(startIndex, endIndex + 1)

  const parsed = JSON.parse(arrayJson)
  if (!Array.isArray(parsed)) {
    throw new Error('Parsed sectors payload is not an array')
  }
  return parsed
}

/**
 * Convert TradingView row into an API-friendly object
 */
const toSectorApi = (row) => {
  const d = row.d
  return {
    id: row.s, // e.g., SECTOR_US:TECHNOLOGY.SERVICES
    name: String(d[0]),
    screener: String(d[1]),
    marketCapUsd: Number(d[2]),
    type: d[3],
    currency: d[5],
    dividendYieldPct: Number(d[6]), // already in percentage terms (e.g., 0.5 -> 0.50%)
    changePct: Number(d[7]),
    volume: Number(d[8]),
    industriesCount: Number(d[9]),
    stocksCount: Number(d[10]),
  }
}

// Simple in-memory cache to reduce repeated network calls
let cached = { time: 0, data: null }
const CACHE_TTL_MS = 60 * 1000 // 1 minute

export const getAllSectorsFromTradingView = async () => {
  const now = Date.now()
  if (cached.data && now - cached.time < CACHE_TTL_MS) {
    return cached.data
  }

  const html = await fetchHtml()
  const rows = parseSectorsArray(html)
  // Sort by market cap desc to match UI
  rows.sort((a, b) => Number(b.d[2]) - Number(a.d[2]))
  const sectors = rows.map(toSectorApi)

  const payload = {
    sourceUrl: SOURCE_URL,
    asOf: new Date().toISOString(),
    count: sectors.length,
    sectors,
  }

  cached = { time: now, data: payload }
  return payload
}

export const getSectorByIdFromTradingView = async (sectorId) => {
  if (!sectorId || typeof sectorId !== 'string') {
    throw new Error('sectorId is required')
  }
  const all = await getAllSectorsFromTradingView()
  const found = all.sectors.find((s) => s.id === sectorId)
  return found || null
}

