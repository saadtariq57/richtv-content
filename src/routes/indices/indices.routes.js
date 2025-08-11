import express from 'express';
import { 
    realTimeIndexQuote, 
    indexHistoricalDataByDays,
    indexHistoricalDataByHours
} from '../../controllers/indices/indices.controller.js';

const router = express.Router();

router.get('/real-time', realTimeIndexQuote);

router.get('/historicalData/byDays', indexHistoricalDataByDays);   

router.get('/historicalData/byHours', indexHistoricalDataByHours);

export const indicesRoutes = router;