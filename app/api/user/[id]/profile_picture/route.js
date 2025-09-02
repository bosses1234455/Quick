import { withDB } from "@/middlewares/withDB";
import { changeProfilePic } from "@/controllers/userController";
import { auth } from "@/middlewares/auth";


export const PATCH = async (req, context) => {
    const { id } = await context.params;     // await params!
    // const body = await request.json();       // parse JSON body
  
    const authResult = await auth(req);
    if ('error' in authResult) return authResult;  // return error response if any
  
    // const user = authResult.user;             // authenticated user info
  
    // Call controller with explicit args
    return withDB(() => changeProfilePic(id, req))();
  };;

