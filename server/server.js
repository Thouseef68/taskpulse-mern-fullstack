const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root and Health check endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'TaskPulse MERN REST API is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to TaskPulse REST API (Dayananda Sagar University - BCA Full Stack Project)',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login', 'GET /api/auth/me (Protected)'],
      tasks: [
        'GET /api/tasks (Protected - Full List & Filters)',
        'POST /api/tasks (Protected - Create Task)',
        'GET /api/tasks/stats (Protected - Summary Analytics)',
        'GET /api/tasks/:id (Protected - Single Task)',
        'PUT /api/tasks/:id (Protected - Update Task)',
        'DELETE /api/tasks/:id (Protected - Delete Task)',
      ],
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Listen when running directly
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}

module.exports = app;

