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