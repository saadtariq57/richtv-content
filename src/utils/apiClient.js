import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://financialmodelingprep.com',
  timeout: 5000
})
