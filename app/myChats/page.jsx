'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ConversationItem from '../components/ConversationItem';
import { useRouter } from 'next/navigation';

export default function MyChatsPage() {
  const { id: currentUserId, isLoading: authLoading } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    
    if (isClient && !authLoading && !currentUserId) {
      router.push('/login');
    }
  }, [currentUserId, router, isClient, authLoading]);

  useEffect(() => {
    if (!isClient || authLoading || !currentUserId) return;

    const fetchConversations = async () => {
      try {
        const res = await fetch('/api/messages/conversations');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch conversations: ${res.status}`);
        }
        
        const { data, success } = await res.json();
        
        if (success) {
          setConversations(data || []);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [currentUserId, isClient, authLoading]);

  if (!isClient || authLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Conversations</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Conversations</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Conversations</h1>
      <div className="space-y-4">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationItem 
              key={conversation.id || `conversation-${conversation.user?._id}-${conversation.post_id}-${currentUserId}`} 
              conversation={conversation} 
              currentUserId={currentUserId} 
              profilePic={conversation.user?.profile_picture}
            />
          ))
        ) : (
          <p className="text-gray-500">No conversations yet.</p>
        )}
      </div>
    </div>
  );
}