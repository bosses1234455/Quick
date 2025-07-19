import { withDB } from "@/middlewares/withDB";
import {postApartment } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getApartments } from "@/controllers/postController";
import { NextResponse } from 'next/server';
// import { deleteApartment } from "@/controllers/deleteController";

// export const POST = withDB(auth(postApartment));
export const GET = withDB(getApartments);

export const POST = withDB(async (req) => {
    const user = await auth(req);

    if (user instanceof NextResponse) {
      return user;
    }
  
    return postApartment(req, user);
  });

  // export const DELETE = withDB(async (req) => {
  //   const { searchParams } = new URL(req.url);
  //   const apartmentId = searchParams.get('id');
  
  //   if (!apartmentId) {
  //     return NextResponse.json(
  //       { error: 'apartment ID is required' },
  //       { status: 400 }
  //     );
  //   }
  
  //   const authResult = await auth(req);
  //   if (authResult instanceof NextResponse) return authResult;
  //   const { user } = authResult;
  //   return deleteApartment(apartmentId, user);
  // });