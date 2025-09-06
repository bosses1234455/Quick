import { withDB } from "@/middlewares/withDB";
import { postBook } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getBooks } from "@/controllers/postController";
import { NextResponse } from 'next/server';


export const GET = withDB(getBooks);
export const POST = async (req) => {
    const user = await auth(req);
  
    if (user instanceof NextResponse) {
      return user;
    }
  
    req.user = user;
  
    return withDB(() => postBook(req))();
  };

