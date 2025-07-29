import express from 'express'
import { realTimeCryptoQuote, cryptoHistoricalChange } from '../controllers/cryptoController.js'

const router = express.Router()

router.get('/real-time', realTimeCryptoQuote)
router.get('/historical-change', cryptoHistoricalChange)

export const cryptoRoutes = router
