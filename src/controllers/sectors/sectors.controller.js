import { getSectorsHistoricalPerformanceByDays } from '../../services/fmpService/sectors/sectors.js'

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
