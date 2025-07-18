'use client'
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

// Define type-specific fields mapping
const TYPE_FIELDS = {
  cars: [
    { label: 'Brand', key: 'brand' },
    { label: 'Model', key: 'model' },
    { label: 'Year', key: 'year' },
  ],
  apartments: [
    { label: 'Room Count', key: 'room_count' },
    { label: 'Furnished', key: 'furnished', format: (value) => value ? 'Yes' : 'No' },
    { label: 'Size (m²)', key: 'size' },
  ],
  laptops: [
    { label: 'Brand', key: 'brand' },
    { label: 'RAM', key: 'ram', format: (value) => `${value}GB` },
    { label: 'Processor', key: 'processor' },
  ],
  books: [
    { label: 'Author', key: 'author' },
    { label: 'Type', key: 'type' },
    { label: 'Condition', key: 'state' },
  ],
};

export default function PostDetail() {
  const { id } = useParams();
  const pathname = usePathname();
  const [currentImage, setCurrentImage] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postType = pathname.split('/')[2];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/${postType}/${id}`, {
          method: 'GET'
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Failed to fetch ${postType}`);
        }

        const { data } = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, postType]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center p-8">No {postType} data found</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Image Gallery */}
          <div className="relative w-full h-96 bg-gray-200 rounded-lg mb-4">
            {post.images?.[currentImage] && (
              <Image
                src={post.images[currentImage]}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          <div className="flex w-full justify-center gap-2.5 mb-4">
            <button 
              onClick={() => {
                currentImage - 1 >= 0 ? setCurrentImage(currentImage - 1) : setCurrentImage(post.images.length - 1);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeftLong />
            </button>
            <button 
              onClick={() => {
                currentImage + 1 < post.images.length ? setCurrentImage(currentImage + 1) : setCurrentImage(0);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowRightLong />
            </button>
          </div>
          
          {/* Description */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{post.description || "No description provided"}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <div className="space-y-2">
              {/* Common fields */}
              <p><strong>Location:</strong> {post.location}</p>
              <p><strong>Price:</strong> ${post.price?.toLocaleString()}</p>
              
              {/* Type-specific fields */}
              {TYPE_FIELDS[postType]?.map(({ label, key, format }) => (
                <p key={key}>
                  <strong>{label}:</strong> {format ? format(post[key]) : post[key]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

