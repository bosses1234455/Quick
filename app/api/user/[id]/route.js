import { withDB } from "@/middlewares/withDB";
import { auth } from "@/middlewares/auth";
import { getUser, updateUser } from "@/controllers/userController"


export const GET = withDB(getUser);

export const PATCH = async (request, context) => {
    const { id } = await context.params;     // await params!
    const body = await request.json();       // parse JSON body
  
    const authResult = await auth(request);
    if ('error' in authResult) return authResult;  // return error response if any
  
    const user = authResult.user;             // authenticated user info
  
    // Call controller with explicit args
    return withDB(() => updateUser(id, body, user))();
  };