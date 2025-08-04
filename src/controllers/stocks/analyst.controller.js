import { getAnalystPriceTargetNews, getAnalystsRatings, getLatestAnalystPriceTargetNews, getLatestAnalystRatingsNewsLast30Days, getRandomAnalystPriceTargetNews, getRandomLatestAnalystPriceTargetNews, getRandomLatestAnalystRatingsNewsLast30Days } from '../../services/fmpService/stocks/analyst.js'

export const analystPriceTarget = async (req, res) => {
  try {
    const { symbol } = req.query
    if (!symbol) {
      return res.status(400).json({ error: 'Symbol query parameter is required' })
    }
    const data = await getAnalystPriceTargetNews(symbol)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch analyst price target' })
  }
}

export const randomAnalystPriceTarget = async (req, res) => {
    try {
        const { symbol, count } = req.query
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol query parameter is required' })
        }
        const data = await getRandomAnalystPriceTargetNews(symbol, count)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch one random analyst price target' })
    }
}

export const latestAnalystPriceTarget = async (req, res) => {
    try {
        const data = await getLatestAnalystPriceTargetNews()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch latest analyst price target' })
    }
}


export const randomLatestAnalystPriceTarget = async (req, res) => {
    try {
        const { count } = req.query
        const data = await getRandomLatestAnalystPriceTargetNews(count)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch random latest analyst price target' })
    }
}

export const analystRatings = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getAnalystsRatings(symbol)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch analyst ratings' })
    }
}

export const latestAnalystRatingsNews = async (req, res) => {
    try {
        const data = await getLatestAnalystRatingsNewsLast30Days()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch latest analyst ratings news' })
    }
}

export const randomLatestAnalystRatingsNews = async (req, res) => {
    try {
        const data = await getRandomLatestAnalystRatingsNewsLast30Days()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch random latest analyst ratings news' })
    }
}