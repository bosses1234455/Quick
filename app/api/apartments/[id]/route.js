import { withDB } from "@/middlewares/withDB";
import { getAparmentDetails } from "@/controllers/detailsController";
import { auth } from '@/middlewares/auth';
// import { deleteApartment } from "@/controllers/deleteController";
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

// export async function DELETE(req, { params }) {
//     // const url = new URL(req.url);
//     // const postId = url.searchParams.get('postId');
//     // const postType = url.searchParams.get('postType');
//     const {id:postId} = await params; 
//     console.log(postId) 
//     const postType = 'apartments'
//     const authResult = await auth(req);
    
//     if ('error' in authResult) {
//         return authResult; // Returns the error response
//     }
    
//     return withDB(() => deletePost(postId, postType, authResult.user));
// }