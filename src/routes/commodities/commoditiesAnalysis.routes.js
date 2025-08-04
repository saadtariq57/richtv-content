import express from 'express'
import {
    technicalAnalysis,
    fundamentalAnalysis,
    metalsAnalysis,
    energyAnalysis,
    allCommoditiesAnalysis,
    availableCategories
} from '../../controllers/commodities/commoditiesAnalysis.controller.js'

const router = express.Router()

router.get('/categories', availableCategories)
router.get('/technical', technicalAnalysis)
router.get('/fundamental', fundamentalAnalysis)
router.get('/metals', metalsAnalysis)
router.get('/energy', energyAnalysis)
router.get('/all', allCommoditiesAnalysis)

export const commoditiesAnalysisRoutes = router
