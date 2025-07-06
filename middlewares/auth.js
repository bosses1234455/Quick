import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { withDB } from './withDB';

export const auth = withDB(async (req) => {
  try {
    // Get token from cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token, authorization denied' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    // Store user in the request
    req.user = user;

    return NextResponse.next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { error: 'Token is not valid' },
      { status: 401 }
    );
  }
});