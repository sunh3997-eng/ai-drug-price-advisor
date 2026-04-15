const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db/init');
const ocrRoutes = require('./routes/ocr');
const compareRoutes = require('./routes/compare');
const reminderRoutes = require('./routes/reminders');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));

// Initialize database
const db = initDB();

// Routes
app.use('/api/ocr', ocrRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/reminders', reminderRoutes(db));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🏥 AI 药品比价管家 running at http://localhost:${PORT}`);
});
