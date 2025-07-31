import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'
import { formatDate, formatDateTimeEST } from '../../utils/DateUtils.js';

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

// Get historical hourly data for last N hours (EST timezone)
export const getCommodityHistoricalByHours = async (symbol, hours) => {
    if (!hours || hours <= 0) {
        throw new Error('Hours parameter must be a positive number');
    }

    // Get UTC time and convert to EST
    const now = Date.now();
    const estNow = new Date(now - (4 * 60 * 60 * 1000)); // UTC-4 for EST
    const estCutoff = new Date(estNow.getTime() - hours * 60 * 60 * 1000);

    // Format date as YYYY-MM-DD
    const from = formatDate(estCutoff);
    const to = formatDate(estNow);
    
    // Get data from FMP
    const url = `/stable/historical-chart/1hour?symbol=${symbol}&from=${from}&to=${to}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const estNowStr = formatDateTimeEST(estNow);
    const estCutoffStr = formatDateTimeEST(estCutoff);

    // Filter data according to N hours in EST
    const filtered = data.filter(item => {
        return item.date >= estCutoffStr && item.date <= estNowStr;
    });

    // Sort ascending (oldest to newest)
    filtered.sort((a, b) => {
        const aTime = new Date(a.date.replace(' ', 'T') + '-04:00').getTime();
        const bTime = new Date(b.date.replace(' ', 'T') + '-04:00').getTime();
        return aTime - bTime;
    });

    return filtered;
}


