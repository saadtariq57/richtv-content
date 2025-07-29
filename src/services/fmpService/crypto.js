import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'

export const getRealTimeCryptoQuote = async (symbol) => {
    const response = await apiClient.get(`/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    return response.data
}

export const getCryptoHistoricalChangeByDate = async (symbol, from, to) => {
    const response = await apiClient.get(`/historical-price-eod/full?symbol=${symbol}&from=${from}&to=${to}&apikey=${FMP_API_KEY}`)
    return response.data
}

export const getCryptoHistoricalChangeByDays = async (symbol, days) => {
    // Calculate the date range for the last `days` days
    const { from, to } = calculateDateRange(days);

    const response = await apiClient.get(
        `/historical-price-eod/full?symbol=${symbol}&from=${from}&to=${to}&apikey=${FMP_API_KEY}`
    );

    return response.data;
}

export const getCryptoHistoricalChangeByOneHour = async (symbol, days, from, to) => {
    let url = `/historical-chart/1hour?symbol=${symbol}&apikey=${FMP_API_KEY}`;
    
    if (days) {
        // Calculate date range if days is provided
        const dateRange = calculateDateRange(days);
        url += `&from=${dateRange.from}&to=${dateRange.to}`;
    } else if (from && to) {
        // Use provided from and to dates
        url += `&from=${from}&to=${to}`;
    }
    
    const response = await apiClient.get(url);
    return response.data;
}


