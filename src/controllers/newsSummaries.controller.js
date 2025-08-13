import { getFiveRandomTodayMajorFinancialHeadlines, getOneRandomTodayMajorFinancialHeadlines, getTodayMajorFinancialHeadlines, getFmpArticlesByDays, getRandomFmpArticlesByDays } from '../services/fmpService/newsSummeries.js';

// Controller to get today's major financial news headlines
export const todayMajorFinancialHeadlines = async (req, res) => {
    try {
        const headlines = await getTodayMajorFinancialHeadlines();
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved today\'s major financial headlines',
            data: headlines
        });
    } catch (error) {
        console.error('❌ Controller Error - Today Major Financial Headlines:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch news summaries',
            error: error.message,
            data: null
        });
    }
}


// Controller to get five random today's major financial news headlines
export const fiveRandomTodayMajorFinancialHeadlines = async (req, res) => {
    try {
        const headlines = await getFiveRandomTodayMajorFinancialHeadlines();
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved five random today\'s major financial headlines',
            data: headlines
        });
    } catch (error) {
        console.error('❌ Controller Error - Five Random Today Major Financial Headlines:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch news summaries',
            error: error.message,
            data: null
        });
    }
}

// Controller to get one random today's major financial news headlines
export const oneRandomTodayMajorFinancialHeadlines = async (req, res) => {
    try {
        const headlines = await getOneRandomTodayMajorFinancialHeadlines();
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved one random today\'s major financial headline',
            data: headlines
        });
    } catch (error) {
        console.error('❌ Controller Error - One Random Today Major Financial Headlines:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch news summaries',
            error: error.message,
            data: null
        });
    }
}

// Controller: FMP Articles by given days
export const fmpArticlesByDays = async (req, res) => {
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

        const data = await getFmpArticlesByDays(days)
        return res.status(200).json({
            success: true,
            message: 'Successfully retrieved FMP articles by days',
            data
        })
    } catch (error) {
        console.error('❌ Controller Error - FMP Articles By Days:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch FMP articles by days',
            error: error.message,
            data: null
        })
    }
}

// Controller: Random FMP Articles within given days and count
export const randomFmpArticlesByDays = async (req, res) => {
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

        const data = await getRandomFmpArticlesByDays(days, count)
        return res.status(200).json({
            success: true,
            message: 'Successfully retrieved random FMP articles',
            data
        })
    } catch (error) {
        console.error('❌ Controller Error - Random FMP Articles By Days:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch random FMP articles by days',
            error: error.message,
            data: null
        })
    }
}