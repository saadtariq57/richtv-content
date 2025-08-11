import * as cheerio from 'cheerio';
import axios from 'axios';

async function fetchHTML(url) {
  const response = await axios.get(url);
  return response.data;
}

function extractUsefulHTMLContent(html) {
  const $ = cheerio.load(html);
  
  // Only care about useful tags
  const usefulTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'ul', 'ol', 'blockquote'];
  
  const h1 = $('h1').first();
  if (!h1.length) {
    console.log('No h1 tag found');
    return '';
  }

  console.log('Found h1:', h1.text().trim());

  // Find the main article container
  let articleContainer = null;
  
  // Look for common article containers
  const containerSelectors = [
    '.article_WYSIWYG__O0uhw',
    '.article-content',
    '.post-content',
    '.entry-content',
    '.content',
    'article'
  ];
  
  for (const selector of containerSelectors) {
    const container = $(selector);
    if (container.length > 0) {
      articleContainer = container.first();
      console.log('Found article container:', selector);
      break;
    }
  }

  // If no specific container found, use the h1's parent
  if (!articleContainer) {
    articleContainer = h1.parent();
    console.log('Using h1 parent as container');
  }

  const content = [];

  // Extract HTML content from useful tags
  articleContainer.find(usefulTags.join(',')).each((i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    
    // Skip empty or very short content
    if (text.length < 10) return;
    
    // Skip obvious boilerplate
    if (text.match(/^\s*(advertisement|subscribe|click here|share|follow|like|comment)/i)) return;
    
    // Add the HTML content
    content.push($.html(el));
  });

  const result = content.join('\n');
  console.log(`Extracted ${content.length} useful HTML elements`);
  return result;
}

async function scrapeArticleHTML(url) {
  try {
    const html = await fetchHTML(url);
    const htmlContent = extractUsefulHTMLContent(html);

    return {
      htmlContent: htmlContent,
      success: true
    };
  } catch (err) {
    console.error('❌ Error scraping article HTML:', err.message);
    return {
      htmlContent: '',
      success: false,
      error: err.message
    };
  }
}

export { scrapeArticleHTML }; 