import { withDB } from "@/middlewares/withDB";
import { postLaptop } from "@/controllers/formsController";
import { getLaptops } from "@/controllers/postController";
import { auth } from "@/middlewares/auth";

export const POST = withDB(auth(postLaptop));
export const GET = withDB(getLaptops);