import { withDB } from "@/middlewares/withDB";
import {postApartment } from "@/controllers/formsController";
import { auth } from "@/middlewares/auth";
import { getApartments } from "@/controllers/postController";
import { NextResponse } from 'next/server';

export const GET = withDB(getApartments);

export const POST = withDB(async (req) => {
    const user = await auth(req);

    if (user instanceof NextResponse) {
      return user;
    }
  
    return postApartment(req, user);
  });
