import { withDB } from "@/middlewares/withDB";
import { getAparmentDetails } from "@/controllers/detailsController";

export const GET = withDB(getAparmentDetails);