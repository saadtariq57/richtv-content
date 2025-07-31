
import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'
import { formatDate, formatDateTimeEST } from '../../utils/DateUtils.js';

// Get real-time quote for a specific index symbol
export const getRealTimeIndexQuote = async (symbol) => {
    const response = await apiClient.get(`/stable/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    return response.data
}

// Get historical daily prices for an index
export const getIndexHistoricalDailyPrices = async (symbol, days, from, to) => {
    let url = `/stable/historical-price-eod/full?symbol=${symbol}&apikey=${FMP_API_KEY}`
    
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
export const getIndexHistoricalByHours = async (symbol, hours) => {
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