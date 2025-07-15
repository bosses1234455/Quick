import { withDB } from "@/middlewares/withDB";
import {postApartment } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getApartments } from "@/controllers/postController";

export const POST = withDB(auth(postApartment));
export const GET = withDB(getApartments);