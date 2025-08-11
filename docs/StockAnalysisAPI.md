# Stock Analysis API Documentation

## Overview

The Stock Analysis API provides access to financial analysis articles from Investing.com RSS feeds. All endpoints now return random articles with full markdown content that has been scraped and converted from the original HTML.

## Base URL
```
http://localhost:3000/api/v1/analyst
```

## Authentication
No authentication required for these endpoints.

---

## RSS Feed Analysis Endpoints

### 1. Get Available Categories
Endpoint: GET /analysis/categories

Description: Returns information about all available stock analysis categories.

Response:
```
{
  "success": true,
  "message": "Available stock analysis categories",
  "data": {
    "categories": [
      { "name": "Stocks Analysis", "endpoint": "/api/v1/analyst/analysis/stocks" },
      { "name": "Futures Analysis", "endpoint": "/api/v1/analyst/analysis/futures" },
      { "name": "Fundamental Analysis", "endpoint": "/api/v1/analyst/analysis/fundamental" },
      { "name": "Technical Analysis", "endpoint": "/api/v1/analyst/analysis/technical" },
      { "name": "Random Category", "endpoint": "/api/v1/analyst/analysis/all" }
    ],
    "totalCategories": 5
  }
}
```

---

### 2. Get Random Stocks Analysis
Endpoint: GET /analysis/stocks

Description: Returns a random stocks analysis article with full markdown content.

Response:
```
{
  "success": true,
  "message": "Successfully retrieved random stocks analysis article",
  "data": {
    "type": "Stocks Analysis",
    "article": {
      "title": "Article Title",
      "publishedDate": "2024-01-15T10:30:00Z",
      "author": "Author Name",
      "link": "https://www.investing.com/article-url",
      "description": "Article description from RSS feed",
      "markdown": "# Full Article Title..."
    }
  }
}
```

---

### 3. Get Random Futures Analysis
Endpoint: GET /analysis/futures

Description: Returns a random futures analysis article with full markdown content.

Response: Same structure as Stocks Analysis, but with type: "Futures Analysis"

---

### 4. Get Random Fundamental Analysis
Endpoint: GET /analysis/fundamental

Description: Returns a random fundamental analysis article with full markdown content.

Response: Same structure as Stocks Analysis, but with type: "Fundamental Analysis"

---

### 5. Get Random Technical Analysis
Endpoint: GET /analysis/technical

Description: Returns a random technical analysis article with full markdown content.

Response: Same structure as Stocks Analysis, but with type: "Technical Analysis"

---

### 6. Get Random Stock Analysis (Any Category)
Endpoint: GET /analysis/all

Description: Returns a random article from any of the available categories.

Response: Same structure as other endpoints; type reflects the category.

---

## Legacy Analyst Endpoints

- GET /?symbol={symbol}
- GET /random?symbol={symbol}&count={count}
- GET /latest
- GET /random-latest?count={count}
- GET /ratings?symbol={symbol}
- GET /ratings-news
- GET /ratings-news-random

---

## Response Data Structure

Article Object
```
{
  "title": "string",
  "publishedDate": "string (ISO date)",
  "author": "string",
  "link": "string (URL)",
  "description": "string",
  "markdown": "string (full markdown content)",
  "type": "string"
}
```

---

## Usage Examples

JavaScript/Node.js
```
import axios from 'axios';

const res = await axios.get('http://localhost:3000/api/v1/analyst/analysis/stocks');
const article = res.data.data.article;
console.log(article.title);
console.log(article.markdown);
```

cURL
```
# Get random stocks analysis
curl -X GET "http://localhost:3000/api/v1/analyst/analysis/stocks"

# Get random article from any category
curl -X GET "http://localhost:3000/api/v1/analyst/analysis/all"

# Get available categories
curl -X GET "http://localhost:3000/api/v1/analyst/analysis/categories"
```

---

## Error Responses

400 Bad Request
```
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description",
  "data": null
}
```

500 Internal Server Error
```
{
  "success": false,
  "message": "Failed to fetch article",
  "error": "Error details",
  "data": null
}
``` 