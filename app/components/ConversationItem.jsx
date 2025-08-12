import Link from 'next/link';

const ConversationItem = ({ conversation }) => {
  const otherParticipant = conversation.participants.find(
    (p) => p._id !== conversation.currentUserId
  );

  if (!otherParticipant) {
    return null; // Or handle this case appropriately
  }

  return (
    <Link href={`/chat/${conversation._id}`} className="block p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {/* You can add an avatar here if available */}
          <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
            {otherParticipant.username.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {otherParticipant.username}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {conversation.lastMessage ? conversation.lastMessage.content : 'No messages yet.'}
          </p>
        </div>
        <div className="text-right text-sm text-gray-500">
          {conversation.lastMessage && new Date(conversation.lastMessage.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
};

export default ConversationItem;