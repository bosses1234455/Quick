import { withDB } from "@/middlewares/withDB";
import { postBook } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getBooks } from "@/controllers/postController";
import { NextResponse } from 'next/server';
// import { deleteBook } from "@/controllers/deleteController";

// export const POST = withDB(auth(postBook));

export const GET = withDB(getBooks);
export const POST = async (req) => {
    const user = await auth(req);
  
    if (user instanceof NextResponse) {
      return user;
    }
  
    req.user = user;
  
    return withDB(() => postBook(req))();
  };

  // export const DELETE = withDB(async (req) => {
  //   const { searchParams } = new URL(req.url);
  //   const carId = searchParams.get('id');
  
  //   if (!carId) {
  //     return NextResponse.json(
  //       { error: 'Car ID is required' },
  //       { status: 400 }
  //     );
  //   }
  
  //   const authResult = await auth(req);
  //   if (authResult instanceof NextResponse) return authResult;
  //   const { user } = authResult;
  //   return deleteBook(carId, user);
  // });