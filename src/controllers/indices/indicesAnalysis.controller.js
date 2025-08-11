import { getRandomIndicesAnalysis } from '../../services/rss-feeds/indicesAnalysis/indicesAnalysis.js';

export const indicesAnalysis = async (req, res) => {
  try {
    const article = await getRandomIndicesAnalysis();
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved random indices analysis article',
      data: {
        type: 'Indices Analysis',
        article
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Indices Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch indices analysis article',
      error: error.message,
      data: null
    });
  }
};
