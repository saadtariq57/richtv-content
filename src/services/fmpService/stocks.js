import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'


export const getRealTimeStockQuote = async (symbol) => {
    const response = await apiClient.get(`/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    return response.data
}

export const getStockPriceChange = async (symbol) => {
    const response = await apiClient.get(`/stock-price-change?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    return response.data
}



