import express from 'express'
import { realTimeStockData, stockPriceChange } from '../controllers/stockController.js'

const router = express.Router()

router.get('/real-time', realTimeStockData)
router.get('/price-change', stockPriceChange)

export const stockRoutes = router
