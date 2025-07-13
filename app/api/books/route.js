import { withDB } from "@/middlewares/withDB";
import { postBook } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";

export const POST = withDB(auth(postBook));