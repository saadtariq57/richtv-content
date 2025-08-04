import { 
    getRealTimeAllCommoditiesQuote, 
    getRealTimeCommodityQuote, 
    getCommodityHistoricalDailyPrices,
    getCommodityHistoricalByHours
} from '../../services/fmpService/commodities.js'

// Controller to get real-time quotes for all commodities
export const realTimeAllCommoditiesQuote = async (req, res) => {
    try {
        const data = await getRealTimeAllCommoditiesQuote();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch real-time all commodities quote' });
    }
}

// Controller to get real-time quote for a specific commodity
export const realTimeCommodityQuote = async (req, res) => {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }
        const data = await getRealTimeCommodityQuote(symbol);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch real-time commodity quote' });
    }
}

// Controller to get commodity historical daily prices (by days or by date range)
export const commodityHistoricalDailyPrices = async (req, res) => {
    try {
        const { symbol, days, from, to } = req.query;
      
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }
        
        if (!days && !(from && to)) {
            return res.status(400).json({ error: 'Either days or from/to date range is required' });
        }
        
        const data = await getCommodityHistoricalDailyPrices(symbol, days, from, to);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' });
        }
        
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch commodity historical daily prices' });
    }
}

// Controller to get commodity historical data by hours
export const commodityHistoricalByHours = async (req, res) => {
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
        
        const data = await getCommodityHistoricalByHours(symbol, hoursNum);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' });
        }
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch commodity historical data by hours' });
    }
}


