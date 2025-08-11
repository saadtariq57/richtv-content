import { fetchRSSFeed } from './rssFetcher.js';

/**
 * Fetches the latest articles from the RSS feed.
 * @param {string} feedUrl - The RSS feed URL.
 * @param {number} maxArticles - Number of latest articles to fetch.
 * @returns {Promise<object>} - Object with articles and feedInfo.
 */
async function getLatestArticles(feedUrl, maxArticles = 5) {
  const rssResult = await fetchRSSFeed(feedUrl, maxArticles);

  if (!rssResult.success) {
    throw new Error(`Failed to fetch RSS feed: ${rssResult.error}`);
  }

  return {
    articles: rssResult.articles,
    feedInfo: rssResult.feedInfo
  };
}

/**
 * Fetches a random article from the RSS feed.
 * @param {string} feedUrl - The RSS feed URL.
 * @returns {Promise<object>} - Object with a single random article and feedInfo.
 */
async function getRandomArticle(feedUrl) {
  const rssResult = await fetchRSSFeed(feedUrl, 20);

  if (!rssResult.success) {
    throw new Error(`Failed to fetch RSS feed: ${rssResult.error}`);
  }

  const articles = rssResult.articles;
  if (articles.length === 0) {
    throw new Error('No articles found in the feed.');
  }

  const randomIndex = Math.floor(Math.random() * articles.length);
  const randomArticle = articles[randomIndex];

  return {
    article: randomArticle,
    feedInfo: rssResult.feedInfo
  };
}

export {
  getLatestArticles,
  getRandomArticle
}; 