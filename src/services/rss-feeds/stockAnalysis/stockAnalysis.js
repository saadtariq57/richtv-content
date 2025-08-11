import { scrapeRandomArticle } from '../../../utils/rssProcessor/rssArticleProcessor.js';

// RSS Feed URLs for different stock analysis types
const RSS_FEEDS = {
  STOCKS: 'https://www.investing.com/rss/stock_Stocks.rss',
  FUTURES: 'https://www.investing.com/rss/stock_Futures.rss',
  FUNDAMENTAL: 'https://www.investing.com/rss/stock_Fundamental.rss',
  TECHNICAL: 'https://www.investing.com/rss/stock_Technical.rss'
};

/**
 * Get a random Stocks Analysis article from Investing.com stocks RSS feed
 * @returns {Promise<Object>} Article object with title, content, author, markdown, etc.
 */
async function getRandomStocksAnalysis() {
  try {
    const { article, feedInfo } = await scrapeRandomArticle(RSS_FEEDS.STOCKS);
    
    return {
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      description: article.description,
      markdown: article.markdown,
      type: 'Stocks Analysis',
      feedInfo
    };
  } catch (error) {
    console.error('❌ Error fetching random Stocks Analysis:', error.message);
    throw error;
  }
}

/**
 * Get a random Futures Analysis article from Investing.com futures RSS feed
 * @returns {Promise<Object>} Article object with title, content, author, markdown, etc.
 */
async function getRandomFuturesAnalysis() {
  try {
    const { article, feedInfo } = await scrapeRandomArticle(RSS_FEEDS.FUTURES);
    
    return {
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      description: article.description,
      markdown: article.markdown,
      type: 'Futures Analysis',
      feedInfo
    };
  } catch (error) {
    console.error('❌ Error fetching random Futures Analysis:', error.message);
    throw error;
  }
}

/**
 * Get a random Fundamental Analysis article from Investing.com fundamental RSS feed
 * @returns {Promise<Object>} Article object with title, content, author, markdown, etc.
 */
async function getRandomFundamentalAnalysis() {
  try {
    const { article, feedInfo } = await scrapeRandomArticle(RSS_FEEDS.FUNDAMENTAL);
    
    return {
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      description: article.description,
      markdown: article.markdown,
      type: 'Fundamental Analysis',
      feedInfo
    };
  } catch (error) {
    console.error('❌ Error fetching random Fundamental Analysis:', error.message);
    throw error;
  }
}

/**
 * Get a random Technical Analysis article from Investing.com technical RSS feed
 * @returns {Promise<Object>} Article object with title, content, author, markdown, etc.
 */
async function getRandomTechnicalAnalysis() {
  try {
    const { article, feedInfo } = await scrapeRandomArticle(RSS_FEEDS.TECHNICAL);
    
    return {
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      description: article.description,
      markdown: article.markdown,
      type: 'Technical Analysis',
      feedInfo
    };
  } catch (error) {
    console.error('❌ Error fetching random Technical Analysis:', error.message);
    throw error;
  }
}

/**
 * Get a random stock analysis article from any of the Investing.com RSS feeds
 * @returns {Promise<Object>} Article object with title, content, author, markdown, etc.
 */
async function getRandomStockAnalysis() {
  try {
    const feeds = Object.values(RSS_FEEDS);
    const randomFeed = feeds[Math.floor(Math.random() * feeds.length)];
    
    const { article, feedInfo } = await scrapeRandomArticle(randomFeed);
    
    // Determine the type based on the feed URL
    let type = 'Stock Analysis';
    if (randomFeed.includes('Futures')) type = 'Futures Analysis';
    else if (randomFeed.includes('Fundamental')) type = 'Fundamental Analysis';
    else if (randomFeed.includes('Technical')) type = 'Technical Analysis';
    else if (randomFeed.includes('Stocks')) type = 'Stocks Analysis';
    
    return {
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      description: article.description,
      markdown: article.markdown,
      type,
      feedInfo
    };
  } catch (error) {
    console.error('❌ Error fetching random stock analysis:', error.message);
    throw error;
  }
}

export {
  getRandomStocksAnalysis,
  getRandomFuturesAnalysis,
  getRandomFundamentalAnalysis,
  getRandomTechnicalAnalysis,
  getRandomStockAnalysis,
  RSS_FEEDS
};


