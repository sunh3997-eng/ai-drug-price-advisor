const express = require('express');

module.exports = function(db) {
  const router = express.Router();

  router.get('/', (req, res) => {
    try {
      res.json({ success: true, data: db.all() });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  router.post('/', (req, res) => {
    try {
      const { drug_name, dosage, frequency, remind_time, notes } = req.body;
      if (!drug_name || !dosage || !remind_time) {
        return res.status(400).json({ success: false, error: '必填：drug_name, dosage, remind_time' });
      }
      const r = db.insert({ drug_name, dosage, frequency: frequency || '每日3次', remind_time, notes: notes || '', enabled: 1 });
      res.status(201).json({ success: true, data: r });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  router.put('/:id', (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db.get(id)) return res.status(404).json({ success: false, error: '提醒不存在' });
      const updated = db.update(id, req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  router.delete('/:id', (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!db.remove(id)) return res.status(404).json({ success: false, error: '提醒不存在' });
      res.json({ success: true, message: '已删除' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
};
