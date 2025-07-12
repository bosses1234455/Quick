import { withDB } from "@/middlewares/withDB";
import { postLaptop } from "@/controllers/formsController";

export const POST = withDB(postLaptop);