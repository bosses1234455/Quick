import { withDB } from '@/middlewares/withDB';
import { auth } from '@/middlewares/auth';
import { NextResponse } from 'next/server';
import { getMessages, createMessage } from '@/controllers/messagesController';

// Get all messages for a user
export const GET = withDB(async (req) => {
  const authResult = await auth(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const otherUserId = searchParams.get('otherUserId');

  const result = await getMessages(user, postId, otherUserId);
  
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result.data);
});

// Send a new message
export const POST = withDB(async (req) => {
  const authResult = await auth(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const messageData = await req.json();
  const result = await createMessage(user, messageData);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  // The socket.io event will handle real-time delivery
  return NextResponse.json(result.data);
});