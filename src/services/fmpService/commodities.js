import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'

// Get real-time quotes for all commodities
export const getRealTimeAllCommoditiesQuote = async () => {
    const response = await apiClient.get(`/api/v3/quotes/commodity?apikey=${FMP_API_KEY}`);
    return response.data;
}

// Get real-time quote for a specific commodity symbol
export const getRealTimeCommodityQuote = async (symbol) => {
    const response = await apiClient.get(`/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`);
    return response.data;
}

// Get historical daily prices for a commodity
export const getCommodityHistoricalDailyPrices = async (symbol, days, from, to) => {
    let url = `/api/v3/historical-price-full/${symbol}?apikey=${FMP_API_KEY}`
   
    if (days) {
        const dateRange = calculateDateRange(days)
        url += `&from=${dateRange.from}&to=${dateRange.to}`
    } else if (from && to) {
        url += `&from=${from}&to=${to}`
    }
    
    const response = await apiClient.get(url)

    
    return response.data
}

// Get historical hourly data for last N hours (optimized for lower latency)
export const getCommodityHistoricalByHours = async (symbol, hours) => {
    if (!hours || hours <= 0) {
        throw new Error('Hours parameter must be a positive number');
    }

    // Calculate date range to minimize API data transfer
    const now = new Date();
    const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000);
    
    // Add buffer days to ensure we get enough data (market hours vs real hours)
    const bufferDays = Math.ceil(hours / 24) + 2; // Add 2 extra days as buffer
    const fromDate = new Date(cutoff.getTime() - (bufferDays * 24 * 60 * 60 * 1000));
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    const from = formatDate(fromDate);
    const to = formatDate(now);
    
    // Use date filtering at API level to reduce data transfer
    //? This API has Symbol Limited to BZUSD, SIUSD, ESUSD, GCUSD only
    const url = `/stable/historical-chart/1hour?symbol=${symbol}&from=${from}&to=${to}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    // Filter records within the exact time window
    const filtered = data.filter(item => {
        const dateStr = item.date || item.datetime;
        if (!dateStr) return false;
        const dt = new Date(dateStr.replace(' ', 'T') + 'Z');
        return dt >= cutoff && dt <= now;
    });

    // Sort ascending (oldest to newest)
    filtered.sort((a, b) => {
        const aTime = new Date((a.date || a.datetime).replace(' ', 'T') + 'Z').getTime();
        const bTime = new Date((b.date || b.datetime).replace(' ', 'T') + 'Z').getTime();
        return aTime - bTime;
    });

    return filtered;
}


