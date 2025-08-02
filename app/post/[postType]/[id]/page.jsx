'use client'
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { useAuth } from '@/app/context/AuthContext';

const CarDetails = ({ post }) => (
  <div className="space-y-2">
    <p><strong>Location:</strong> {post.location}</p>
    <p><strong>Price:</strong> ${post.price?.toLocaleString()}</p>
    <p><strong>Brand:</strong> {post.brand}</p>
    <p><strong>Model:</strong> {post.model}</p>
    <p><strong>Year:</strong> {post.year}</p>
  </div>
);

const ApartmentDetails = ({ post }) => (
  <div className="space-y-2">
    <p><strong>Location:</strong> {post.location}</p>
    <p><strong>Price:</strong> ${post.price?.toLocaleString()}</p>
    <p><strong>Room Count:</strong> {post.roomCount}</p>
    <p><strong>Furnished:</strong> {post.furnished ? 'Yes' : 'No'}</p>
    <p><strong>Size (m²):</strong> {post.space}</p>
  </div>
);

const LaptopDetails = ({ post }) => (
  <div className="space-y-2">
    <p><strong>Location:</strong> {post.location}</p>
    <p><strong>Price:</strong> ${post.price?.toLocaleString()}</p>
    <p><strong>Brand:</strong> {post.brand}</p>
    <p><strong>RAM:</strong> {post.ram}GB</p>
    <p><strong>Processor:</strong> {post.processor}</p>
  </div>
);

const BookDetails = ({ post }) => (
  <div className="space-y-2">
    <p><strong>Location:</strong> {post.location}</p>
    <p><strong>Price:</strong> ${post.price?.toLocaleString()}</p>
    <p><strong>Book Title:</strong> {post.bookTitle}</p>
    <p><strong>Type:</strong> {post.type}</p>
    <p><strong>Condition:</strong> {post.state}</p>
  </div>
);

export default function PostDetail() {
  const { id } = useParams();
  const pathname = usePathname();
  const [currentImage, setCurrentImage] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id:userId} = useAuth();

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

  const renderDetails = () => {
    switch(postType) {
      case 'cars':
        return <CarDetails post={post} />;
      case 'apartments':
        return <ApartmentDetails post={post} />;
      case 'laptops':
        return <LaptopDetails post={post} />;
      case 'books':
        return <BookDetails post={post} />;
      default:
        return null;
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center p-8">No {postType} data found</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>
      <Link className='flex items-center gap-2.5 my-2.5 flex-wrap' href={`/profile/${post.seller._id}`}>
        <RxAvatar size={36} /> Owners profile
      </Link>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative w-full h-96 bg-gray-200 rounded-lg mb-4">
            {post.images?.[currentImage] && (
              <Image
                src={post.images[currentImage]}
                alt={post.title}
                fill
                className="md:object-cover sm:object-fill"
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
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{post.description || "No description provided"}</p>
          </div>
        </div>
        

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            {renderDetails()}
            {(userId != post.seller._id) && 
            <div className='mt-7'>
              <Link 
                href={`/chat?postId=${post.id}&userId=${post.seller._id}&type=${postType}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Chat with Seller
              </Link>
            </div>
          } 
          </div>
        </div>
        
      </div>
    </div>
  );
}

