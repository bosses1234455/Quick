'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { io } from 'socket.io-client';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const otherUserId = searchParams.get('userId');
  const postType = searchParams.get('type');

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Socket.IO connection
  useEffect(() => {
    const initSocket = async () => {
      await fetch('/api/socket');
      const newSocket = io('http://localhost:3000', {
        path: '/api/socket'
      });
      setSocket(newSocket);

      // Join chat room
      const chatRoom = `${postId}-${otherUserId}`;
      newSocket.emit('join-chat', chatRoom);

      // Listen for new messages
      newSocket.on('receive-message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => newSocket.close();
    };

    initSocket();
  }, [postId, otherUserId]);

  useEffect(() => {
    fetchMessages();
  }, [postId, otherUserId]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?postId=${postId}&otherUserId=${otherUserId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    const chatRoom = `${postId}-${otherUserId}`;
    const messageData = {
      receiver_id: otherUserId,
      post_id: postId,
      content: message,
      onModel: postType,
      chatRoom
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });

      if (res.ok) {
        const newMessage = await res.json();
        socket.emit('send-message', { ...newMessage, chatRoom });
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1 p-4">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`flex items-start gap-4 ${msg.sender_id === otherUserId ? 'flex-row-reverse' : ''}`}>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="text-purple-600">O</div>
                </div>
              </div>
              <div className={`flex ${msg.sender_id === otherUserId ? 'justify-end' : ''} flex-1`}>
                <div className="bg-gray-200 p-3 rounded-lg inline-block">
                  <p>{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="sticky bottom-0 bg-white pt-4 border-t">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-gray-300 rounded-lg py-3 px-4 pr-12"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              ▶
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}