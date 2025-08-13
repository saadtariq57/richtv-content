import express from 'express'
import { fiveRandomTodayMajorFinancialHeadlines, oneRandomTodayMajorFinancialHeadlines, todayMajorFinancialHeadlines, fmpArticlesByDays, randomFmpArticlesByDays } from '../controllers/newsSummaries.controller.js'

const router = express.Router()

router.get('/major-financial-headlines', todayMajorFinancialHeadlines)

router.get('/five-random-major-financial-headlines', fiveRandomTodayMajorFinancialHeadlines)

router.get('/one-random-major-financial-headlines', oneRandomTodayMajorFinancialHeadlines)

// FMP Articles
router.get('/fmp-articles/byDays', fmpArticlesByDays)
router.get('/fmp-articles/random/byDays', randomFmpArticlesByDays)

export const newsSummariesRoutes = router
