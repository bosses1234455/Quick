'use client'
import Link from 'next/link';
import { LoadingSkeleton } from './LoadingSkeleton';
import Post from './Post';
import { useState,useEffect } from 'react';

const PostsFetch = ({listType}) => {
    const [posts,setPosts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [pageNum,setPageNum] = useState(1); 
    const fetchPosts = async (page=1,limit=20) => {
    try {
      const res = await fetch(`/api/${listType}?page=${page}&limit=${limit}`,{
        method: 'GET'
      })
      const arr = await res.json()
      
      setPosts([...posts,...arr[listType]]);
    } catch (error) {
      console.log(error);
    }
  } 
    useEffect(() => {
    fetchPosts(pageNum);
    posts ? setIsLoading(false) : null 
  },[pageNum])
  
  if (isLoading) {
    return (
        <LoadingSkeleton />
    );
  }

  if ((!posts || posts.length === 0) && !isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No {listType} found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="car-list">
     {posts?.map(e => {
        return <Link href={`/post/${e.id}`}>
          <Post img={e.images[0]} key={e.id} title={e.title} cat={listType} date={e.date} location={e.location} />
        </Link>
      })}
      <div className='flex justify-center'>
        <button 
        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer'
        onClick={() => setPageNum(pageNum+1)}
        >Load more posts</button>
      </div>
    </div>
  )
}

export default PostsFetch
