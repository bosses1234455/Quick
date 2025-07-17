import { withDB } from "@/middlewares/withDB";
import {getBookDetails} from "@/controllers/detailsController"

export const GET = withDB(getBookDetails);