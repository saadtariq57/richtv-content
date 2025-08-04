import {
  getTechnicalAnalysis,
  getFundamentalAnalysis,
  getMetalsAnalysis,
  getEnergyAnalysis,
  getAllCommoditiesAnalysis
} from '../../services/rss-feeds/commoditiesAnalysis/commoditiesAnalysis.js';

async function technicalAnalysis(req, res) {
  try {
    const maxArticles = parseInt(req.query.limit) || 5;
    
    if (maxArticles < 1 || maxArticles > 20) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 20',
        data: null
      });
    }

    const articles = await getTechnicalAnalysis(maxArticles);
    
    res.status(200).json({
      success: true,
      message: `Successfully retrieved ${articles.length} technical analysis articles`,
      data: {
        type: 'Technical Analysis',
        count: articles.length,
        articles: articles
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Technical Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch technical analysis articles',
      error: error.message,
      data: null
    });
  }
}

async function fundamentalAnalysis(req, res) {
  try {
    const maxArticles = parseInt(req.query.limit) || 5;
    
    if (maxArticles < 1 || maxArticles > 20) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 20',
        data: null
      });
    }

    const articles = await getFundamentalAnalysis(maxArticles);
    
    res.status(200).json({
      success: true,
      message: `Successfully retrieved ${articles.length} fundamental analysis articles`,
      data: {
        type: 'Fundamental Analysis',
        count: articles.length,
        articles: articles
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Fundamental Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fundamental analysis articles',
      error: error.message,
      data: null
    });
  }
}


async function metalsAnalysis(req, res) {
  try {
    const maxArticles = parseInt(req.query.limit) || 5;
    
    if (maxArticles < 1 || maxArticles > 20) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 20',
        data: null
      });
    }

    const articles = await getMetalsAnalysis(maxArticles);
    
    res.status(200).json({
      success: true,
      message: `Successfully retrieved ${articles.length} metals analysis articles`,
      data: {
        type: 'Metals Analysis',
        count: articles.length,
        articles: articles
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Metals Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch metals analysis articles',
      error: error.message,
      data: null
    });
  }
}

async function energyAnalysis(req, res) {
  try {
    const maxArticles = parseInt(req.query.limit) || 5;
    
    if (maxArticles < 1 || maxArticles > 20) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 20',
        data: null
      });
    }

    const articles = await getEnergyAnalysis(maxArticles);
    
    res.status(200).json({
      success: true,
      message: `Successfully retrieved ${articles.length} energy analysis articles`,
      data: {
        type: 'Energy Analysis',
        count: articles.length,
        articles: articles
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Energy Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch energy analysis articles',
      error: error.message,
      data: null
    });
  }
}

async function allCommoditiesAnalysis(req, res) {
  try {
    const maxArticlesPerFeed = parseInt(req.query.limit) || 5;
    
    if (maxArticlesPerFeed < 1 || maxArticlesPerFeed > 10) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 10 for combined analysis',
        data: null
      });
    }

    const allArticles = await getAllCommoditiesAnalysis(maxArticlesPerFeed);
    
    res.status(200).json({
      success: true,
      message: `Successfully retrieved ${allArticles.totalArticles} total articles across all categories`,
      data: {
        totalArticles: allArticles.totalArticles,
        categories: {
          technical: {
            count: allArticles.technical.length,
            articles: allArticles.technical
          },
          fundamental: {
            count: allArticles.fundamental.length,
            articles: allArticles.fundamental
          },
          metals: {
            count: allArticles.metals.length,
            articles: allArticles.metals
          },
          energy: {
            count: allArticles.energy.length,
            articles: allArticles.energy
          }
        }
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - All Commodities Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all commodities analysis articles',
      error: error.message,
      data: null
    });
  }
}


function availableCategories(req, res) {
  try {
    const categories = [
      {
        name: 'Technical Analysis',
        description: 'Market technical indicators and chart analysis',
        endpoint: '/api/commodities/technical',
        queryParams: {
          limit: 'Number of articles (1-20, default: 5)'
        }
      },
      {
        name: 'Fundamental Analysis',
        description: 'Economic and fundamental factors affecting commodities',
        endpoint: '/api/commodities/fundamental',
        queryParams: {
          limit: 'Number of articles (1-20, default: 5)'
        }
      },
      {
        name: 'Metals Analysis',
        description: 'Gold, silver, copper, and other metals market analysis',
        endpoint: '/api/commodities/metals',
        queryParams: {
          limit: 'Number of articles (1-20, default: 5)'
        }
      },
      {
        name: 'Energy Analysis',
        description: 'Oil, gas, and energy commodities analysis',
        endpoint: '/api/commodities/energy',
        queryParams: {
          limit: 'Number of articles (1-20, default: 5)'
        }
      },
      {
        name: 'All Categories',
        description: 'Get articles from all categories at once',
        endpoint: '/api/commodities/all',
        queryParams: {
          limit: 'Number of articles per category (1-10, default: 5)'
        }
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Available commodities analysis categories',
      data: {
        categories: categories,
        totalCategories: categories.length
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

export {
    technicalAnalysis,
    fundamentalAnalysis,
    metalsAnalysis,
    energyAnalysis,
    allCommoditiesAnalysis,
    availableCategories
};
