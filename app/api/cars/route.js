import { withDB } from "@/middlewares/withDB";
import { postCar } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getCars } from "@/controllers/postController";

export const POST = withDB(auth(postCar));
export const GET = withDB(getCars);