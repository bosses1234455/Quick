import { withDB } from "@/middlewares/withDB";
import { changeProfilePic } from "@/controllers/userController";
import { auth } from "@/middlewares/auth";


export const PATCH = async (req, context) => {
    const { id } = await context.params;     

  
    const authResult = await auth(req);
    if ('error' in authResult) return authResult;
  
    return withDB(() => changeProfilePic(id, req))();
  };;

