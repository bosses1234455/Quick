import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('join-chat', (chatRoom) => {
        socket.join(chatRoom);
      });

      socket.on('send-message', (message) => {
        io.to(message.chatRoom).emit('receive-message', message);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  res.end();
};

export const GET = ioHandler;