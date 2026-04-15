const express = require('express');
const router = express.Router();
const { comparePrices } = require('../services/priceCompare');

// POST /api/compare
router.post('/', (req, res) => {
  try {
    const { drugs } = req.body;
    
    if (!drugs || !Array.isArray(drugs) || drugs.length === 0) {
      return res.status(400).json({
        success: false,
        error: '请提供药品名称列表，格式：{ "drugs": ["阿莫西林胶囊", "布洛芬缓释胶囊"] }',
      });
    }

    const result = comparePrices(drugs);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
