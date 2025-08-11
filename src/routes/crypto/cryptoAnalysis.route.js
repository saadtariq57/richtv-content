import express from 'express';
import { cryptoAnalysis } from '../../controllers/crypto/cryptoAnalysis.controller.js';

const router = express.Router();

// GET /api/v1/crypto/analysis
router.get('/analysis', cryptoAnalysis);

export const cryptoAnalysisRoutes = router;