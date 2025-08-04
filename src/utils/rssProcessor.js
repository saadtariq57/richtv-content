import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import axios from 'axios';

const parser = new Parser();

async function fetchHTML(url) {
  const response = await axios.get(url);
  return response.data;
}

function extractArticleContent(html) {
  const $ = cheerio.load(html);
  const paragraphs = [];

  $('p').each((i, el) => {
    const hasClass = $(el).attr('class');
    const text = $(el).text().trim();
    if (!hasClass && text) {
      paragraphs.push(text);
    }
  });

  return paragraphs.slice(0, 5).join('\n\n'); // First 5 clean paragraphs
}

function sanitizeFilename(title) {
  return title.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 50);
}

async function processRSSFeed(feedUrl, maxArticles = 5) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const articles = [];

    for (let item of feed.items.slice(0, maxArticles)) {
      const title = item.title || 'Untitled';
      const author = item.creator || item.author || 'Unknown';
      const publishedDate = item.pubDate;
      const link = item.link;

      console.log('\n🟦 Article:', title);
      console.log('📅 Published:', publishedDate);
      console.log('✍️ Author:', author);
      console.log('🔗 Link:', link);

      try {
        const html = await fetchHTML(link);
        const contentSnippet = extractArticleContent(html);

        const articleData = {
          title,
          publishedDate,
          author,
          link,
          content: contentSnippet,
          filename: sanitizeFilename(title) + '.txt'
        };

        articles.push(articleData);
        console.log(`✅ Processed article: ${title}`);
      } catch (err) {
        console.error('❌ Error scraping article:', err.message);
        // Still add the article with basic info even if content scraping fails
        articles.push({
          title,
          publishedDate,
          author,
          link,
          content: 'Content could not be retrieved',
          filename: sanitizeFilename(title) + '.txt'
        });
      }
    }

    return articles;
  } catch (error) {
    console.error('❌ Error processing RSS feed:', error.message);
    throw error;
  }
}

export { processRSSFeed, sanitizeFilename }; 