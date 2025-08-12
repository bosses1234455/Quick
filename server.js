const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`✅ Socket connected: ${socket.id}`);

  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`🟢 User joined conversation ${conversationId}`);
  });

  socket.on('send message', (message) => {
    const { chatRoom } = message;
    // const conversationRoom = `${post_id}_${receiver_id}`;
    io.to(chatRoom).emit('receiveMessage', message);
    console.log('📩 Message sent to:', chatRoom);
  });

  socket.on('typing', (conversationId) => {
    socket.to(conversationId).emit('userTyping', {
      userId: socket.userId,
      conversationId,
    });
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
