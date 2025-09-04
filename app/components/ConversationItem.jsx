'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import moment from 'moment';

const ConversationItem = ({ conversation, profilePic }) => {
  // Safely access user data with fallbacks
  const user = conversation?.user || {};
  const otherParticipantId = user?._id;
  const username = user?.username || 'Unknown User';
  const initial = username.charAt(0).toUpperCase();
  const type = conversation.onModel ? 
    conversation.onModel.charAt(0).toLowerCase() + conversation.onModel.slice(1) + 's' : 
    'posts';

  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const formattedDate = conversation?.lastDate ? moment(conversation.lastDate).fromNow() : '';

  if (!otherParticipantId) {
    return null;
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-100 p-6 mb-4">
      {/* Main Conversation Info */}
      <div className="flex items-start justify-between mb-4">
        <Link 
          href={`/chat?postId=${conversation.post_id}&userId=${otherParticipantId}&type=${type}`}
          className="flex items-start space-x-4 flex-1 min-w-0"
        >
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="relative">
              {profilePic && !imgError ? (
                <Image 
                  src={profilePic} 
                  alt={`${username}'s profile`} 
                  width={48} 
                  height={48} 
                  className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {initial}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {username}
              </h3>
              {formattedDate && (
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
                  {formattedDate}
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {conversation.lastMessage || 'Start a conversation...'}
            </p>
            
            {/* Message preview with icon */}
            {conversation.lastMessage && (
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-xs text-gray-500">Last message</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button 
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group/chat"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/chat?postId=${conversation.post_id}&userId=${otherParticipantId}&type=${type}`);
          }}
        >
          <svg className="w-4 h-4 group-hover/chat:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Continue Chat</span>
        </button>

        <button 
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 group/ad"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/post/${type}/${conversation.post_id}`);
          }}
        >
          <svg className="w-4 h-4 group-hover/ad:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 15.5v-11a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
          </svg>
          <span>View Ad</span>
        </button>
      </div>

      {/* Unread message indicator (optional) */}
      {conversation.unreadCount > 0 && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
            {conversation.unreadCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;