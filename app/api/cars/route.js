import { withDB } from "@/middlewares/withDB";
import { postCar } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getCars } from "@/controllers/postController";
import { NextResponse } from 'next/server';
// import { deleteCar } from "@/controllers/deleteController";


// export const POST = withDB(auth(postCar));
export const GET = withDB(getCars);
export const POST = withDB(async (req) => {
    const user = await auth(req);

    if (user instanceof NextResponse) {
      return user;
    }
  
    return postCar(req, user);
});

// export const DELETE = withDB(async (req) => {
//   const { searchParams } = new URL(req.url);
//   const bookId = searchParams.get('id');

//   if (!bookId) {
//     return NextResponse.json(
//       { error: 'book ID is required' },
//       { status: 400 }
//     );
//   }

//   const authResult = await auth(req);
//   if (authResult instanceof NextResponse) return authResult;
//   const { user } = authResult;
//   return deleteCar(bookId, user);
// });