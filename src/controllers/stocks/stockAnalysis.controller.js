import { getAnalystPriceTargetNews, getAnalystsRatings, getLatestAnalystPriceTargetNews, getLatestAnalystRatingsNewsLast30Days, getRandomAnalystPriceTargetNews, getRandomLatestAnalystPriceTargetNews, getRandomLatestAnalystRatingsNewsLast30Days } from '../../services/fmpService/stocks/analyst.js'
import {
  getRandomStocksAnalysis,
  getRandomFuturesAnalysis,
  getRandomFundamentalAnalysis,
  getRandomTechnicalAnalysis,
  getRandomStockAnalysis
} from '../../services/rss-feeds/stockAnalysis/stockAnalysis.js';

export const analystPriceTarget = async (req, res) => {
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
    const data = await getAnalystPriceTargetNews(symbol)
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved analyst price target data',
      data: data
    })
  } catch (err) {
    console.error('❌ Controller Error - Analyst Price Target:', err.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analyst price target',
      error: err.message,
      data: null
    })
  }
}

export const randomAnalystPriceTarget = async (req, res) => {
    try {
        const { symbol, count } = req.query
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Symbol query parameter is required',
                error: 'Missing required parameter: symbol',
                data: null
            })
        }
        const data = await getRandomAnalystPriceTargetNews(symbol, count)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved random analyst price target data',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Random Analyst Price Target:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch random analyst price target',
            error: err.message,
            data: null
        })
    }
}

export const latestAnalystPriceTarget = async (req, res) => {
    try {
        const data = await getLatestAnalystPriceTargetNews()
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved latest analyst price target data',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Latest Analyst Price Target:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch latest analyst price target',
            error: err.message,
            data: null
        })
    }
}


export const randomLatestAnalystPriceTarget = async (req, res) => {
    try {
        const { count } = req.query
        const data = await getRandomLatestAnalystPriceTargetNews(count)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved random latest analyst price target data',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Random Latest Analyst Price Target:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch random latest analyst price target',
            error: err.message,
            data: null
        })
    }
}

export const analystRatings = async (req, res) => {
    try {
        const { symbol } = req.query
        const data = await getAnalystsRatings(symbol)
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved analyst ratings data',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Analyst Ratings:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analyst ratings',
            error: err.message,
            data: null
        })
    }
}

export const latestAnalystRatingsNews = async (req, res) => {
    try {
        const data = await getLatestAnalystRatingsNewsLast30Days()
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved latest analyst ratings news',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Latest Analyst Ratings News:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch latest analyst ratings news',
            error: err.message,
            data: null
        })
    }
}

export const randomLatestAnalystRatingsNews = async (req, res) => {
    try {
        const data = await getRandomLatestAnalystRatingsNewsLast30Days()
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved random latest analyst ratings news',
            data: data
        })
    } catch (err) {
        console.error('❌ Controller Error - Random Latest Analyst Ratings News:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch random latest analyst ratings news',
            error: err.message,
            data: null
        })
    }
}


// =====================[ RSS Feed Stock Analysis ]=====================

export const stocksAnalysis = async (req, res) => {
  try {
    const article = await getRandomStocksAnalysis();
    
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved random stocks analysis article',
      data: {
        type: 'Stocks Analysis',
        article: article
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Stocks Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stocks analysis article',
      error: error.message,
      data: null
    });
  }
}

export const futuresAnalysis = async (req, res) => {
  try {
    const article = await getRandomFuturesAnalysis();
    
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved random futures analysis article',
      data: {
        type: 'Futures Analysis',
        article: article
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Futures Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch futures analysis article',
      error: error.message,
      data: null
    });
  }
}

export const fundamentalAnalysis = async (req, res) => {
  try {
    const article = await getRandomFundamentalAnalysis();
    
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved random fundamental analysis article',
      data: {
        type: 'Fundamental Analysis',
        article: article
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Fundamental Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fundamental analysis article',
      error: error.message,
      data: null
    });
  }
}

export const technicalAnalysis = async (req, res) => {
  try {
    const article = await getRandomTechnicalAnalysis();
    
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved random technical analysis article',
      data: {
        type: 'Technical Analysis',
        article: article
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Technical Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch technical analysis article',
      error: error.message,
      data: null
    });
  }
}

export const allStockAnalysis = async (req, res) => {
  try {
    const article = await getRandomStockAnalysis();
    
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved random stock analysis article from any category',
      data: {
        type: article.type,
        article: article
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - All Stock Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch random stock analysis article',
      error: error.message,
      data: null
    });
  }
}

export const availableCategories = (req, res) => {
  try {
    const categories = [
      {
        name: 'Stocks Analysis',
        description: 'General stock market analysis and news',
        endpoint: '/api/v1/analyst/analysis/stocks',
        queryParams: 'None - returns random article'
      },
      {
        name: 'Futures Analysis',
        description: 'Stock futures and derivatives analysis',
        endpoint: '/api/v1/analyst/analysis/futures',
        queryParams: 'None - returns random article'
      },
      {
        name: 'Fundamental Analysis',
        description: 'Company fundamentals and financial analysis',
        endpoint: '/api/v1/analyst/analysis/fundamental',
        queryParams: 'None - returns random article'
      },
      {
        name: 'Technical Analysis',
        description: 'Market technical indicators and chart analysis',
        endpoint: '/api/v1/analyst/analysis/technical',
        queryParams: 'None - returns random article'
      },
      {
        name: 'Random Category',
        description: 'Get a random article from any category',
        endpoint: '/api/v1/analyst/analysis/all',
        queryParams: 'None - returns random article from random category'
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Available stock analysis categories',
      data: {
        categories: categories,
        totalCategories: categories.length,
        note: 'All endpoints now return random articles with full markdown content'
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Categories:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get available categories',
      error: error.message,
      data: null
    });
  }
}