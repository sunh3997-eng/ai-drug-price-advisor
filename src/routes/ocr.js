const express = require('express');
const router = express.Router();
const { recognizePrescription } = require('../services/ocr');

// POST /api/ocr/prescription
router.post('/prescription', (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({
        success: false,
        error: '请提供处方单图片（base64格式）',
      });
    }

    const result = recognizePrescription(image);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
