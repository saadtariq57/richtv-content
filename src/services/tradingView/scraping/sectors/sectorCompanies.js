import { load as cheerioLoad } from 'cheerio'

const BASE_URL = 'https://www.tradingview.com/markets/stocks-usa/sectorandindustry-sector'

const buildSectorUrl = (slug) => `${BASE_URL}/${encodeURIComponent(slug)}/`

const fetchHtml = async (slug) => {
  const url = buildSectorUrl(slug)
  const response = await fetch(url, {
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
    throw new Error(`TradingView sector page fetch failed (${response.status}) for slug ${slug}`)
  }
  const html = await response.text()
  return { url, html }
}

const parseCompaniesArray = (html) => {
  // Satisfy cheerio requirement while extracting via reliable string markers
  cheerioLoad(html)
  const anchor = '"data":{"screener":{"data":{"data":'
  const anchorIndex = html.indexOf(anchor)
  if (anchorIndex === -1) {
    throw new Error('Companies data anchor not found in HTML')
  }
  const startIndex = html.indexOf('[', anchorIndex)
  const endMarker = '],"totalCount"'
  const endIndex = html.indexOf(endMarker, startIndex)
  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Failed to bound companies array')
  }
  const arrayJson = html.slice(startIndex, endIndex + 1)
  const parsed = JSON.parse(arrayJson)
  if (!Array.isArray(parsed)) {
    throw new Error('Parsed companies payload is not an array')
  }
  return parsed
}

const getNumber = (arr, idx) => {
  const v = arr[idx]
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

const toCompanyApi = (row) => {
  const d = row.d
  return {
    id: row.s, // e.g., NASDAQ:MSFT
    symbol: String(d[0] ?? ''),
    name: String(d[1] ?? ''),
    price: getNumber(d, 6),
    currency: d[11] ?? null,
    changePct: getNumber(d, 12),
    volume: getNumber(d, 13),
    marketCap: getNumber(d, 14), // currency likely in d[15]
    marketCapCurrency: d[15] ?? 'USD',
    peRatio: getNumber(d, 16),
    epsDiluted: getNumber(d, 17),
    epsDilutedGrowthPct: getNumber(d, 18),
    dividendYieldPct: getNumber(d, 19),
    analystRatingText: typeof d[20] === 'string' ? d[20] : null, // e.g., "Strong buy"
    analystRatingCode: typeof d[21] === 'string' ? d[21] : null, // e.g., "StrongBuy"
    analystRatingScore: getNumber(d, 22), // numeric score used internally by TV
    // The rest of columns vary; keep core metrics stable for now
  }
}

// In-memory cache by slug
const cache = new Map() // slug -> { time, data }
const CACHE_TTL_MS = 60 * 1000

export const getCompaniesBySectorSlugFromTradingView = async (slug) => {
  if (!slug || typeof slug !== 'string') {
    throw new Error('slug is required')
  }
  const cached = cache.get(slug)
  const now = Date.now()
  if (cached && now - cached.time < CACHE_TTL_MS) {
    return cached.data
  }

  const { url, html } = await fetchHtml(slug)
  const rows = parseCompaniesArray(html)
  // Sort by market cap desc
  rows.sort((a, b) => getNumber(b.d, 14) - getNumber(a.d, 14))
  const companies = rows.map(toCompanyApi)
  const payload = {
    sourceUrl: url,
    sectorSlug: slug,
    asOf: new Date().toISOString(),
    count: companies.length,
    companies,
  }
  cache.set(slug, { time: now, data: payload })
  return payload
}

export const getCompanyInSectorFromTradingView = async (slug, symbolOrId) => {
  const all = await getCompaniesBySectorSlugFromTradingView(slug)
  const target = String(symbolOrId).toUpperCase()
  const found = all.companies.find((c) => c.id.toUpperCase() === target || c.symbol.toUpperCase() === target)
  return found || null
}
