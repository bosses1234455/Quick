
import { NextResponse } from 'next/server'

import models from '@/models'


export const deletePost = async (postId,postType,user) => {
   try {
      if(!postType) {
        return NextResponse.json(
          {error: 'post type is required'},
          {status: 400}
        );
      }
      const modelName = postType.charAt(0).toUpperCase() + postType.slice(1);
  
     
      const post = await models[modelName].findById(postId);
      if (!post) {
        return NextResponse.json(
          { error: `${postType} not found` },
          { status: 404 }
        );
      }
    
  
      console.log(`Found ${postType}:`, post);

      console.log("Authenticated user ID:", user?._id?.toString());

    
  

      if (!user?._id || post.seller_id?.toString() !== user._id.toString()) {
        return NextResponse.json(
          { error: 'Unauthorized - You are not the owner of this car' },
          { status: 403 }
        );
      }
  
      await models[modelName].findByIdAndDelete(postId);
  
      return NextResponse.json(
        {
          success: true,
          message: 'Car deleted successfully',
          [postType]: {
            id: post._id,
            seller_id: post.seller_id,
            deletedAt: new Date()
          }
        },
        { status: 200 }
      );
    } catch (err) {
      console.error('Error deleting car:', err);
      return NextResponse.json(
        { error: `Failed to delete ${postType}`, details: err.message },
        { status: 500 }
      );
    }
}


