import { 
    getRealTimeCryptoQuote, 
    getCryptoHistoricalDailyPrices, 
    getCryptoHistoricalByHours 
} from '../../services/fmpService/crypto.js'

// Controller to get real-time crypto data
export const realTimeCryptoQuote = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getRealTimeCryptoQuote(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved real-time crypto quote',
            data: data
        })
    } catch (error) {
        console.error('❌ Controller Error - Real Time Crypto Quote:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch real-time crypto quote',
            error: error.message,
            data: null
        })
    }
}

// Controller to get crypto historical daily data (by days or by date range)
export const cryptoHistoricalDataByDays = async (req, res) => {
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
        
        const data = await getCryptoHistoricalDailyPrices(symbol, days, from, to);
        
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
            message: 'Successfully retrieved crypto historical daily data',
            data: data
        });
    } catch (error) {
        console.error('❌ Controller Error - Crypto Historical Data By Days:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch crypto historical daily data',
            error: error.message,
            data: null
        });
    }
}

// Controller to get crypto historical data by hours
export const cryptoHistoricalDataByHours = async (req, res) => {
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
        
        const data = await getCryptoHistoricalByHours(symbol, hoursNum);
        
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
            message: 'Successfully retrieved crypto historical data by hours',
            data: data
        });
    } catch (error) {
        console.error('❌ Controller Error - Crypto Historical Data By Hours:', error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch crypto historical data by hours',
            error: error.message,
            data: null
        });
    }
}
