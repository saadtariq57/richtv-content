import express from 'express'
import { sectorsHistoricalByDays } from '../../controllers/sectors/sectors.controller.js'

const router = express.Router()

router.get('/historicalData/byDays', sectorsHistoricalByDays)

export const sectorsRoutes = router
