import { 
    getRealTimeStockQuote, 
    getStockPriceChanges,
    getStockPriceChangeByOneDay,
    getStockPriceChangeByOneWeek,
    getStockPriceChangeByOneMonth,
    getStockPriceChangeBySixMonth,
    getStockPriceChangeByOneYear,
    getLastHourStockData,
    getMostActiveStocks,
    getBiggestGainerStocks,
    getBiggestLoserStocks,
    getStockHistoricalDailyPrices,
    getStockHistoricalByHours
} from '../services/fmpService/stocks.js'

export const realTimeStockQuote = async (req, res) => {
  try {
    const { symbol } = req.query
    const data = await getRealTimeStockQuote(symbol)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch real-time stock quote' })
  }
}

export const stockPriceChangeByOneDay = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getStockPriceChangeByOneDay(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch stock price change by one day' })
    }
}

export const stockPriceChangeByOneWeek = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getStockPriceChangeByOneWeek(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch stock price change by one week' })
    }
}

export const stockPriceChangeByOneMonth = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getStockPriceChangeByOneMonth(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch stock price change by one month' })
    }
}

export const stockPriceChangeBySixMonth = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getStockPriceChangeBySixMonth(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch stock price change by six months' })
    }
}

export const stockPriceChangeByOneYear = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getStockPriceChangeByOneYear(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch stock price change by one year' })
    }
}

export const stockPriceChanges = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getStockPriceChanges(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch all stock price changes' })
    }
}

export const lastHourStockData = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getLastHourStockData(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch last hour stock data' })
    }
}

export const mostActiveStocks = async (req, res) => {
    try {
        const data = await getMostActiveStocks()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch most active stocks' })
    }
}

export const biggestGainerStocks = async (req, res) => {
    try {
        const data = await getBiggestGainerStocks()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch biggest gainer stocks' })
    }
}

export const biggestLoserStocks = async (req, res) => {
    try {
        const data = await getBiggestLoserStocks()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch biggest loser stocks' })
    }
}

export const stockHistoricalDailyPrices = async (req, res) => {
    try {
        const { symbol, days, from, to } = req.query
        
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' })
        }
        
        if (!days && !(from && to)) {
            return res.status(400).json({ error: 'Either days or from/to date range is required' })
        }
        
        const data = await getStockHistoricalDailyPrices(symbol, days, from, to)
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' })
        }
        
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch stock historical daily prices' })
    }
}

export const stockHistoricalByHours = async (req, res) => {
    try {
        const { symbol, hours } = req.query
        
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' })
        }
        
        if (!hours) {
            return res.status(400).json({ error: 'Hours parameter is required' })
        }
        
        const hoursNum = parseInt(hours, 10)
        if (isNaN(hoursNum) || hoursNum <= 0) {
            return res.status(400).json({ error: 'Hours must be a positive number' })
        }
        
        const data = await getStockHistoricalByHours(symbol, hoursNum)
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: 'No historical data found for the given parameters' })
        }
        
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch stock historical data by hours' })
    }
}