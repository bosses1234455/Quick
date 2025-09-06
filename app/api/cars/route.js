import { withDB } from "@/middlewares/withDB";
import { postCar } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getCars } from "@/controllers/postController";
import { NextResponse } from 'next/server';

export const GET = withDB(getCars);
export const POST = withDB(async (req) => {
    const user = await auth(req);

    if (user instanceof NextResponse) {
      return user;
    }
  
    return postCar(req, user);
});
