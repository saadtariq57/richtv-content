import { getSectorsHistoricalPerformanceByDays } from '../../services/fmpService/sectors/sectors.js'
import { getAllSectorsFromTradingView, getSectorByIdFromTradingView } from '../../services/tradingView/scraping/sectors/sectors.js'
import { getCompaniesBySectorSlugFromTradingView, getCompanyInSectorFromTradingView } from '../../services/tradingView/scraping/sectors/sectorCompanies.js'

// Controller: Get sectors historical performance by days
export const sectorsHistoricalByDays = async (req, res) => {
  try {
    const { days, sector } = req.query

    if (!days) {
      return res.status(400).json({
        success: false,
        message: 'Days parameter is required',
        error: 'Missing required parameter: days',
        data: null
      })
    }

    if (!sector) {
      return res.status(400).json({
        success: false,
        message: 'Sector parameter is required',
        error: 'Missing required parameter: sector',
        data: null
      })
    }

    const daysNum = parseInt(days, 10)
    if (Number.isNaN(daysNum) || daysNum <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Days must be a positive number',
        error: 'Invalid parameter: days',
        data: null
      })
    }

    const data = await getSectorsHistoricalPerformanceByDays(daysNum, sector)

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No sector historical performance found for the given parameters',
        error: 'No data available',
        data: null
      })
    }

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved sectors historical performance',
      data
    })
  } catch (error) {
    console.error('❌ Controller Error - Sectors Historical By Days:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sectors historical performance',
      error: error.message,
      data: null
    })
  }
}


// Controller: Get all current sectors from TradingView
export const sectorsAll = async (_req, res) => {
  try {
    const data = await getAllSectorsFromTradingView()
    res.status(200).json({ success: true, message: 'Sectors fetched', data })
  } catch (error) {
    console.error('❌ Controller Error - Sectors All:', error.message)
    res.status(500).json({ success: false, message: 'Failed to fetch sectors', error: error.message, data: null })
  }
}

// Controller: Get a specific sector by id from TradingView
export const sectorById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ success: false, message: 'Sector id is required', error: 'Missing id', data: null })
    }
    const sector = await getSectorByIdFromTradingView(id)
    if (!sector) {
      return res.status(404).json({ success: false, message: 'Sector not found', error: 'Not found', data: null })
    }
    res.status(200).json({ success: true, message: 'Sector fetched', data: sector })
  } catch (error) {
    console.error('❌ Controller Error - Sector By Id:', error.message)
    res.status(500).json({ success: false, message: 'Failed to fetch sector', error: error.message, data: null })
  }
}

// Controller: Get companies for a sector by slug (e.g., technology-services)
export const sectorCompaniesBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Sector slug is required', error: 'Missing slug', data: null })
    }
    const data = await getCompaniesBySectorSlugFromTradingView(slug)
    res.status(200).json({ success: true, message: 'Sector companies fetched', data })
  } catch (error) {
    console.error('❌ Controller Error - Sector Companies By Slug:', error.message)
    res.status(500).json({ success: false, message: 'Failed to fetch sector companies', error: error.message, data: null })
  }
}

// Controller: Get a specific company within a sector by slug and symbol/id
export const sectorCompanyBySlugAndId = async (req, res) => {
  try {
    const { slug, symbolOrId } = req.params
    if (!slug || !symbolOrId) {
      return res.status(400).json({ success: false, message: 'Sector slug and symbol/id are required', error: 'Missing parameters', data: null })
    }
    const company = await getCompanyInSectorFromTradingView(slug, symbolOrId)
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found in sector', error: 'Not found', data: null })
    }
    res.status(200).json({ success: true, message: 'Company fetched', data: company })
  } catch (error) {
    console.error('❌ Controller Error - Sector Company By Slug And Id:', error.message)
    res.status(500).json({ success: false, message: 'Failed to fetch company', error: error.message, data: null })
  }
}

