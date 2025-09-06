import { NextResponse } from 'next/server';
import { Server } from 'socket.io';

export const dynamic = 'force-dynamic';

const SocketHandler = (req) => {
  if (!global.io) {
    console.log('Initializing Socket.IO');
    const httpServer = req.socket?.server;
    if (!httpServer?.io) {
      const io = new Server(httpServer, {
        path: '/api/socket',
        addTrailingSlash: false,
        connectionStateRecovery: {}
      });

      io.on('connection', (socket) => {
        console.log('New connection:', socket.id);

        socket.on('joinConversation', (conversationId) => {
          socket.join(conversationId);
        });

        socket.on('sendMessage', (messageData) => {
          io.to(messageData.conversationId).emit('receiveMessage', {
            ...messageData,
            timestamp: new Date().toISOString()
          });
        });
      });

      httpServer.io = io;
      global.io = io;
    }
  }
  return NextResponse.json({ success: true });
};

export { SocketHandler as GET, SocketHandler as POST };