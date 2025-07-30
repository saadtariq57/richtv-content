import { 
    getRealTimeIndexQuote,  
    getIndexHistoricalDailyPrices,
    getIndexHistoricalByHours
} from '../services/fmpService/indices.js'

// Controller to get real-time quote for a specific index
export const realTimeIndexQuote = async (req, res) => {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }
        const data = await getRealTimeIndexQuote(symbol);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch real-time index quote' });
    }
}

// Controller to get index historical daily prices (by days or by date range)
export const indexHistoricalDataByDays = async (req, res) => {
    try {
        const { symbol, days, from, to } = req.query;
        
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }
        
        if (!days && !(from && to)) {
            return res.status(400).json({ error: 'Either days or from/to date range is required' });
        }
        
        const data = await getIndexHistoricalDailyPrices(symbol, days, from, to);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' });
        }
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch index historical daily prices' });
    }
}

// Controller to get index historical data by hours
export const indexHistoricalDataByHours = async (req, res) => {
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
        
        const data = await getIndexHistoricalByHours(symbol, hoursNum);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' });
        }
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch index historical data by hours' });
    }
}
