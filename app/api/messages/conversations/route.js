import { NextResponse } from 'next/server';
// import connectDB from '@/config/db';
import Message from '@/models/Message';
// import User from '@/models/User';
// import { getSessionUser } from '@/utils/getSessionUser';
import { withDB } from '@/middlewares/withDB';
import { auth } from '@/middlewares/auth';

export const dynamic = 'force-dynamic';

export const GET = withDB(async(req) => {
  try {
    const authResult = await auth(req);
      if (authResult instanceof NextResponse) return authResult;
      const { user } = authResult;

    // Find all messages where the current user is either sender or recipient
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: user._id },
            { recipient: user._id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 } // Sort by most recent message
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ['$sender', user._id] },
              then: '$recipient',
              else: '$sender'
            }
          },
          lastMessage: { $first: '$$ROOT' },
          conversationId: { $first: '$_id' } // Get the ID of the last message as conversation ID
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'otherParticipant'
        }
      },
      {
        $unwind: '$otherParticipant'
      },
      {
        $project: {
          _id: '$conversationId',
          lastMessage: 1,
          participants: [
            { _id: user._id, username: user.username }, // Current user
            '$otherParticipant' // Other participant
          ],
          currentUserId: user._id
        }
      }
    ]);

    return NextResponse.json(conversations);
  } catch (error) {
    console.log(error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
)