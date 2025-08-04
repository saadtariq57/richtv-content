import express from 'express'
import { analystPriceTarget, analystRatings, latestAnalystPriceTarget, latestAnalystRatingsNews, randomAnalystPriceTarget, randomLatestAnalystPriceTarget, randomLatestAnalystRatingsNews } from '../../controllers/stocks/analyst.controller.js'

const router = express.Router()

router.get('/', analystPriceTarget)
router.get('/random', randomAnalystPriceTarget)
router.get('/latest', latestAnalystPriceTarget)
router.get('/random-latest', randomLatestAnalystPriceTarget)
router.get('/ratings', analystRatings)
router.get('/ratings-news', latestAnalystRatingsNews)
router.get('/ratings-news-random', randomLatestAnalystRatingsNews)

export const analystRoutes = router
