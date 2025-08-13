import { getEconomicCalendarByDays, getRandomEconomicCalendarRecords } from '../../services/fmpService/macroIndicators.js'

// Controller: records of the given days
export const economicCalendarByDays = async (req, res) => {
    try {
        const days = parseInt(req.query.days, 10)
        if (isNaN(days) || days <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid query parameter: days must be a positive number',
                error: 'Invalid parameter: days',
                data: null
            })
        }

        const data = await getEconomicCalendarByDays(days)
        return res.status(200).json({
            success: true,
            message: 'Successfully retrieved economic calendar records',
            data
        })
    } catch (error) {
        console.error('❌ Controller Error - Economic Calendar By Days:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch economic calendar records',
            error: error.message,
            data: null
        })
    }
}

// Controller: random records within the given days
export const randomEconomicCalendarRecords = async (req, res) => {
    try {
        const days = parseInt(req.query.days, 10)
        const count = parseInt(req.query.count || req.query.limit, 10)

        if (isNaN(days) || days <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid query parameter: days must be a positive number',
                error: 'Invalid parameter: days',
                data: null
            })
        }

        if (isNaN(count) || count <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid query parameter: count must be a positive number',
                error: 'Invalid parameter: count',
                data: null
            })
        }

        const data = await getRandomEconomicCalendarRecords(days, count)
        return res.status(200).json({
            success: true,
            message: 'Successfully retrieved random economic calendar records',
            data
        })
    } catch (error) {
        console.error('❌ Controller Error - Random Economic Calendar Records:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch random economic calendar records',
            error: error.message,
            data: null
        })
    }
}

