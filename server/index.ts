import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import gamesRouter from './routes/games.js';
import { createSessionRouter } from './routes/sessions.js';
import analyticsRouter from './routes/analytics.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gamesRouter);
app.use('/api/sessions', createSessionRouter(io));
app.use('/api/analytics', analyticsRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join_session', (sessionId: string) => {
    socket.join(sessionId);
    console.log(`Client ${socket.id} joined session ${sessionId}`);
  });

  socket.on('leave_session', (sessionId: string) => {
    socket.leave(sessionId);
    console.log(`Client ${socket.id} left session ${sessionId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

async function start() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
