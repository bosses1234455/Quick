import { withDB } from "@/middlewares/withDB";
import { postBook } from "@/controllers/formsController";
import { getBooks } from "@/controllers/postController";
import { auth } from "@/middlewares/auth";

export const POST = withDB(auth(postBook));
export const GET = withDB(getBooks)
