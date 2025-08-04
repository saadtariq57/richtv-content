import { processRSSFeed } from '../../../utils/rssProcessor.js';

// RSS Feed URLs for different commodities analysis types
const RSS_FEEDS = {
  TECHNICAL: 'https://www.investing.com/rss/commodities_Technical.rss',
  FUNDAMENTAL: 'https://www.investing.com/rss/commodities_Fundamental.rss',
  METALS: 'https://www.investing.com/rss/commodities_Metals.rss',
  ENERGY: 'https://www.investing.com/rss/commodities_Energy.rss'
};

/**
 * Get Technical Analysis articles from Investing.com commodities RSS feed
 * @param {number} maxArticles - Maximum number of articles to fetch (default: 5)
 * @returns {Promise<Array>} Array of article objects with title, content, author, etc.
 */
async function getTechnicalAnalysis(maxArticles = 5) {
  try {
    const articles = await processRSSFeed(RSS_FEEDS.TECHNICAL, maxArticles);
    
    return articles.map(article => ({
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      content: article.content,
      type: 'Technical Analysis'
    }));
  } catch (error) {
    console.error('❌ Error fetching Technical Analysis:', error.message);
    throw error;
  }
}

/**
 * Get Fundamental Analysis articles from Investing.com commodities RSS feed
 * @param {number} maxArticles - Maximum number of articles to fetch (default: 5)
 * @returns {Promise<Array>} Array of article objects with title, content, author, etc.
 */
async function getFundamentalAnalysis(maxArticles = 5) {
  try {
    const articles = await processRSSFeed(RSS_FEEDS.FUNDAMENTAL, maxArticles);
    
    return articles.map(article => ({
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      content: article.content,
      type: 'Fundamental Analysis'
    }));
  } catch (error) {
    console.error('❌ Error fetching Fundamental Analysis:', error.message);
    throw error;
  }
}

/**
 * Get Metals Analysis articles from Investing.com commodities RSS feed
 * @param {number} maxArticles - Maximum number of articles to fetch (default: 5)
 * @returns {Promise<Array>} Array of article objects with title, content, author, etc.
 */
async function getMetalsAnalysis(maxArticles = 5) {
  try {
    const articles = await processRSSFeed(RSS_FEEDS.METALS, maxArticles);
    
    return articles.map(article => ({
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      content: article.content,
      type: 'Metals Analysis'
    }));
  } catch (error) {
    console.error('❌ Error fetching Metals Analysis:', error.message);
    throw error;
  }
}

/**
 * Get Energy Analysis articles from Investing.com commodities RSS feed
 * @param {number} maxArticles - Maximum number of articles to fetch (default: 5)
 * @returns {Promise<Array>} Array of article objects with title, content, author, etc.
 */
async function getEnergyAnalysis(maxArticles = 5) {
  try {
    const articles = await processRSSFeed(RSS_FEEDS.ENERGY, maxArticles);
    
    return articles.map(article => ({
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      content: article.content,
      type: 'Energy Analysis'
    }));
  } catch (error) {
    console.error('❌ Error fetching Energy Analysis:', error.message);
    throw error;
  }
}

/**
 * Get all commodities analysis articles from Investing.com all RSS feeds
 * @param {number} maxArticlesPerFeed - Maximum number of articles per feed (default: 5)
 * @returns {Promise<Object>} Object containing articles from all analysis types
 */
async function getAllCommoditiesAnalysis(maxArticlesPerFeed = 5) {
  try {
    
    const [technical, fundamental, metals, energy] = await Promise.all([
      getTechnicalAnalysis(maxArticlesPerFeed),
      getFundamentalAnalysis(maxArticlesPerFeed),
      getMetalsAnalysis(maxArticlesPerFeed),
      getEnergyAnalysis(maxArticlesPerFeed)
    ]);

    return {
      technical,
      fundamental,
      metals,
      energy,
      totalArticles: technical.length + fundamental.length + metals.length + energy.length
    };
  } catch (error) {
    console.error('❌ Error fetching all commodities analysis:', error.message);
    throw error;
  }
}

export {
  getTechnicalAnalysis,
  getFundamentalAnalysis,
  getMetalsAnalysis,
  getEnergyAnalysis,
  getAllCommoditiesAnalysis,
  RSS_FEEDS
};
