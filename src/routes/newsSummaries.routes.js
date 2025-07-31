import express from 'express'
import { fiveRandomTodayMajorFinancialHeadlines, oneRandomTodayMajorFinancialHeadlines, todayMajorFinancialHeadlines } from '../controllers/newsSummaries.controller.js'

const router = express.Router()

router.get('/major-financial-headlines', todayMajorFinancialHeadlines)

router.get('/five-random-major-financial-headlines', fiveRandomTodayMajorFinancialHeadlines)

router.get('/one-random-major-financial-headlines', oneRandomTodayMajorFinancialHeadlines)

export const newsSummariesRoutes = router
