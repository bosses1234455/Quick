import { withDB } from "@/middlewares/withDB";
import { postLaptop } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getLaptops } from "@/controllers/postController";
import { NextResponse } from 'next/server';
// import { deleteLaptop } from "@/controllers/deleteController";

// export const POST = withDB(auth(postLaptop));
export const GET = withDB(getLaptops);

export const POST = withDB(async (req) => {
    const user = await auth(req);

    if (user instanceof NextResponse) {
      return user;
    }
  
    return postLaptop(req, user);
  });

  // export const DELETE = withDB(async (req) => {
  //   const { searchParams } = new URL(req.url);
  //   const laptopId = searchParams.get('id');
  
  //   if (!laptopId) {
  //     return NextResponse.json(
  //       { error: 'laptop ID is required' },
  //       { status: 400 }
  //     );
  //   }
  
  //   const authResult = await auth(req);
  //   if (authResult instanceof NextResponse) return authResult;
  //   const { user } = authResult;
  //   return deleteLaptop(laptopId, user);
  // });