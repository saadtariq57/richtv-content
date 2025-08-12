import express from 'express'
import { sectorsHistoricalByDays, sectorsAll, sectorById, sectorCompaniesBySlug, sectorCompanyBySlugAndId } from '../../controllers/sectors/sectors.controller.js'

const router = express.Router()

router.get('/historicalData/byDays', sectorsHistoricalByDays)

router.get('/tradingview', sectorsAll)
router.get('/tradingview/:id', sectorById)

router.get('/tradingview/:slug/companies', sectorCompaniesBySlug)
router.get('/tradingview/:slug/companies/:symbolOrId', sectorCompanyBySlugAndId)

export const sectorsRoutes = router
