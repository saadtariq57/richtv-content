import express from 'express'
import { 
  analystPriceTarget, 
  analystRatings, 
  latestAnalystPriceTarget, 
  latestAnalystRatingsNews, 
  randomAnalystPriceTarget, 
  randomLatestAnalystPriceTarget, 
  randomLatestAnalystRatingsNews,
  stocksAnalysis,
  futuresAnalysis,
  fundamentalAnalysis,
  technicalAnalysis,
  allStockAnalysis,
  availableCategories
} from '../../controllers/stocks/stockAnalysis.controller.js'

const router = express.Router()

router.get('/', analystPriceTarget)
router.get('/random', randomAnalystPriceTarget)
router.get('/latest', latestAnalystPriceTarget)
router.get('/random-latest', randomLatestAnalystPriceTarget)
router.get('/ratings', analystRatings)
router.get('/ratings-news', latestAnalystRatingsNews)
router.get('/ratings-news-random', randomLatestAnalystRatingsNews)

// RSS Feed Stock Analysis Routes
router.get('/analysis/categories', availableCategories)
router.get('/analysis/stocks', stocksAnalysis)
router.get('/analysis/futures', futuresAnalysis)
router.get('/analysis/fundamental', fundamentalAnalysis)
router.get('/analysis/technical', technicalAnalysis)
// router.get('/analysis/', allStockAnalysis)

export const stockAnalysisRoutes = router
