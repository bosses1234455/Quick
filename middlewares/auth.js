import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

// export const auth = (handler) => async (req) => {
//   try {
//     // Get token from cookies
//     const token = req.cookies.get('token')?.value;
//     console.log('Token from cookies:', token);

//     if (!token) {
//       return NextResponse.json(
//         { error: 'No token, authorization denied' },
//         { status: 401 }
//       );
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Get user from database
//     const user = await User.findById(decoded.userId).select('-password');
//     if (!user) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 401 }
//       );
//     }

//     // Store user in the request
//     req.user = user;

//     return handler(req);
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     return NextResponse.json(
//       { error: 'Token is not valid' },
//       { status: 401 }
//     );
//   }
// };



export const auth = async (req) => {
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

    // Find user in DB (exclude password)
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    // Return user object (not mutate request)
    return { user };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { error: 'Token is not valid' },
      { status: 401 }
    );
  }
};