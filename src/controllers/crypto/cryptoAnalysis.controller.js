import { getRandomCryptoAnalysis } from '../../services/rss-feeds/cryptoAnalysis/cryptoAnalysis.js';

export const cryptoAnalysis = async (req, res) => {
  try {
    const article = await getRandomCryptoAnalysis();
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved random crypto analysis article',
      data: {
        type: 'Crypto Analysis',
        article
      }
    });
  } catch (error) {
    console.error('❌ Controller Error - Crypto Analysis:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch crypto analysis article',
      error: error.message,
      data: null
    });
  }
};