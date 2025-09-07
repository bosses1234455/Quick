import { withDB } from "@/middlewares/withDB";
import {getBookDetails} from "@/controllers/detailsController"
import { deletePost } from "@/controllers/deleteController";
import { auth } from '@/middlewares/auth';
import { NextResponse } from 'next/server';

export const GET = withDB(getBookDetails);


export const DELETE = withDB(async (req, context) => {
    const { id:postId } = await context.params;
    const postType = 'book'
    const authResult = await auth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;
    return deletePost(postId,postType, user);
  });