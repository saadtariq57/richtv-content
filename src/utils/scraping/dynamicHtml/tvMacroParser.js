import * as cheerio from 'cheerio'

const normalizeHeader = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim()

const mapHeadersToIndices = (ths, $) => {
  const map = {}
  ths.each((i, el) => {
    const key = normalizeHeader($(el).text().trim())
    map[key] = i
  })
  return map
}

const pickCell = (cells, idx) => {
  if (idx == null || idx < 0) return ''
  return cells.eq(idx).text().trim()
}

const extractFromTable = ($, table) => {
  const ths = $(table).find('thead th')
  const headerMap = ths.length ? mapHeadersToIndices(ths, $) : {}
  const rows = []
  $(table).find('tbody tr').each((_, tr) => {
    const tds = $(tr).find('td')
    const row = {
      country: pickCell(tds, headerMap['country']),
      last: pickCell(tds, headerMap['last']),
      previous: pickCell(tds, headerMap['previous']),
      observation: pickCell(tds, headerMap['observation']),
      unit: pickCell(tds, headerMap['unit']),
      frequency: pickCell(tds, headerMap['frequency']),
      nextRelease: pickCell(tds, headerMap['next release']),
      forecast: pickCell(tds, headerMap['forecast'])
    }
    if (!ths.length) {
      row.country = tds.eq(0).text().trim()
      row.last = tds.eq(1).text().trim()
      row.previous = tds.eq(2).text().trim()
      row.observation = tds.eq(3).text().trim()
      row.unit = tds.eq(4).text().trim()
      row.frequency = tds.eq(5).text().trim()
      row.nextRelease = tds.eq(6).text().trim()
      row.forecast = tds.eq(7).text().trim()
    }
    const any = Object.values(row).some(v => (v || '').length > 0)
    if (any) rows.push(row)
  })
  return rows
}

const cleanupRows = (rows) => rows.filter(r => r.country && !/Country.*Last|MoreCountry/i.test(r.country))

export const parseMacroWorldFromHtml = (html) => {
  const $ = cheerio.load(html)

  // Try real tables first
  let data = []
  $('table').each((_, table) => {
    const rows = extractFromTable($, table)
    if (rows.length) data = rows
  })

  // Fallback: regex over full body text
  if (data.length === 0) {
    const fullText = $('body').text().replace(/\s+/g, ' ').trim()
    const re = /(?:[A-Z]{2,6}IRYY)?\s*([A-Z][A-Za-z .'’-]+?)\s*(\d{1,3}(?:\.\d+)?%)\s*(\d{1,3}(?:\.\d+)?)\s*([A-Za-z]{3}\s*\d{4})\s*(Percent)\s*(Monthly|Quarterly|Yearly)\s*(?:([A-Za-z]{3}\s*\d{4})|[—-])\s*(?:((?:\d{1,3}(?:\.\d+)?)|[—-]))/g
    const rows = []
    let m
    while ((m = re.exec(fullText)) !== null) {
      const [, country, last, previous, observation, unit, frequency, nextRelease, forecast] = m
      rows.push({ country, last, previous, observation, unit, frequency, nextRelease: nextRelease || '', forecast: forecast || '' })
    }
    if (rows.length) data = rows
  }

  return cleanupRows(data)
}


