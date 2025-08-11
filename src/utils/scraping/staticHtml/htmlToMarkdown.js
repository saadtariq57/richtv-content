import * as cheerio from 'cheerio';

/**
 * Simple Universal HTML to Markdown Converter
 * Extracts useful content from any webpage and converts it to organized markdown
 */
function convertHTMLToMarkdown(htmlContent, url = '', options = {}) {
  if (!htmlContent || htmlContent.trim() === '') {
    return { markdown: '', success: false, error: 'Empty HTML content' };
  }

  try {
    const $ = cheerio.load(htmlContent);
    
    // Default options
    const defaultOptions = {
      includeImages: false,
      includeLinks: true,
      includeTables: true,
      includeLists: true,
      includeBlockquotes: true,
      minParagraphLength: 15,
      removeAds: true,
      removeNavigation: true,
      removeFooters: true
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    // Clean up the HTML
    cleanupHTML($, finalOptions);
    
    // Extract metadata
    const metadata = extractMetadata($, url);
    
    // Extract content
    const contentSections = extractContent($, finalOptions);
    
    // Generate markdown
    const markdown = generateMarkdown(metadata, contentSections);
    
    // Calculate statistics
    const statistics = calculateStatistics(markdown);
    
    return {
      markdown,
      success: true,
      metadata,
      sections: contentSections.length,
      statistics
    };
  } catch (error) {
    console.error('❌ Error converting HTML to Markdown:', error.message);
    return {
      markdown: '',
      success: false,
      error: error.message
    };
  }
}

/**
 * Clean up HTML by removing unwanted elements
 */
function cleanupHTML($, options) {
  const selectorsToRemove = [
    'script', 'style', 'noscript', 'iframe', 'embed', 'object', 
    'video', 'audio', 'svg', 'canvas'
  ];

  if (!options.includeImages) {
    selectorsToRemove.push('img');
  }

  if (options.removeAds) {
    selectorsToRemove.push(
      '.ad', '.advertisement', '.ads', '.ad-banner', '.advertisement-banner',
      '[class*="ad-"]', '[id*="ad-"]', '[class*="ads-"]', '[id*="ads-"]'
    );
  }

  if (options.removeNavigation) {
    selectorsToRemove.push(
      'nav', '.navigation', '.menu', '.navbar', '.nav-menu',
      '[class*="nav"]', '[class*="menu"]'
    );
  }

  if (options.removeFooters) {
    selectorsToRemove.push(
      'footer', '.footer', '.site-footer', '.page-footer',
      '[class*="footer"]'
    );
  }

  // Remove unwanted elements
  $(selectorsToRemove.join(', ')).remove();
  
  // Remove social sharing, comments, related posts
  $('.social-share, .comments, .related-posts, .sidebar, .widget').remove();
}

/**
 * Extract metadata from the page
 */
function extractMetadata($, url) {
  const metadata = {
    title: '',
    description: '',
    author: '',
    date: '',
    url: url,
    keywords: [],
    language: '',
    category: ''
  };

  // Extract title with multiple fallbacks
  metadata.title = $('title').text().trim() || 
                   $('h1').first().text().trim() ||
                   $('meta[property="og:title"]').attr('content') ||
                   $('meta[name="twitter:title"]').attr('content') || '';

  // Extract description with multiple fallbacks
  metadata.description = $('meta[name="description"]').attr('content') ||
                         $('meta[property="og:description"]').attr('content') ||
                         $('meta[name="twitter:description"]').attr('content') ||
                         $('meta[name="summary"]').attr('content') || '';

  // Extract author with multiple fallbacks
  metadata.author = $('meta[name="author"]').attr('content') ||
                    $('meta[property="article:author"]').attr('content') ||
                    $('[rel="author"]').text().trim() ||
                    $('.author').text().trim() ||
                    $('[class*="author"]').first().text().trim() || '';

  // Extract date with multiple fallbacks
  metadata.date = $('meta[property="article:published_time"]').attr('content') ||
                  $('meta[name="date"]').attr('content') ||
                  $('meta[property="article:modified_time"]').attr('content') ||
                  $('time').first().attr('datetime') ||
                  $('time').first().text().trim() || '';

  // Extract language
  metadata.language = $('html').attr('lang') || 
                     $('meta[http-equiv="content-language"]').attr('content') || '';

  // Extract category
  metadata.category = $('meta[property="article:section"]').attr('content') ||
                     $('.category').text().trim() ||
                     $('[class*="category"]').first().text().trim() || '';

  // Extract keywords
  const keywords = $('meta[name="keywords"]').attr('content');
  if (keywords) {
    metadata.keywords = keywords.split(',').map(k => k.trim());
  }

  return metadata;
}

/**
 * Extract content from various HTML elements
 */
function extractContent($, options) {
  const contentSections = [];
  
  // Find the main content container
  const $content = findMainContent($);
  
  // Extract headings
  extractHeadings($, $content, contentSections);
  
  // Extract paragraphs
  extractParagraphs($, $content, contentSections, options);
  
  // Extract lists
  if (options.includeLists) {
    extractLists($, $content, contentSections);
  }
  
  // Extract blockquotes
  if (options.includeBlockquotes) {
    extractBlockquotes($, $content, contentSections);
  }
  
  // Extract tables
  if (options.includeTables) {
    extractTables($, $content, contentSections);
  }
  
  // Sort sections by their original order
  contentSections.sort((a, b) => a.index - b.index);
  
  return contentSections;
}

/**
 * Find the main content container
 */
function findMainContent($) {
  const contentSelectors = [
    'article',
    '[role="main"]',
    '.content',
    '.post-content',
    '.entry-content',
    '.article-content',
    '.main-content',
    '.story-content',
    '.post-body',
    'main',
    '.body',
    'body'
  ];

  for (const selector of contentSelectors) {
    const $content = $(selector);
    if ($content.length > 0) {
      return $content;
    }
  }

  return $('body');
}

/**
 * Extract headings
 */
function extractHeadings($, $content, contentSections) {
  $content.find('h1, h2, h3, h4, h5, h6').each((index, element) => {
    const $heading = $(element);
    const level = parseInt(element.tagName.charAt(1));
    const text = $heading.text().trim();
    
    if (text) {
      contentSections.push({
        type: 'heading',
        level: level,
        text: text,
        index: index
      });
    }
  });
}

/**
 * Extract paragraphs
 */
function extractParagraphs($, $content, contentSections, options) {
  $content.find('p, div, section, article').each((index, element) => {
    const $element = $(element);
    const text = $element.text().trim();
    
    // Skip if it's a heading or if parent is already processed
    if (text && !$element.is('h1, h2, h3, h4, h5, h6') && 
        !$element.parents('h1, h2, h3, h4, h5, h6').length &&
        !$element.parents('ul, ol, table, blockquote').length &&
        text.length >= options.minParagraphLength) {
      
      contentSections.push({
        type: 'paragraph',
        text: text,
        index: index
      });
    }
  });
}

/**
 * Extract lists
 */
function extractLists($, $content, contentSections) {
  $content.find('ul, ol').each((index, element) => {
    const $list = $(element);
    const isOrdered = element.tagName === 'ol';
    const items = [];
    
    $list.find('li').each((itemIndex, itemElement) => {
      const $item = $(itemElement);
      const text = $item.text().trim();
      
      if (text) {
        items.push(text);
      }
    });
    
    if (items.length > 0) {
      contentSections.push({
        type: 'list',
        ordered: isOrdered,
        items: items,
        index: index
      });
    }
  });
}

/**
 * Extract blockquotes
 */
function extractBlockquotes($, $content, contentSections) {
  $content.find('blockquote').each((index, element) => {
    const $blockquote = $(element);
    const text = $blockquote.text().trim();
    
    if (text) {
      contentSections.push({
        type: 'blockquote',
        text: text,
        index: index
      });
    }
  });
}

/**
 * Extract tables
 */
function extractTables($, $content, contentSections) {
  $content.find('table').each((index, element) => {
    const $table = $(element);
    const rows = [];
    
    $table.find('tr').each((rowIndex, rowElement) => {
      const $row = $(rowElement);
      const cells = [];
      
      $row.find('td, th').each((cellIndex, cellElement) => {
        const $cell = $(cellElement);
        const text = $cell.text().trim();
        
        if (text) {
          cells.push(text);
        }
      });
      
      if (cells.length > 0) {
        rows.push(cells);
      }
    });
    
    if (rows.length > 0) {
      contentSections.push({
        type: 'table',
        rows: rows,
        index: index
      });
    }
  });
}

/**
 * Generate markdown from extracted content
 */
function generateMarkdown(metadata, contentSections) {
  let markdown = '';
  
  // Add title
  if (metadata.title) {
    markdown += `# ${metadata.title}\n\n`;
  }
  
  // Add description
  if (metadata.description) {
    markdown += `> ${metadata.description}\n\n`;
  }
  
  // Add metadata section
  const hasMetadata = metadata.author || metadata.date || metadata.url || 
                     metadata.category || metadata.keywords.length > 0;
  
  if (hasMetadata) {
    markdown += '---\n';
    if (metadata.author) markdown += `**Author:** ${metadata.author}\n`;
    if (metadata.date) markdown += `**Date:** ${metadata.date}\n`;
    if (metadata.category) markdown += `**Category:** ${metadata.category}\n`;
    if (metadata.url) markdown += `**Source:** ${metadata.url}\n`;
    if (metadata.keywords.length > 0) {
      markdown += `**Keywords:** ${metadata.keywords.join(', ')}\n`;
    }
    markdown += '---\n\n';
  }
  
  // Add content sections
  contentSections.forEach(section => {
    switch (section.type) {
      case 'heading': {
        const prefix = '#'.repeat(section.level);
        markdown += `${prefix} ${section.text}\n\n`;
        break;
      }
        
      case 'paragraph':
        const cleanText = section.text
          .replace(/\s+/g, ' ')
          .replace(/\n/g, ' ')
          .trim();
        markdown += `${cleanText}\n\n`;
        break;
        
      case 'list':
        section.items.forEach((item, index) => {
          if (section.ordered) {
            markdown += `${index + 1}. ${item}\n`;
          } else {
            markdown += `- ${item}\n`;
          }
        });
        markdown += '\n';
        break;
        
      case 'blockquote':
        markdown += `> ${section.text}\n\n`;
        break;
        
      case 'table':
        if (section.rows.length > 0) {
          markdown += '| ' + section.rows[0].join(' | ') + ' |\n';
          markdown += '| ' + section.rows[0].map(() => '---').join(' | ') + ' |\n';
          
          for (let i = 1; i < section.rows.length; i++) {
            markdown += '| ' + section.rows[i].join(' | ') + ' |\n';
          }
          markdown += '\n';
        }
        break;
    }
  });
  
  return markdown.trim();
}

/**
 * Calculate content statistics
 */
function calculateStatistics(markdown) {
  const lines = markdown.split('\n');
  const words = markdown.split(/\s+/).length;
  const characters = markdown.length;
  const headings = (markdown.match(/^#{1,6}\s/gm) || []).length;
  const lists = (markdown.match(/^[-*+]\s/gm) || []).length;
  const links = (markdown.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length;

  return {
    lines,
    words,
    characters,
    headings,
    lists,
    links
  };
}

/**
 * Sanitize filename for saving
 */
function sanitizeFilename(title) {
  return title
    .replace(/[^a-z0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .slice(0, 50);
}

export { convertHTMLToMarkdown, sanitizeFilename }; 