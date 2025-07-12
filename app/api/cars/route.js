import { withDB } from "@/middlewares/withDB";
import { postCar } from "@/controllers/formsController";

export const POST = withDB(postCar);