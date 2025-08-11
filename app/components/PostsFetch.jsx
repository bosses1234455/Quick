'use client'
import Link from 'next/link';
import { LoadingSkeleton } from './LoadingSkeleton';
import Post from './Post';
import { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

const PostsFetch = ({ listType, id, filters, sortOption }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    // const [tokenId,setTokenId] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, postId: null });
    const {id:userId} = useAuth();

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
            // console.log(res);
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
    console.log(posts);
    
    const handlePostDel = async (postId) => {
        // Show confirmation dialog instead of deleting immediately
        setDeleteConfirmation({ show: true, postId });
    };

    const confirmDelete = async () => {
        try {
            if (!userId) {
                console.error('No token found');
                return;
            }

            const response = await fetch(`/api/${listType}/${deleteConfirmation.postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                console.error('Failed to delete post');
                return;
            }

            // Remove the deleted post from the state
            setPosts(posts.filter(post => post.id !== deleteConfirmation.postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        } finally {
            // Hide confirmation dialog
            setDeleteConfirmation({ show: false, postId: null });
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
    // useEffect(() => {
    //     //  const token = Cookies.get('token');
    //     //  const c = token ? jwtDecode(token) : '';
    //      setTokenId(userId);
    // },[])

    if (isLoading && posts.length === 0) {
        return <LoadingSkeleton />;
    }

    // if (!isLoading && posts.length === 0) {
    //     return (
    //         <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg shadow-sm">
    //             <p className="text-xl text-gray-600 font-medium mb-4">No {listType} found</p>
    //             <p className="text-gray-400">Be the first to post in this category</p>
    //         </div>
    //     );
    // }

    return (
        <div className="container mx-auto px-4 py-6 max-w-2xl h-[100vh] overflow-y-scroll" data-testid="car-list">
            <div className="flex flex-col space-y-6">
                {posts?.map(e => (
                    <div key={e.id} className="relative group">
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
                                price={e.price}
                            />
                        </Link>
                        {(userId == e.seller_id) && (
                            <button 
                                className="absolute bottom-4 right-4 p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                                onClick={() => handlePostDel(e.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Confirmation Dialog */}
            {deleteConfirmation.show && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Delete Post</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                onClick={() => setDeleteConfirmation({ show: false, postId: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
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
