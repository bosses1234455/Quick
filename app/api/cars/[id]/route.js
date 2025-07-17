import { withDB } from "@/middlewares/withDB";
import {getCarDetails} from "@/controllers/detailsController"

export const GET = withDB(getCarDetails);