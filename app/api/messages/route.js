import { withDB } from '@/middlewares/withDB';
import { auth } from '@/middlewares/auth';
import { NextResponse } from 'next/server';
import Message from '@/models/Message';

// Get all messages for a user
export const GET = withDB(async (req) => {
  const authResult = await auth(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const otherUserId = searchParams.get('otherUserId');

  const messages = await Message.find({
    $or: [
      { sender_id: user._id, receiver_id: otherUserId, post_id: postId },
      { sender_id: otherUserId, receiver_id: user._id, post_id: postId }
    ]
  }).sort({ date: 1 });

  return NextResponse.json(messages);
});

// Send a new message
export const POST = withDB(async (req) => {
  const authResult = await auth(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const { receiver_id, post_id, content, onModel } = await req.json();

  const message = await Message.create({
    sender_id: user._id,
    receiver_id,
    post_id,
    content,
    onModel
  });

  return NextResponse.json(message);
});