import { withDB } from "@/middlewares/withDB";
import { auth } from "@/middlewares/auth";
import { getUser } from "@/controllers/userController"
import { updateUser } from "@/controllers/userController"

export const GET = withDB(getUser);
export const PATCH = withDB(auth(updateUser));