import express from 'express'
import { stockRoutes } from './routes/stockRoutes.js'
import { cryptoRoutes } from './routes/cryptoRoutes.js'

const app = express()

app.use(express.json())
app.use('/api/v1/stock', stockRoutes)
app.use('/api/v1/crypto', cryptoRoutes)


export default app
