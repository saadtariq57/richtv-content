import express from 'express';
import { indicesAnalysis } from '../../controllers/indices/indicesAnalysis.controller.js';

const router = express.Router();

// GET /api/v1/indices/analysis
router.get('/analysis', indicesAnalysis);

export const indicesAnalysisRoutes = router;
