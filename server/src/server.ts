import dotenv from 'dotenv';
import express from "express";
import { connect as connectDB, disconnect as disconnectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { verifyToken } from './middleware/authMiddleware';
import errorHandler from './middleware/errorHandler';
import { socketService } from './services/socket.service';
import { init as initSocket } from './config/socket';


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
// Initialize Socket.Io Server
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());


// auth route
app.use('/api/auth', authRoutes);


// Express js Error Handling middleware
app.use(errorHandler);


// Initializing Socket
initSocket(io);
// Initializing Socket Service
socketService.init(io);


// Express Connection
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} PORT`);
});

process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await disconnectDB();
    process.exit(0);
});
