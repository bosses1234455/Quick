import { withDB } from "@/middlewares/withDB";
import {postApartment } from "@/controllers/formsController";
import {getApartments} from "@/controllers/postController"
import { auth } from "@/middlewares/auth";

export const POST = withDB(auth(postApartment));
export const GET = withDB(getApartments);