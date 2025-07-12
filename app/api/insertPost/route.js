import { withDB } from "@/middlewares/withDB";
import { postBook,postLaptop,postCar,postApartment } from "@/controllers/formsController";

export const POST = withDB(postBook);