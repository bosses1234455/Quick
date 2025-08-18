'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ConversationItem from '../components/ConversationItem';

export default function MyChatsPage() {
  const { id: currentUserId } = useAuth();
  const [conversations, setConversations] = useState({
    data: [],
    success: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch('/api/messages/conversations');
        if (res.ok) {
          const { data, success } = await res.json();
          // console.log(data)
          if(success) setConversations(data);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) fetchConversations();
    // console.log(conversations)
  }, [currentUserId]);

  if (loading) return <div>Loading conversations...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Conversations</h1>
      <div className="space-y-4">
        {conversations.length ? (
          conversations.map(conversation => (
            <ConversationItem 
              key={conversation.user._id} 
              conversation={conversation} 
              currentUserId={currentUserId} 
            />
          ))
        ) : (
          <p>No conversations yet.</p>
        )}
      </div>
    </div>
  );
}