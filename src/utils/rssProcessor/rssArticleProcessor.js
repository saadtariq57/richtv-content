import { getLatestArticles, getRandomArticle } from './rssProcessor.js';
import { scrapeArticleHTML } from '../scraping/staticHtml/htmlScraper.js';
import { convertHTMLToMarkdown } from '../scraping/staticHtml/htmlToMarkdown.js';

/**
 * Scrapes the latest articles from RSS feed and converts them to markdown
 * @param {string} feedUrl - The RSS feed URL.
 * @param {number} maxArticles - Number of latest articles to fetch and scrape.
 * @param {object} markdownOptions - Options for markdown conversion.
 * @returns {Promise<object>} - Object with articles, markdown content, and feedInfo.
 */
async function scrapeLatestArticles(feedUrl, maxArticles = 5, markdownOptions = {}) {
  const rssResult = await getLatestArticles(feedUrl, maxArticles);
  const processedArticles = [];

  // Process each article
  for (let i = 0; i < rssResult.articles.length; i++) {
    const article = rssResult.articles[i];

    try {
      // Scrape the article HTML
      const scrapedArticle = await scrapeArticleHTML(article.link);

      if (!scrapedArticle.success) {
        processedArticles.push({
          ...article,
          markdown: null,
          scrapeSuccess: false,
          scrapeError: scrapedArticle.error
        });
        continue;
      }

      // Convert to markdown
      const markdownResult = await convertHTMLToMarkdown(scrapedArticle.htmlContent, article.link, markdownOptions);

      if (!markdownResult.success) {
        processedArticles.push({
          ...article,
          markdown: null,
          scrapeSuccess: true,
          markdownSuccess: false,
          markdownError: markdownResult.error
        });
        continue;
      }

      // Add markdown content to article
      processedArticles.push({
        ...article,
        markdown: markdownResult.markdown,
        scrapeSuccess: true,
        markdownSuccess: true
      });

    } catch (error) {
      processedArticles.push({
        ...article,
        markdown: null,
        scrapeSuccess: false,
        markdownSuccess: false,
        error: error.message
      });
    }
  }

  const successfulConversions = processedArticles.filter(article => article.markdownSuccess).length;

  return {
    articles: processedArticles,
    feedInfo: rssResult.feedInfo,
    summary: {
      totalArticles: processedArticles.length,
      successfulConversions,
      failedConversions: processedArticles.length - successfulConversions
    }
  };
}

/**
 * Scrapes a random article from RSS feed and converts it to markdown
 * @param {string} feedUrl - The RSS feed URL.
 * @param {object} markdownOptions - Options for markdown conversion.
 * @returns {Promise<object>} - Object with article, markdown content, and feedInfo.
 */
async function scrapeRandomArticle(feedUrl, markdownOptions = {}) {
  // Fetch a random article
  const randomResult = await getRandomArticle(feedUrl);
  const article = randomResult.article;

  // Scrape the article HTML
  const scrapedArticle = await scrapeArticleHTML(article.link);

  if (!scrapedArticle.success) {
    throw new Error(`Failed to scrape article: ${scrapedArticle.error}`);
  }

  // Convert to markdown
  const markdownResult = await convertHTMLToMarkdown(scrapedArticle.htmlContent, article.link, markdownOptions);

  if (!markdownResult.success) {
    throw new Error(`Failed to convert to markdown: ${markdownResult.error}`);
  }

  return {
    article: {
      ...article,
      markdown: markdownResult.markdown
    },
    feedInfo: randomResult.feedInfo
  };
}

export {
  scrapeLatestArticles,
  scrapeRandomArticle
};