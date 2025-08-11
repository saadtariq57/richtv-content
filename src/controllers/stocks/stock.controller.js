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
} from '../../services/fmpService/stocks/stocks.js'

export const realTimeStockQuote = async (req, res) => {
  try {
    const { symbol } = req.query
    if (!symbol) {
      return res.status(400).json({
        success: false,
        message: 'Symbol query parameter is required',
        error: 'Missing required parameter: symbol',
        data: null
      })
    }
    const data = await getRealTimeStockQuote(symbol)
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved real-time stock quote',
      data: data
    })
  } catch (err) {
    console.error('❌ Controller Error - Real Time Stock Quote:', err.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch real-time stock quote',
      error: err.message,
      data: null
    })
  }
}

export const stockPriceChangeByOneDay = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getStockPriceChangeByOneDay(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved stock price change by one day',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Price Change By One Day:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock price change by one day',
            error: err.message,
            data: null
        })
    }
}

export const stockPriceChangeByOneWeek = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getStockPriceChangeByOneWeek(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved stock price change by one week',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Price Change By One Week:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock price change by one week',
            error: err.message,
            data: null
        })
    }
}

export const stockPriceChangeByOneMonth = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getStockPriceChangeByOneMonth(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved stock price change by one month',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Price Change By One Month:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock price change by one month',
            error: err.message,
            data: null
        })
    }
}

export const stockPriceChangeBySixMonth = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getStockPriceChangeBySixMonth(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved stock price change by six months',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Price Change By Six Months:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock price change by six months',
            error: err.message,
            data: null
        })
    }
}

export const stockPriceChangeByOneYear = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getStockPriceChangeByOneYear(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved stock price change by one year',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Price Change By One Year:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock price change by one year',
            error: err.message,
            data: null
        })
    }
}

export const stockPriceChanges = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getStockPriceChanges(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved all stock price changes',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Price Changes:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch all stock price changes',
            error: err.message,
            data: null
        })
    }
}

export const lastHourStockData = async (req, res) => {
    try {
        const { symbol } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getLastHourStockData(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved last hour stock data',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Last Hour Stock Data:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch last hour stock data',
            error: err.message,
            data: null
        })
    }
}

export const mostActiveStocks = async (req, res) => {
    try {
        const data = await getMostActiveStocks()
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved most active stocks',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Most Active Stocks:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch most active stocks',
            error: err.message,
            data: null
        })
    }
}

export const biggestGainerStocks = async (req, res) => {
    try {
        const data = await getBiggestGainerStocks()
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved biggest gainer stocks',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Biggest Gainer Stocks:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch biggest gainer stocks',
            error: err.message,
            data: null
        })
    }
}

export const biggestLoserStocks = async (req, res) => {
    try {
        const data = await getBiggestLoserStocks()
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved biggest loser stocks',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Biggest Loser Stocks:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch biggest loser stocks',
            error: err.message,
            data: null
        })
    }
}

export const stockHistoricalDailyPrices = async (req, res) => {
    try {
        const { symbol, days, from, to } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        if (!days && !(from && to)) {
            return res.status(400).json({
                success: false,
                message: 'Either days or from/to date range is required',
                error: 'Missing required parameters: days or from/to',
                data: null
            })
        }
        const data = await getStockHistoricalDailyPrices(symbol, days, from, to)
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({
                success: false,
                message: 'No historical data found for the given parameters',
                error: 'No data available',
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved stock historical daily prices',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Historical Daily Prices:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock historical daily prices',
            error: err.message,
            data: null
        })
    }
}

export const stockHistoricalByHours = async (req, res) => {
    try {
        const { symbol, hours } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        if (!hours) {
            return res.status(400).json({
                success: false,
                message: 'Hours parameter is required',
                error: 'Missing required parameter: hours',
                data: null
            })
        }
        const hoursNum = parseInt(hours, 10)
        if (isNaN(hoursNum) || hoursNum <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Hours must be a positive number',
                error: 'Invalid hours parameter',
                data: null
            })
        }
        const data = await getStockHistoricalByHours(symbol, hours)
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({
                success: false,
                message: 'No historical data found for the given parameters',
                error: 'No data available',
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved stock historical data by hours',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Stock Historical By Hours:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock historical data by hours',
            error: err.message,
            data: null
        })
    }
} 