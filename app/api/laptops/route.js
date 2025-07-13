import { withDB } from "@/middlewares/withDB";
import { postLaptop } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";

export const POST = withDB(auth(postLaptop));