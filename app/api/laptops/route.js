import { withDB } from "@/middlewares/withDB";
import { postLaptop } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getLaptops } from "@/controllers/postController";

export const POST = withDB(auth(postLaptop));
export const GET = withDB(getLaptops);