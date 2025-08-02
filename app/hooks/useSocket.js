// hooks/useSocket.js
'use client';

import Cookies from 'js-cookie';
import { useEffect, useState, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(userId) {
  const [socket, setSocket] = useState(null);
  // const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = useCallback(() => {
    const token = Cookies.get('token');
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      path: '/socket.io',
      autoConnect: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token,
        userId
      }
    });

    // socketRef.current = socketInstance;

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
      setSocket(socketInstance);
      // socketRef.current = socketInstance;
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    socketInstance.connect();

    return socketInstance;
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = connectSocket();
    // console.log(socketRef)
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [userId, connectSocket]);

  return { socket, isConnected };
}