import { apiClient } from '../../utils/apiClient.js'
import { FMP_API_KEY } from '../../config/env.js'
import { getTodayDate } from '../../utils/DateUtils.js';
import { trustedSites } from '../../utils/trustedSites.js';

export const getTodayMajorFinancialHeadlines = async () => {
    const todayDate = getTodayDate();
    const url = `/stable/news/general-latest?from=${todayDate}&to=${todayDate}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const filteredByTrustedSites = response.data.filter(item => trustedSites.includes(item.site) )

    return filteredByTrustedSites;
}

export const getFiveRandomTodayMajorFinancialHeadlines = async () => {
    const todayDate = getTodayDate();
    const url = `/stable/news/general-latest?from=${todayDate}&to=${todayDate}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const filteredByTrustedSites = response.data.filter(item => trustedSites.includes(item.site) )
    const randomFive = filteredByTrustedSites.sort(() => Math.random() - 0.5).slice(0, 5);

    return randomFive;
}

export const getOneRandomTodayMajorFinancialHeadlines = async () => {
    const todayDate = getTodayDate();
    const url = `/stable/news/general-latest?from=${todayDate}&to=${todayDate}&apikey=${FMP_API_KEY}`;
    const response = await apiClient.get(url);
    const filteredByTrustedSites = response.data.filter(item => trustedSites.includes(item.site) )
    const randomOne = filteredByTrustedSites.sort(() => Math.random() - 0.5).slice(0, 1);

    return randomOne;
}