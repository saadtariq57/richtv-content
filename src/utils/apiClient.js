import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://financialmodelingprep.com/stable',
  timeout: 5000
})
