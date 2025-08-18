import Message from '@/models/Message';

// Get all messages between users for a specific post
export async function getMessages(user, postId, otherUserId) {
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: user._id, receiver_id: otherUserId, post_id: postId },
        { sender_id: otherUserId, receiver_id: user._id, post_id: postId }
      ]
    }).sort({ date: 1 });

    return { success: true, data: messages };
  } catch (error) {
    return { success: false, error: 'Failed to fetch messages' };
  }
}

// Create a new message
export async function createMessage(user, messageData) {
  try {
    const { receiver_id, post_id, content, onModel } = messageData;
    // console.log(user._id);
    
    const message = await Message.create({
      sender_id: user._id,
      receiver_id,
      post_id,
      content,
      onModel
    });

    return { success: true, data: message };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function getConversations(user) {
  try {
  const messages = await Message.find({
      $or: [
        { sender_id: user._id },
        { receiver_id: user._id }
      ]
    })
    .sort({ date: -1 })
    .populate('sender_id', 'username mail')
    .populate('receiver_id', 'username mail');

    // 🔹 Group by (otherUser + post)
   const conversations = {};
messages.forEach(msg => {
  // Safely get sender/receiver IDs (handles both populated and unpopulated cases)
  const senderId = msg.sender_id?._id?.toString() || msg.sender_id?.toString();
  const receiverId = msg.receiver_id?._id?.toString() || msg.receiver_id?.toString();

  // Skip if message is malformed
  if (!senderId || !receiverId) return;

  // Determine the other user (full document if populated, otherwise just ID)
  const isSender = senderId === user._id.toString();
  const otherUser = isSender ? msg.receiver_id : msg.sender_id;
  const postId = msg.post_id?.toString();

  // Skip if missing critical data
  if (!otherUser || !postId) return;

  // Create a unique key for the conversation
  const key = `${otherUser._id?.toString() || otherUser}-${postId}`;

  // Initialize conversation if it doesn't exist
  if (!conversations[key]) {
    conversations[key] = {
      post_id: postId,
      onModel: msg.onModel,
      user: otherUser, // Could be full doc or just ID
      lastMessage: msg.content,
      lastDate: msg.date
    };
  } 
  // Update if this message is newer than the stored one
  else if (msg.date > conversations[key].lastDate) {
    conversations[key].lastMessage = msg.content;
    conversations[key].lastDate = msg.date;
  }
});

    return { success: true, data: Object.values(conversations) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch conversations' }, { status: 500 };
  }
}
