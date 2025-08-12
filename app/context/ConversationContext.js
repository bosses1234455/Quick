// context/ConversationContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import useSocket from '@/app/hooks/useSocket';
import { useAuth } from './AuthContext';

const ConversationContext = createContext();

export function ConversationProvider({children}) {
  const {id:userId} = useAuth(); 
  const { socket, isConnected } = useSocket(userId);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});

  useEffect(() => {
    if (!socket || !activeConversation) return;

    const handleReceiveMessage = (message) => {
      if (message.conversationId === activeConversation) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleUserTyping = ({ userId, conversationId }) => {
      if (conversationId === activeConversation) {
        setTypingUsers(prev => ({ ...prev, [userId]: true }));
        setTimeout(() => {
          setTypingUsers(prev => {
            const updated = { ...prev };
            delete updated[userId];
            return updated;
          });
        }, 3000);
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('userTyping', handleUserTyping);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('userTyping', handleUserTyping);
    };
  }, [socket, activeConversation]);

  const joinConversation = (conversationId,postId,otherUserId) => {
    if (socket) {
      socket.emit('joinConversation', conversationId);
      setActiveConversation(conversationId);
      fetchMessages(postId,otherUserId);
    }
  };

  const sendMessage = async (messageData) => {
    if (!socket || !activeConversation) return;

    const res = await fetch('/api/messages',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    const saved = await res.json();
     socket.emit('send message', {
    ...saved,
    chatRoom: messageData.chatRoom
  });
    // return new Promise((resolve, reject) => {
    //   socket.emit('sendMessage', {
    //     conversationId: activeConversation,
    //     senderId: userId,
    //     text
    //   }, (response) => {
    //     if (response.status === 'ok') {
    //       resolve(response.message);
    //     } else {
    //       reject(response.error);
    //     }
    //   });
    // });
  };

  const sendTypingIndicator = () => {
    if (socket && activeConversation) {
      socket.emit('typing', activeConversation);
    }
  };

  const fetchConversations = async () => {
    const res = await fetch('/api/conversations');
    const data = await res.json();
    setConversations(data);
  };

  const fetchMessages = async (postId,otherUserId) => {
    const res = await fetch(`/api/messages?postId=${postId}&otherUserId=${otherUserId}`);
    const data = await res.json();
    setMessages(data);
  };

  return (
    <ConversationContext.Provider value={{
      isConnected,
      activeConversation,
      conversations,
      messages,
      setMessages,
      typingUsers,
      joinConversation,
      sendMessage,
      sendTypingIndicator,
      socket,
      fetchConversations
    }}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  return useContext(ConversationContext);
}