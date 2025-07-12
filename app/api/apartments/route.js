import { withDB } from "@/middlewares/withDB";
import {postApartment } from "@/controllers/formsController";

export const POST = withDB(postApartment);