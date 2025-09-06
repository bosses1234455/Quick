import { withDB } from "@/middlewares/withDB";
import { getAparmentDetails } from "@/controllers/detailsController";
import { auth } from '@/middlewares/auth';

import { NextResponse } from 'next/server';
import { deletePost } from "@/controllers/deleteController";

export const GET = withDB(getAparmentDetails);
export const DELETE = withDB(async (req, context) => {
    const { id:postId } = await context.params;
    const postType = 'apartment'
    const authResult = await auth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;
    return deletePost(postId,postType, user);
  });
