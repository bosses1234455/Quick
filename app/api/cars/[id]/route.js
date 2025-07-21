import { withDB } from "@/middlewares/withDB";
import {getCarDetails} from "@/controllers/detailsController"
// import { deleteCar } from "@/controllers/deleteController";
import { deletePost } from "@/controllers/deleteController";
import { NextResponse } from 'next/server';
import { auth } from '@/middlewares/auth';

export const GET = withDB(getCarDetails);

// export const DELETE = withDB(async (req, context) => {
//     const { id } = await context.params;
//     const authResult = await auth(req);
//     if (authResult instanceof NextResponse) return authResult;
//     const { user } = authResult;
//     return deleteCar(id, user);
//   });
export const DELETE = withDB(async (req, context) => {
    const { id:postId } = await context.params;
    const postType = 'car'
    const authResult = await auth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;
    return deletePost(postId,postType, user);
  });