import { withDB } from "@/middlewares/withDB";
import { getAparmentDetails } from "@/controllers/detailsController";
import { auth } from '@/middlewares/auth';
import { deleteApartment } from "@/controllers/deleteController";
import { NextResponse } from 'next/server';

export const GET = withDB(getAparmentDetails);
export const DELETE = withDB(async (req, context) => {
    const { id } = await context.params;
    const authResult = await auth(req);
    if (authResult instanceof NextResponse) return authResult;
    const { user } = authResult;
    return deleteApartment(id, user);
  });