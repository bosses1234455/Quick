import { withDB } from "@/middlewares/withDB";
import { postLaptop } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getLaptops } from "@/controllers/postController";

// export const POST = withDB(auth(postLaptop));
export const GET = withDB(getLaptops);

export const POST = withDB(async (req) => {
    const user = await auth(req);

    if (user instanceof NextResponse) {
      return user;
    }
  
    return postLaptop(req, user);
  });