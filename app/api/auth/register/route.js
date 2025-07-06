import { withDB } from '@/middlewares/withDB';
import { register } from '@/controllers/authControllers';

export const POST = withDB(register);