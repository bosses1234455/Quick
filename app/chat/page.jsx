'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useConversation } from '../context/ConversationContext';
import { useAuth } from '../context/AuthContext';
import moment from 'moment';
import ChatHeader from '../components/ChatHeader';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const otherUserId = searchParams.get('userId');
  const postType = searchParams.get('type');
  const router = useRouter();
  
  const { socket, isConnected, joinConversation, sendMessage, messages, setMessages,activeConversation } = useConversation();
  const { id: userId, loggedIn, isLoading: authLoading } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const hasFetchedInitialMessages = useRef(false);


  const chatRoomId = useCallback(() => {
    const ids = [postId, userId, otherUserId].sort();
    return ids.join('-');
  }, [postId, userId, otherUserId]);

  useEffect(() => {
  if (
    authLoading ||
    !loggedIn ||
    hasFetchedInitialMessages.current ||
    !postId ||
    !otherUserId
  ) return;

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?postId=${postId}&otherUserId=${otherUserId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        hasFetchedInitialMessages.current = true;
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchMessages();
}, [authLoading, loggedIn, postId, otherUserId]);

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    console.log('Submit handler called ✅');
    
    if (!message.trim()) return;

    const messageData = {
      receiver_id: otherUserId,
      post_id: postId,
      content: message,
      onModel: postType.charAt(0).toUpperCase() + postType.slice(1, -1),
      chatRoom: chatRoomId()
    };
    
    try {
      await sendMessage(messageData);
      setMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [message, otherUserId, postId, postType, chatRoomId, sendMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (authLoading) return;
    
    if (!loggedIn) {
      router.push('/login');
    }
  }, [loggedIn, router, authLoading]);

  useEffect(() => {
    if (authLoading || !loggedIn) return;
    
    if (!socket || !isConnected || !postId || !otherUserId) return;

    const roomId = chatRoomId();
    if(roomId != activeConversation) joinConversation(roomId, postId, otherUserId);

    const handleNewMessage = (newMessage) => {
      if (newMessage.chatRoom === roomId) {
        setMessages(prev => [...prev, newMessage]);
      }
    };

    socket.on('receiveMessage', handleNewMessage);
    
    return () => {
      socket?.off('receiveMessage', handleNewMessage);
    };
  }, [socket, isConnected, postId, otherUserId, chatRoomId, authLoading, loggedIn, joinConversation, setMessages]);


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      <ChatHeader otherUserId={otherUserId} postId={postId} postType={postType} />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg._id || msg.id} 
              className={`flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  msg.sender_id === userId 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                <span className='wrap-break-word'>{msg.content}</span>
                <p className={`text-xs mt-1 ${
                  msg.sender_id === userId 
                    ? 'text-blue-100' 
                    : 'text-gray-500'
                }`}>
                  {moment(msg.date).fromNow()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4">
        <form 
          onSubmit={handleSendMessage} 
          className="max-w-3xl mx-auto flex gap-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!message.trim() || !isConnected}
            className="bg-blue-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
        {!isConnected && (
          <div className="text-center text-sm text-red-500 mt-2">
            Connection lost. Trying to reconnect...
          </div>
        )}
      </div>
    </div>
  );
}