import { 
    getRealTimeIndexQuote,  
    getIndexHistoricalDailyPrices,
    getIndexHistoricalByHours
} from '../../services/fmpService/indices.js'

// Controller to get real-time quote for a specific index
export const realTimeIndexQuote = async (req, res) => {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol is required',
                error: 'Missing required parameter: symbol',
                data: null
            });
        }
        const data = await getRealTimeIndexQuote(symbol);
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved real-time index quote',
            data: data
        });
    } catch (error) {
        console.error('❌ Controller Error - Real Time Index Quote:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch real-time index quote',
            error: error.message,
            data: null
        });
    }
}

// Controller to get index historical daily prices (by days or by date range)
export const indexHistoricalDataByDays = async (req, res) => {
    try {
        const { symbol, days, from, to } = req.query;
        
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol is required',
                error: 'Missing required parameter: symbol',
                data: null
            });
        }
        
        if (!days && !(from && to)) {
            return res.status(400).json({
                success: false,
                message: 'Either days or from/to date range is required',
                error: 'Missing required parameters: days or from/to',
                data: null
            });
        }
        
        const data = await getIndexHistoricalDailyPrices(symbol, days, from, to);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({
                success: false,
                message: 'No historical data found for the given parameters',
                error: 'No data available',
                data: null
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved index historical daily prices',
            data: data
        });
    } catch (error) {
        console.error('❌ Controller Error - Index Historical Data By Days:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch index historical daily prices',
            error: error.message,
            data: null
        });
    }
}

// Controller to get index historical data by hours
export const indexHistoricalDataByHours = async (req, res) => {
    try {
        const { symbol, hours } = req.query;
        
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol is required',
                error: 'Missing required parameter: symbol',
                data: null
            });
        }
        
        if (!hours) {
            return res.status(400).json({
                success: false,
                message: 'Hours parameter is required',
                error: 'Missing required parameter: hours',
                data: null
            });
        }
        
        const hoursNum = parseInt(hours, 10);
        if (isNaN(hoursNum) || hoursNum <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Hours must be a positive number',
                error: 'Invalid hours parameter',
                data: null
            });
        }
        
        const data = await getIndexHistoricalByHours(symbol, hoursNum);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({
                success: false,
                message: 'No historical data found for the given parameters',
                error: 'No data available',
                data: null
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved index historical data by hours',
            data: data
        });
    } catch (error) {
        console.error('❌ Controller Error - Index Historical Data By Hours:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch index historical data by hours',
            error: error.message,
            data: null
        });
    }
}
