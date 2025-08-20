import express from 'express'
import { RICHTV_CONTENT_API_TOKEN } from './config/env.js'
import { stockRoutes } from './routes/stocks/stock.routes.js'
import { cryptoRoutes } from './routes/crypto/crypto.routes.js'
import { commoditiesRoutes } from './routes/commodities/commodities.route.js'
import { indicesRoutes } from './routes/indices/indices.routes.js'
import { newsSummariesRoutes } from './routes/newsSummaries.routes.js'
import { stockAnalysisRoutes } from './routes/stocks/stockAnalysis.routes.js'
import { commoditiesAnalysisRoutes } from './routes/commodities/commoditiesAnalysis.routes.js'
import { indicesAnalysisRoutes } from './routes/indices/indicesAnalysis.route.js'
import { cryptoAnalysisRoutes } from './routes/crypto/cryptoAnalysis.route.js'
import { sectorsRoutes } from './routes/sectors/sectors.route.js'
import { macroIndicatorsRoutes } from './routes/macroIndicators/macroIndicators.route.js'

const app = express()

app.use(express.json())

// Public health check
app.get('/', (req, res) => {
  res.status(200).json({ ok: true })
})

// Simple token auth for all API routes
function requireApiToken(req, res, next) {
  const headerToken = req.headers['x-richtv-content-api-key'] || req.headers['x-richtv-content-api-key'.toLowerCase()] || req.headers['authorization']?.replace('Bearer ', '')
  if (!RICHTV_CONTENT_API_TOKEN) {
    return res.status(500).json({ error: 'API token not configured' })
  }
  if (headerToken !== RICHTV_CONTENT_API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

app.use('/api', requireApiToken)
app.use('/api/v1/stock', stockRoutes)
app.use('/api/v1/crypto', cryptoRoutes)
app.use('/api/v1/commodity', commoditiesRoutes)
app.use('/api/v1/indices', indicesRoutes)
app.use('/api/v1/newsSummaries', newsSummariesRoutes)

app.use('/api/v1/stockAnalysis', stockAnalysisRoutes)
app.use('/api/v1/commoditiesAnalysis', commoditiesAnalysisRoutes)
app.use('/api/v1/indicesAnalysis', indicesAnalysisRoutes)
app.use('/api/v1/cryptoAnalysis', cryptoAnalysisRoutes)

app.use('/api/v1/sectors', sectorsRoutes)

app.use('/api/v1/macroIndicators', macroIndicatorsRoutes)


export default app
