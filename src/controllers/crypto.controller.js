import { 
    getRealTimeCryptoQuote, 
    getCryptoHistoricalDailyPrices, 
    getCryptoHistoricalByHours 
} from '../services/fmpService/crypto.js'

// Controller to get real-time crypto data
export const realTimeCryptoQuote = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' })
        }
        const data = await getRealTimeCryptoQuote(symbol)
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch real-time crypto quote' })
    }
}

// Controller to get crypto historical daily data (by days or by date range)
export const cryptoHistoricalDataByDays = async (req, res) => {
    try {
        const { symbol, days, from, to } = req.query;
        
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }
        
        if (!days && !(from && to)) {
            return res.status(400).json({ error: 'Either days or from/to date range is required' });
        }
        
        const data = await getCryptoHistoricalDailyPrices(symbol, days, from, to);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' });
        }
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch crypto historical daily data' });
    }
}

// Controller to get crypto historical data by hours
export const cryptoHistoricalDataByHours = async (req, res) => {
    try {
        const { symbol, hours } = req.query;
        
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }
        
        if (!hours) {
            return res.status(400).json({ error: 'Hours parameter is required' });
        }
        
        const hoursNum = parseInt(hours, 10);
        if (isNaN(hoursNum) || hoursNum <= 0) {
            return res.status(400).json({ error: 'Hours must be a positive number' });
        }
        
        const data = await getCryptoHistoricalByHours(symbol, hoursNum);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' });
        }
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch crypto historical data by hours' });
    }
}
