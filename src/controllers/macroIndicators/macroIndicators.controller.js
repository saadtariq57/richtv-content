import { getEconomicCalendarByDays, getRandomEconomicCalendarRecords } from '../../services/fmpService/macroIndicators.js'
import { getWorldIndicator, getWorldIndicatorByCountry } from '../../services/fmpService/macroIndicators.js'

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

// Generic handlers for TradingView macro indicators
const handleWorld = (indicator) => async (req, res) => {
    try {
        const data = await getWorldIndicator(indicator)
        return res.status(200).json({ success: true, message: 'OK', data })
    } catch (error) {
        console.error(`❌ Controller Error - World ${indicator}:`, error.message)
        return res.status(500).json({ success: false, message: `Failed to fetch ${indicator}`, error: error.message, data: null })
    }
}

const handleWorldByCountry = (indicator) => async (req, res) => {
    try {
        const { country } = req.query
        if (!country) {
            return res.status(400).json({ success: false, message: 'country is required', error: 'Missing country', data: null })
        }
        const data = await getWorldIndicatorByCountry(indicator, country)
        return res.status(200).json({ success: true, message: 'OK', data })
    } catch (error) {
        console.error(`❌ Controller Error - World ${indicator} by country:`, error.message)
        return res.status(500).json({ success: false, message: `Failed to fetch ${indicator} by country`, error: error.message, data: null })
    }
}

const handleWorldRandom = (indicator) => async (req, res) => {
    try {
        const data = await getWorldIndicator(indicator)
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(404).json({ success: false, message: 'No data', error: 'Empty dataset', data: null })
        }
        const random = data[Math.floor(Math.random() * data.length)]
        return res.status(200).json({ success: true, message: 'OK', data: random })
    } catch (error) {
        console.error(`❌ Controller Error - World ${indicator} random:`, error.message)
        return res.status(500).json({ success: false, message: `Failed to fetch random ${indicator}`, error: error.message, data: null })
    }
}

export const inflationWorld = handleWorld('inflation')
export const inflationWorldByCountry = handleWorldByCountry('inflation')
export const inflationWorldRandom = handleWorldRandom('inflation')

export const unemploymentWorld = handleWorld('unemployment')
export const unemploymentWorldByCountry = handleWorldByCountry('unemployment')
export const unemploymentWorldRandom = handleWorldRandom('unemployment')

export const cblrWorld = handleWorld('centralBankLendingRate')
export const cblrWorldByCountry = handleWorldByCountry('centralBankLendingRate')
export const cblrWorldRandom = handleWorldRandom('centralBankLendingRate')

