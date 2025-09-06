import Message from '@/models/Message';

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


export async function createMessage(user, messageData) {
  try {
    const { receiver_id, post_id, content, onModel } = messageData;

    
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
    .populate('sender_id', 'username mail profile_picture')
    .populate('receiver_id', 'username mail profile_picture');

   const conversations = {};
messages.forEach(msg => {

  const senderId = msg.sender_id?._id?.toString() || msg.sender_id?.toString();
  const receiverId = msg.receiver_id?._id?.toString() || msg.receiver_id?.toString();

  if (!senderId || !receiverId) return;

  const isSender = senderId === user._id.toString();
  const otherUser = isSender ? msg.receiver_id : msg.sender_id;
  const postId = msg.post_id?.toString();

  if (!otherUser || !postId) return;

  const key = `${otherUser._id?.toString() || otherUser}-${postId}`;

  if (!conversations[key]) {
    conversations[key] = {
      post_id: postId,
      onModel: msg.onModel,
       user: {
            _id: otherUser._id || otherUser,
            username: otherUser.username,
            mail: otherUser.mail,
            profile_picture: otherUser.profile_picture 
          }, 
      lastMessage: msg.content,
      lastDate: msg.date
    };
  } 
  
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
