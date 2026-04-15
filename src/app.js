const express = require('express');
const cors = require('cors');
const path = require('path');

const ocrRouter = require('./routes/ocr');
const compareRouter = require('./routes/compare');
const remindersRouter = require('./routes/reminders');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // allow base64 images
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/ocr', ocrRouter);
app.use('/api/compare', compareRouter);
app.use('/api/reminders', remindersRouter);

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误', message: err.message });
});

app.listen(PORT, () => {
  console.log(`AI 药品比价管家已启动: http://localhost:${PORT}`);
});
