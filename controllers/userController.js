import User from '@/models/User';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const getUser = async (req, {params}) => {
    try {
        // await Promise.resolve();
        const {id:UserId} = await params;
        
        if (!UserId) {
          return NextResponse.json(
            { error: 'user ID is required' },
            { status: 400 }
          );}
    
        const user = await User.findById(UserId)
    
        if (!User) {
          return NextResponse.json(
            { error: 'user not found' },
            { status: 404 }
          );
    
        }
        const response = {
          id: user._id,
          email: user.mail,
          username: user.username,
          phone: user.phone_num
        };
    
        return NextResponse.json(
          { success: true, data: response },
          { status: 200 }
        );
    
      } catch (error) {
        console.error('[GET_USER_DETAILS_ERROR]', error);
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
      }
    }

    
export const updateUser = async (userId, updateData, user) => {
  try {
    // 1. Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 }
      );
    }

    // 2. Check if user is updating their own profile
    if (user._id.toString() !== userId) {
      return NextResponse.json(
        { error: 'You can only update your own profile' },
        { status: 403 }
      );
    }

    // 3. Validate update data
    if (!updateData || Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' },
        { status: 400 }
      );
    }
 
    // 4. Allowed fields check
    const allowedUpdates = ['email', 'username', 'phone_num', 'password'];
    const updates = Object.keys(updateData);
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return NextResponse.json(
        { error: 'Invalid update fields' },
        { status: 400 }
      );
    }
 
    // 5. Email uniqueness check
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }
    }

    // 6. Password hashing
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // 7. Perform update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 8. Return response without sensitive data
    const responseData = {
      id: updatedUser._id,
      email: updatedUser.email,
      username: updatedUser.username,
      phone_num: updatedUser.phone_num,
    };

    return NextResponse.json(
      { success: true, data: responseData },
      { status: 200 }
    );

  } catch (error) {
    console.error('FULL ERROR OBJECT:', error);
    console.error('ERROR STACK:', error.stack);

    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
};
