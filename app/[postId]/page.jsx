'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    category: '',
    location: '',
    date: '',
    contactNumber: '',
    description: '',
    images: []
  });

  useEffect(() => {
    // Here you would typically fetch the post data using the id
    // For now, we'll use the mock data from the image
    setPost({
      title: 'Title jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
      category: 'cars',
      location: 'hama',
      date: '1 day ago',
      contactNumber: '099*****87',
      description: 'Description',
      images: ['/placeholder.jpg'] // Add actual image paths here
    });
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Section - Takes 2 columns */}
        <div className="md:col-span-2">
          <div className="relative w-full h-96 bg-gray-200 rounded-lg mb-8">
            {post.images.length > 0 && (
              <div className="relative w-full h-full">
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  fill
                  className="object-contain"
                />
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  ←
                </button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  →
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p>{post.description}</p>
          </div>
        </div>

        {/* Chat and Details Section - Takes 1 column */}
        <div className="space-y-6">
          {/* Chat Box */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Chat</h2>
            <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Login to chat
            </button>
          </div>

          {/* Details Box */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div>
              <strong>Category:</strong> {post.category}
            </div>
            <div>
              <strong>Location:</strong> {post.location}
            </div>
            <div>
              <strong>Date:</strong> {post.date}
            </div>
            <div>
              <strong>Contact number:</strong> {post.contactNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}