import express from 'express'
import { economicCalendarByDays, randomEconomicCalendarRecords, inflationWorld, inflationWorldByCountry, inflationWorldRandom, unemploymentWorld, unemploymentWorldByCountry, unemploymentWorldRandom, cblrWorld, cblrWorldByCountry, cblrWorldRandom } from '../../controllers/macroIndicators/macroIndicators.controller.js'

const router = express.Router()

// 1. Gives the records of the given days
router.get('/calendar/byDays', economicCalendarByDays)

// 2. Gives random records within the given days. Query: days, count
router.get('/calendar/random/byDays', randomEconomicCalendarRecords)

// TradingView macro indicators (World + byCountry)
router.get('/inflation/world', inflationWorld)
router.get('/inflation/world/byCountry', inflationWorldByCountry)
router.get('/inflation/world/random', inflationWorldRandom)

router.get('/unemployment/world', unemploymentWorld)
router.get('/unemployment/world/byCountry', unemploymentWorldByCountry)
router.get('/unemployment/world/random', unemploymentWorldRandom)


router.get('/central-bank-lending-rate/world', cblrWorld)
router.get('/central-bank-lending-rate/world/byCountry', cblrWorldByCountry)
router.get('/central-bank-lending-rate/world/random', cblrWorldRandom)

export const macroIndicatorsRoutes = router

