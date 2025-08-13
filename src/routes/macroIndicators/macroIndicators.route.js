import express from 'express'
import { economicCalendarByDays, randomEconomicCalendarRecords } from '../../controllers/macroIndicators/macroIndicators.controller.js'

const router = express.Router()

// 1. Gives the records of the given days
router.get('/calendar/byDays', economicCalendarByDays)

// 2. Gives random records within the given days. Query: days, count
router.get('/calendar/random/byDays', randomEconomicCalendarRecords)

export const macroIndicatorsRoutes = router

