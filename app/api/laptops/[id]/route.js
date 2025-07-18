import { withDB } from "@/middlewares/withDB";
import {getLaptopDetails} from "@/controllers/detailsController"
import { deleteLaptop } from "@/controllers/deleteController";
import { auth } from '@/middlewares/auth';
import { NextResponse } from 'next/server';

export const GET = withDB(getLaptopDetails);

export const DELETE = withDB(async (req, context) => {
    const { id } = await context.params;
    const authResult = await auth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;
    return deleteLaptop(id, user);
  });