import Parser from 'rss-parser';

const parser = new Parser();

async function fetchRSSFeed(feedUrl, maxArticles = 5) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const articles = [];

    for (let item of feed.items.slice(0, maxArticles)) {
      const articleData = {
        title: item.title || 'Untitled',
        publishedDate: item.pubDate,
        author: item.creator || item.author || 'Unknown',
        link: item.link,
        description: item.contentSnippet || item.content || '',
        categories: item.categories || [],
        guid: item.guid || item.link
      };

      articles.push(articleData);
    }

    return {
      success: true,
      articles,
      feedInfo: {
        title: feed.title,
        description: feed.description,
        link: feed.link,
        lastBuildDate: feed.lastBuildDate,
        totalItems: feed.items.length
      }
    };
  } catch (error) {
    console.error('❌ Error processing RSS feed:', error.message);
    return {
      success: false,
      error: error.message,
      articles: [],
      feedInfo: null
    };
  }
}

export { fetchRSSFeed }; 