import { withDB } from "@/middlewares/withDB";
import { postBook } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getBooks } from "@/controllers/postController";

export const POST = withDB(auth(postBook));
export const GET = withDB(getBooks);