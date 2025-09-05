import { NextResponse } from 'next/server';
import { auth } from '@/middlewares/auth';
import { withDB } from '@/middlewares/withDB';
import Message from '@/models/Message';
import { getConversations } from '@/controllers/messagesController';


export const GET =  withDB(async(req) => {


     const authResult = await auth(req);
     if (authResult instanceof NextResponse) return authResult;
     const { user } = authResult;
     const result = await getConversations(user);
       if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json(result);

})
