import express from 'express'
import { stockRoutes } from './routes/stockRoutes.js'
import { cryptoRoutes } from './routes/cryptoRoutes.js'
import { commoditiesRoutes } from './routes/commoditiesRoute.js'
import { indicesRoutes } from './routes/indicesRoutes.js'

const app = express()

app.use(express.json())
app.use('/api/v1/stock', stockRoutes)
app.use('/api/v1/crypto', cryptoRoutes)
app.use('/api/v1/commodity', commoditiesRoutes)
app.use('/api/v1/indices', indicesRoutes)

export default app
