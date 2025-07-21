'use client'
import Link from 'next/link';
import { LoadingSkeleton } from './LoadingSkeleton';
import Post from './Post';
import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const PostsFetch = ({ listType, id, filters, sortOption }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [tokenId,setTokenId] = useState('');

    const buildQueryString = (page, limit) => {
        const queryParams = new URLSearchParams({
            page: page,
            limit: limit,
            sort: sortOption || 'date_desc'
        });

        // Add ID if it exists
        if (id) queryParams.append('id', id);

        // Add filters if they exist
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    queryParams.append(key, value);
                }
            });
        }

        return queryParams.toString();
    };

    const fetchPosts = async (page = 1, limit = 20) => {
        setIsLoading(true);
        try {
            const queryString = buildQueryString(page, limit);
            const res = await fetch(`/api/${listType}?${queryString}`, {
                method: 'GET'
            });
            const arr = await res.json();
            if (arr[listType].length === 0) {
                setHasMore(false);
            } else {
                setPosts(prev => page === 1 ? arr[listType] : [...prev, ...arr[listType]]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostDel = async (postId) => {
        try {
            // const token = Cookies.get('token');
            if (!tokenId) {
                console.error('No token found');
                return;
            }

            const response = await fetch(`/api/${listType}/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // This will send cookies with the request
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete post');
            }

            // Remove the deleted post from the state
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        setPosts([]);
        setPageNum(1);
        setHasMore(true);
        fetchPosts(1);
    }, [listType, filters, sortOption]); // Add filters and sortOption to dependencies

    useEffect(() => {
        if (pageNum > 1) {
            fetchPosts(pageNum);
        }
    }, [pageNum]);
    useEffect(() => {
         const token = Cookies.get('token');
         const c = token ? jwtDecode(token) : '';
         setTokenId(c.userId);
    },[])

    if (isLoading && posts.length === 0) {
        return <LoadingSkeleton />;
    }

    if (!isLoading && posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg shadow-sm">
                <p className="text-xl text-gray-600 font-medium mb-4">No {listType} found</p>
                <p className="text-gray-400">Be the first to post in this category</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-2xl" data-testid="car-list">
            <div className="flex flex-col space-y-6">
                {posts?.map(e => (
                    <div key={e.id}>
                        <Link 
                            href={`/post/${listType}/${e.id}`}        
                            className="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                        >
                            <Post 
                                img={e.images[0]} 
                                title={e.title} 
                                cat={listType} 
                                date={e.date} 
                                location={e.location} 
                            />
                        </Link>
                        {(tokenId == e.seller_id) && 
                            <FaTrash 
                                size={24} 
                                color='black' 
                                className="cursor-pointer hover:text-red-600 transition-colors duration-200"
                                onClick={() => {
                                    // e.preventDefault(); // Prevent Link navigation
                                    handlePostDel(e.id);
                                }}
                            />
                        }
                    </div>
                ))}
            </div>
            
            {hasMore && (
                <div className="flex justify-center mt-12 mb-6">
                    <button 
                        className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium
                                 hover:bg-blue-700 transition-colors duration-300 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transform active:scale-95"
                        onClick={() => setPageNum(prev => prev + 1)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </span>
                        ) : 'Load more posts'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default PostsFetch;
