import { withDB } from "@/middlewares/withDB";
import { postCar } from "@/controllers/formsController";
import { getCars } from "@/controllers/postController";

export const POST = withDB(postCar);
export const GET = withDB(getCars);