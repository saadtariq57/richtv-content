import express from 'express';
import { 
    realTimeCryptoQuote, 
    cryptoHistoricalDataByDays,
    cryptoHistoricalDataByHours
} from '../controllers/crypto.controller.js';

const router = express.Router();

router.get('/real-time', realTimeCryptoQuote);

router.get('/historicalData/byDays', cryptoHistoricalDataByDays);   

router.get('/historicalData/byHours', cryptoHistoricalDataByHours);

export const cryptoRoutes = router;
