import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { formatPercentage } from '../../utils/formatPercentage.js'
import { calculateDateRange } from '../../utils/calculateDateRange.js'
import { formatDate, formatDateTimeEST } from '../../utils/DateUtils.js';

export const getRealTimeStockQuote = async (symbol) => {
    const response = await apiClient.get(`/stable/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    return response.data
}

/* [
    {
        "symbol": "AAPL",
        "1D": -0.61533,
        "5D": -2.20307,
        "1M": 2.33952,
        "3M": -1.19059,
        "6M": -11.62507,
        "ytd": -13.89379,
        "1Y": -4.03565,
        "3Y": 30.00433,
        "5Y": 118.28672,
        "10Y": 586.40078,
        "max": 163491.74133
    }
] */

// Get all percentage changes in one call
export const getStockPriceChanges = async (symbol) => {
    const response = await apiClient.get(`/stable/stock-price-change?symbol=${symbol}&apikey=${FMP_API_KEY}`)
    const data = response.data[0];
    
    return {
        symbol: data.symbol,
        oneDay: formatPercentage(data['1D']),
        oneWeek: formatPercentage(data['5D']),
        oneMonth: formatPercentage(data['1M']),
        threeMonth: formatPercentage(data['3M']),
        sixMonth: formatPercentage(data['6M']),
        yearToDate: formatPercentage(data['ytd']),
        oneYear: formatPercentage(data['1Y']),
        threeYear: formatPercentage(data['3Y']),
        fiveYear: formatPercentage(data['5Y']),
        tenYear: formatPercentage(data['10Y']),
        max: formatPercentage(data['max'])
    }
}

// Individual functions that reuse the main function for efficiency
export const getStockPriceChangeByOneYear = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneYearChangePercentage: changes.oneYear
    }
}

export const getStockPriceChangeBySixMonth = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        sixMonthChangePercentage: changes.sixMonth
    }
}

export const getStockPriceChangeByOneMonth = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneMonthChangePercentage: changes.oneMonth
    }
}

export const getStockPriceChangeByOneWeek = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneWeekChangePercentage: changes.oneWeek
    }
}

export const getStockPriceChangeByOneDay = async (symbol) => {
    const changes = await getStockPriceChanges(symbol);
    return {
        symbol: changes.symbol,
        oneDayChangePercentage: changes.oneDay
    }
}

export const getLastHourStockData = async (symbol) => {
    // Get today's date in America/New_York timezone (Eastern Time)
    const now = new Date();
    // Convert to US Eastern Time
    const estOffset = -5 * 60; // EST is UTC-5
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estDate = new Date(utc + (estOffset * 60000));
    const yyyy = estDate.getFullYear();
    const mm = String(estDate.getMonth() + 1).padStart(2, '0');
    const dd = String(estDate.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // Use today's date for both from and to
    let url = `/stable/historical-chart/1hour?symbol=${symbol}&apikey=${FMP_API_KEY}&from=${todayStr}&to=${todayStr}`;

    const response = await apiClient.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    // Get the last hour's record (assuming data is sorted from latest to oldest)
    const lastRecord = data[0];

    if (!lastRecord) {
        return null;
    }

    let changePercent = null;
    if (typeof lastRecord.open === 'number' && typeof lastRecord.close === 'number' && lastRecord.open !== 0) {
        changePercent = ((lastRecord.close - lastRecord.open) / lastRecord.open) * 100;
    }

    return {
        symbol,
        record: {
            ...lastRecord,
            changePercent
        }
    };
}

export const getMostActiveStocks = async () => {
    const response = await apiClient.get(`/stable/most-actives?apikey=${FMP_API_KEY}`)
    // Return the 10 random active stocks
    const activeStocks = response.data.sort(() => Math.random() - 0.5).slice(0, 10)
    return activeStocks
}

export const getBiggestGainerStocks = async () => {
    const response = await apiClient.get(`/stable/biggest-gainers?apikey=${FMP_API_KEY}`)
    // Return the 10 random gainer stocks
    const gainerStocks = response.data.sort(() => Math.random() - 0.5).slice(0, 10)
    return gainerStocks
}

export const getBiggestLoserStocks = async () => {
    const response = await apiClient.get(`/stable/biggest-losers?apikey=${FMP_API_KEY}`)
    // Return the 10 random loser stocks
    const loserStocks = response.data.sort(() => Math.random() - 0.5).slice(0, 10)
    return loserStocks
}

export const getStockHistoricalDailyPrices = async (symbol, days, from, to) => {
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
export const getStockHistoricalByHours = async (symbol, hours) => {
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




