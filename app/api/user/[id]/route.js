import { withDB } from "@/middlewares/withDB";
import { auth } from "@/middlewares/auth";
import { getUser, updateUser } from "@/controllers/userController"


export const GET = withDB(getUser);

export const PATCH = async (request, context) => {
    const { id } = await context.params;     
    const body = await request.json();    
    const authResult = await auth(request);
    if ('error' in authResult) return authResult; 
  
    const user = authResult.user;        
  
    return withDB(() => updateUser(id, body, user))();
  };