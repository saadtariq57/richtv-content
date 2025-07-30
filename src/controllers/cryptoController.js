import { getRealTimeCryptoQuote, getCryptoHistoricalChangeByDate, getCryptoHistoricalChangeByDays, getCryptoHistoricalChangeByOneHour } from '../services/fmpService/crypto.js'

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

// Controller to get crypto price change (by days or by date range)
export const cryptoHistoricalChange = async (req, res) => {
    try {
        const { symbol, from, to, days, hours } = req.query;
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }

        if(hours && hours > 1){
            return res.status(400).json({ error: 'Only 1 hour interval is supported currently' });
        }

        let data;

        // According to our service, hours means 1-hour interval historical data
        if (hours && hours == 1) {
            data = await getCryptoHistoricalChangeByOneHour(symbol, parseInt(days, 10), from, to);
        } else if (days) {
            data = await getCryptoHistoricalChangeByDays(symbol, parseInt(days, 10));
        } else if (from && to) {
            data = await getCryptoHistoricalChangeByDate(symbol, from, to);
        } else {
            return res.status(400).json({ error: 'Either days or from/to date range is required' });
        }

        // If the service returns no data or an empty array/object, respond accordingly
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No data found for the given parameters' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch crypto historical change' });
    }
}
