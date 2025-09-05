import { Server } from 'socket.io';
import { NextResponse } from 'next/server';

export async function GET(req) {

  if (!global.io) {
    console.log('Attempting to initialize Socket.io server...');


    const res = new NextResponse(); 
    const httpServer = res.socket?.server; 

    if (!httpServer) {
      console.error('HTTP server not available for Socket.IO initialization. This might be due to the environment or how Next.js handles the request/response cycle.');
      return NextResponse.json({ message: 'Socket.IO server initialization failed: HTTP server not found.' }, { status: 500 });
    }

    const io = new Server(httpServer, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      
      socket.on('join-chat', (data) => {
        socket.join(data.chatId);
        console.log(`User ${socket.id} joined chat ${data.chatId}`);
      });

      socket.on('send-message', (data) => {
        io.to(data.chatId).emit('receive-message', data);
        console.log(`Message sent to chat ${data.chatId}: ${data.content}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    global.io = io; 
    console.log('Socket.io server initialized successfully.');
  }

  return NextResponse.json({ message: 'Socket.IO server is running.' });
}