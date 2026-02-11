const express = require('express');
const cors = require('cors');
const fitpassRoutes = require('./routes/fitpassRoutes');

const app = express();

// Allow frontend to access backend
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/fitpass', fitpassRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'FitPass API is running' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;