import { getFiveRandomTodayMajorFinancialHeadlines, getOneRandomTodayMajorFinancialHeadlines, getTodayMajorFinancialHeadlines } from '../services/fmpService/newsSummeries.js';

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