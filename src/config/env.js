import { env } from 'node:process'
import dotenv from 'dotenv'
dotenv.config()

export const PORT = env.PORT
export const FMP_API_KEY = env.FMP_API_KEY
export const RICHTV_CONTENT_API_TOKEN = env.RICHTV_CONTENT_API_TOKEN
