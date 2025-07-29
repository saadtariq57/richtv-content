import { getRealTimeStockQuote, getStockPriceChange } from '../services/fmpService/stocks.js'

export const realTimeStockData = async (req, res) => {
  try {
    const { symbol } = req.query
    const data = await getRealTimeStockQuote(symbol)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export const stockPriceChange = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getStockPriceChange(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}
