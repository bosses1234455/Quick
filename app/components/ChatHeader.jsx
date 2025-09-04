'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const ChatHeader = ({ 
  otherUserId, 
  postId, 
  postType, 
  onBack 
}) => {
  const [otherUser, setOtherUser] = useState(null);
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id: userId } = useAuth();

  // Fetch other user's details
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const res = await fetch(`/api/user/${otherUserId}`);
        if (res.ok) {
          const userData = await res.json();
          // console.log(userData)
          setOtherUser(userData.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Fetch post details
    const fetchPostDetails = async () => {
      try {
        const endpoint = `/api/${postType}`
        
        const res = await fetch(endpoint);
        if (res.ok) {
          const postData = await res.json();
          setPostDetails(postData);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    if (otherUserId) {
      fetchOtherUser();
    }

    if (postId && postType) {
      fetchPostDetails();
    }

    setLoading(false);
  }, [otherUserId, postId, postType]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleViewProfile = () => {
    router.push(`/profile/${otherUserId}`);
  };

  const handleViewPost = () => {
    router.push(`/post/${postType}/${postId}`);
  };

  if (loading) {
    return (
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4 sticky top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleBack}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {otherUser && (
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={handleViewProfile}
            >
              <div className="relative">
                <img 
                  src={otherUser.profile_picture || '/Logo.png'} 
                  alt={otherUser.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{otherUser.username}</h2>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {postDetails && (
            <button
              onClick={handleViewPost}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span>View ad</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;