import express from 'express'
import { stockRoutes } from './routes/stock.routes.js'
import { cryptoRoutes } from './routes/crypto.routes.js'
import { commoditiesRoutes } from './routes/commodities.route.js'
import { indicesRoutes } from './routes/indices.routes.js'
import { newsSummariesRoutes } from './routes/newsSummaries.routes.js'

const app = express()

app.use(express.json())
app.use('/api/v1/stock', stockRoutes)
app.use('/api/v1/crypto', cryptoRoutes)
app.use('/api/v1/commodity', commoditiesRoutes)
app.use('/api/v1/indices', indicesRoutes)
app.use('/api/v1/newsSummaries', newsSummariesRoutes)

export default app
