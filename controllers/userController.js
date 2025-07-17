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

export const updateUser = async (req, { params }) => {
    try {
      const {id:userId} = await params;
      const updateData = await req.json();
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { error: 'Invalid user ID format' },
          { status: 400 }
        );
      }
  
      if (!updateData || Object.keys(updateData).length === 0) {
        return NextResponse.json(
          { error: 'No update data provided' },
          { status: 400 }
        );
      }
  
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

      if (updateData.email) {
        const existingUser = await User.findOne({ mail: updateData.email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return NextResponse.json(
            { error: 'Email already in use' },
            { status: 409 }
          );
        }
      }

      if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }
  
      const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
  
      const response = {
        id: user._id,
        email: user.mail,
        username: user.username,
        phone: user.phone_num,
        // updatedAt: user.updatedAt
      };
  
      return NextResponse.json(
        { success: true, data: response },
        { status: 200 }
      );
  
    } catch (error) {
      console.error('[UPDATE_USER_ERROR]', error);
      
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };