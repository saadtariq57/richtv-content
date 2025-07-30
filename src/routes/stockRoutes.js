import express from 'express'
import { realTimeStockQuote, stockPriceChangeByOneDay, stockPriceChangeByOneWeek, stockPriceChangeByOneMonth, stockPriceChangeBySixMonth, stockPriceChangeByOneYear, stockPriceChanges, lastHourStockData, mostActiveStocks, biggestGainerStocks, biggestLoserStocks, stockHistoricalDailyPrices, stockHistoricalByHours } from '../controllers/stockController.js'

const router = express.Router()

router.get('/real-time', realTimeStockQuote)
router.get('/price-change-fullSummary', stockPriceChanges)
router.get('/price-change-1year', stockPriceChangeByOneYear)
router.get('/price-change-6month', stockPriceChangeBySixMonth)
router.get('/price-change-1month', stockPriceChangeByOneMonth)
router.get('/price-change-1week', stockPriceChangeByOneWeek)
router.get('/price-change-1day', stockPriceChangeByOneDay)
router.get('/price-last-hour', lastHourStockData)

router.get('/historicalData/byDays', stockHistoricalDailyPrices)
router.get('/historicalData/byHours', stockHistoricalByHours)

router.get('/most-active-stocks', mostActiveStocks)
router.get('/biggest-gainers', biggestGainerStocks)
router.get('/biggest-losers', biggestLoserStocks)

export const stockRoutes = router
