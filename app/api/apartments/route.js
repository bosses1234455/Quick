import { withDB } from "@/middlewares/withDB";
import {postApartment } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";

export const POST = withDB(auth(postApartment));