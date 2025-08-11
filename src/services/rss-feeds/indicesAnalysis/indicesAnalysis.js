import { scrapeRandomArticle } from "../../../utils/rssProcessor/rssArticleProcessor.js";

// RSS Feed URL for indices analysis
const RSS_FEEDS = {
  INDICES: 'https://www.investing.com/rss/stock_Indices.rss'
};

/**
 * Get a random Indices Analysis article from Investing.com indices RSS feed
 * @returns {Promise<Object>} Article object with title, content, author, markdown, etc.
 */
async function getRandomIndicesAnalysis() {
  try {
    const { article, feedInfo } = await scrapeRandomArticle(RSS_FEEDS.INDICES);
    
    return {
      title: article.title,
      publishedDate: article.publishedDate,
      author: article.author,
      link: article.link,
      description: article.description,
      markdown: article.markdown,
      type: 'Indices Analysis',
      feedInfo
    };
  } catch (error) {
    console.error('❌ Error fetching random Indices Analysis:', error.message);
    throw error;
  }
}

export {
  getRandomIndicesAnalysis,
  RSS_FEEDS
};
