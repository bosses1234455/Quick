'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ConversationItem = ({ conversation,profilePic }) => {
  // Safely access user data with fallbacks
  const user = conversation?.user || {};
  const otherParticipantId = user?._id;
  const username = user?.username || 'Unknown User';
  const initial = username.charAt(0).toUpperCase();
  const type = conversation.onModel.charAt(0).toLowerCase() + conversation.onModel.slice(1) + 's'
  const router = useRouter();

  // Safely format date
  const formattedDate = conversation?.lastDate 
    ? new Date(conversation.lastDate).toLocaleDateString() 
    : '';

  if (!otherParticipantId) {
    return null;
  }

  return (
    <Link 
      href={`/chat?postId=${conversation.post_id}&userId=${otherParticipantId}&type=${type}`}
      className="block p-4 border-b border-gray-200 hover:bg-gray-50"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
            {profilePic ? <Image src={profilePic} alt='profile pic' width={10} height={10} className='h-10 w-10 rounded-full' /> : {initial} }
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {username}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {conversation.lastMessage || 'No messages yet'}
          </p>
        </div>
        {formattedDate && (
          <div className="text-right text-sm text-gray-500">
            {formattedDate}
          </div>
        )}
      </div>
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors my-6"
        onClick={(e) => {
          e.preventDefault();
          router.push(`/post/${type}/${conversation.post_id}`)
      }}
      >see the ad</button>
    </Link>
  );
};

export default ConversationItem;