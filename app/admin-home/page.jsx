'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminHome() {
  // Mock data - replace with actual DB fetch
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: '/Logo.png',
      title: 'Sample Post 1',
      category: 'Electronics',
      date: '2024-01-20',
      location: 'New York',
      status: 'pending' // 'pending', 'approved', 'rejected'
    },
    // Add more mock posts as needed
  ]);

  const handleAccept = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'approved' } : post
    ));
  };

  const handleReject = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'rejected' } : post
    ));
  };

  const handleFeature = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isFeatured: !post.isFeatured } : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={100}
            height={40}
            className="cursor-pointer"
          />
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex gap-6">
                {/* Post Image */}
                <div className="w-48 h-32 bg-gray-200 relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Post Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 bg-green-200 inline-block px-3 py-1 rounded">
                    {post.title}
                  </h2>
                  
                  <div className="flex gap-4 mb-2">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded text-sm">
                      {post.category}
                    </span>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                      {post.date}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                      {post.location}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleAccept(post.id)}
                      className="w-10 h-10 bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center"
                      disabled={post.status === 'approved'}
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => handleReject(post.id)}
                      className="w-10 h-10 bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                      disabled={post.status === 'rejected'}
                    >
                      X
                    </button>
                    <button
                      onClick={() => handleFeature(post.id)}
                      className={`w-10 h-10 flex items-center justify-center ${post.isFeatured ? 'bg-yellow-100' : 'bg-gray-100'}`}
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}