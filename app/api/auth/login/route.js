import { withDB } from '@/middlewares/withDB';
import { login } from '@/controllers/authControllers';

export const POST = withDB(login);