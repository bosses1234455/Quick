import { withDB } from '@/middlewares/withDB';
import { updateUser } from '@/controllers/userController';

export const POST = withDB(updateUser);