require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const http = require('http');
const { Server } = require('socket.io');

const userRoutes = require('./src/routes/userRoutes');
const swipeRoutes = require('./src/routes/swipeRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const matchRoutes = require('./src/routes/matchRoutes');
const chatSocket = require('./src/sockets/chatSocket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for socket.io for development
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sportmatch-mvp';

// Middleware
app.use(cors()); // Add cors middleware for express
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/swipes', swipeRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/matches', matchRoutes);

// Socket.IO
chatSocket(io);

app.get('/', (req, res) => {
  res.send('SportMatch Backend API');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
