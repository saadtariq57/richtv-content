import express from 'express'
import { 
    realTimeAllCommoditiesQuote, 
    realTimeCommodityQuote, 
    commodityHistoricalDailyPrices,
    commodityHistoricalByHours
} from '../../controllers/commodities/commodities.controller.js'

const router = express.Router()

// Get real-time quotes for all commodities
router.get('/real-time-all', realTimeAllCommoditiesQuote)

// Get real-time quote for a specific commodity (by symbol)
router.get('/real-time', realTimeCommodityQuote)

// Get historical daily prices for a commodity (by days or by date range)
router.get('/historicalData/byDays', commodityHistoricalDailyPrices)

// Get historical hourly data for a commodity
router.get('/historicalData/byHours', commodityHistoricalByHours)

export const commoditiesRoutes = router