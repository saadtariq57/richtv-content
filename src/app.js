import express from 'express'
import { stockRoutes } from './routes/stocks/stock.routes.js'
import { cryptoRoutes } from './routes/crypto.routes.js'
import { commoditiesRoutes } from './routes/commodities/commodities.route.js'
import { indicesRoutes } from './routes/indices.routes.js'
import { newsSummariesRoutes } from './routes/newsSummaries.routes.js'
import { analystRoutes } from './routes/stocks/analyst.routes.js'
import { commoditiesAnalysisRoutes } from './routes/commodities/commoditiesAnalysis.routes.js'

const app = express()

app.use(express.json())
app.use('/api/v1/stock', stockRoutes)
app.use('/api/v1/crypto', cryptoRoutes)
app.use('/api/v1/commodity', commoditiesRoutes)
app.use('/api/v1/indices', indicesRoutes)
app.use('/api/v1/newsSummaries', newsSummariesRoutes)
app.use('/api/v1/analyst', analystRoutes)
app.use('/api/v1/commoditiesAnalysis', commoditiesAnalysisRoutes)

export default app
