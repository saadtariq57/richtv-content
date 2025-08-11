import { scrapeRandomArticle } from "../../../utils/rssProcessor/rssArticleProcessor.js";

// RSS Feed URL for crypto analysis (Cryptocurrency Opinion & Analysis)
const RSS_FEEDS = {
  CRYPTO: 'https://www.investing.com/rss/302.rss'
};

/**
 * Get a random Crypto Analysis article from Investing.com crypto RSS feed
 * @returns {Promise<Object>} Article object with title, content, author, markdown, etc.
 */
async function getRandomCryptoAnalysis() {
  try {
    const { article, feedInfo } = await scrapeRandomArticle(RSS_FEEDS.CRYPTO);
    
    return {
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      description: article.description,
      markdown: article.markdown,
      type: 'Crypto Analysis',
      feedInfo
    };
  } catch (error) {
    console.error('❌ Error fetching random Crypto Analysis:', error.message);
    throw error;
  }
}

export {
  getRandomCryptoAnalysis,
  RSS_FEEDS
};