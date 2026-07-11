const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');

const db = require('./config/database');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');
const followRoutes = require('./routes/follows');
const communityRoutes = require('./routes/communities');
const notificationRoutes = require('./routes/notifications');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io events
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('user-online', (userId) => {
    socket.userId = userId;
    socket.broadcast.emit('user-status', { userId, status: 'online' });
  });

  socket.on('new-post', (data) => {
    socket.broadcast.emit('post-created', data);
  });

  socket.on('new-comment', (data) => {
    socket.broadcast.emit('comment-added', data);
  });

  socket.on('new-like', (data) => {
    socket.broadcast.emit('liked', data);
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      socket.broadcast.emit('user-status', { userId: socket.userId, status: 'offline' });
    }
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

// Initialize database and start server
db.initialize().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Liberty SNS Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = { app, io };
