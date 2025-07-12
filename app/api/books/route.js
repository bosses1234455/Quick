import { withDB } from "@/middlewares/withDB";
import { postBook } from "@/controllers/formsController";

export const POST = withDB(postBook);