import { withDB } from "@/middlewares/withDB";
import {getLaptopDetails} from "@/controllers/detailsController"

export const GET = withDB(getLaptopDetails);