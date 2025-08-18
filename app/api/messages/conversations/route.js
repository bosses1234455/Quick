// app/api/conversations/route.js
import { NextResponse } from 'next/server';
import { auth } from '@/middlewares/auth';
import { withDB } from '@/middlewares/withDB';
import Message from '@/models/Message';
import { getConversations } from '@/controllers/messagesController';
// import User from '@/models/User';
// import { getServerSession } from 'next-auth'; // if you use next-auth
// import dbConnect from '@/lib/dbConnect';

export const GET =  withDB(async(req) => {
  // try {

     const authResult = await auth(req);
     if (authResult instanceof NextResponse) return authResult;
     const { user } = authResult;
     const result = await getConversations(user);
       if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json(result);
    // 🔹 Get logged in user (adjust if you use your own auth)
    // const session = await getServerSession();
    // if (!session?.user) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    // const userId = session.user.id;

    // 🔹 Get all messages where user is sender or receiver
//     const messages = await Message.find({
//       $or: [
//         { sender_id: user._id },
//         { receiver_id: user._id }
//       ]
//     })
//     .sort({ date: -1 })
//     .populate('sender_id', 'username mail')
//     .populate('receiver_id', 'username mail');

//     // 🔹 Group by (otherUser + post)
//    const conversations = {};
// messages.forEach(msg => {
//   // Safely get sender/receiver IDs (handles both populated and unpopulated cases)
//   const senderId = msg.sender_id?._id?.toString() || msg.sender_id?.toString();
//   const receiverId = msg.receiver_id?._id?.toString() || msg.receiver_id?.toString();

//   // Skip if message is malformed
//   if (!senderId || !receiverId) return;

//   // Determine the other user (full document if populated, otherwise just ID)
//   const isSender = senderId === user._id.toString();
//   const otherUser = isSender ? msg.receiver_id : msg.sender_id;
//   const postId = msg.post_id?.toString();

//   // Skip if missing critical data
//   if (!otherUser || !postId) return;

//   // Create a unique key for the conversation
//   const key = `${otherUser._id?.toString() || otherUser}-${postId}`;

//   // Initialize conversation if it doesn't exist
//   if (!conversations[key]) {
//     conversations[key] = {
//       post_id: postId,
//       onModel: msg.onModel,
//       user: otherUser, // Could be full doc or just ID
//       lastMessage: msg.content,
//       lastDate: msg.date
//     };
//   } 
//   // Update if this message is newer than the stored one
//   else if (msg.date > conversations[key].lastDate) {
//     conversations[key].lastMessage = msg.content;
//     conversations[key].lastDate = msg.date;
//   }
// });

//     return NextResponse.json({ success: true, data: Object.values(conversations) });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Failed to fetch conversations' }, { status: 500 });
//   }
})
