'use client'
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { useAuth } from '@/app/context/AuthContext';

// Updated all details components with grid layout and lighter labels

const CarDetails = ({ post }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* <div><span className="text-gray-600 font-medium">Location:</span> {post.location}</div> */}
    {/* <div><span className="text-gray-600 font-medium">Price:</span> ${post.price?.toLocaleString()}</div> */}
    <div><span className="text-gray-600 font-medium">Brand:</span> {post.brand}</div>
    <div><span className="text-gray-600 font-medium">Model:</span> {post.model}</div>
    <div><span className="text-gray-600 font-medium">Year:</span> {post.year}</div>
    <div><span className="text-gray-600 font-medium">Mileage:</span> {post.mileage}</div>
    <div><span className="text-gray-600 font-medium">Type:</span> {post.type}</div>
    <div><span className="text-gray-600 font-medium">Color:</span> {post.color}</div>
    <div><span className="text-gray-600 font-medium">Seat Number:</span> {post.seat_number}</div>
    <div><span className="text-gray-600 font-medium">Inner Condition:</span> {post.inner_condition}</div>
    <div><span className="text-gray-600 font-medium">Outer Condition:</span> {post.outer_condition}</div>
    {/* <div><span className="text-gray-600 font-medium">Ad Date:</span> {new Date(post.date).toLocaleDateString()}</div> */}
  </div>
);

const ApartmentDetails = ({ post }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* <div><span className="text-gray-600 font-medium">Location:</span> {post.location}</div> */}
    {/* <div><span className="text-gray-600 font-medium">Price:</span> ${post.price?.toLocaleString()}</div> */}
    <div><span className="text-gray-600 font-medium">Room Count:</span> {post.roomCount}</div>
    <div><span className="text-gray-600 font-medium">Bath Count:</span> {post.bathroomCount}</div>
    <div><span className="text-gray-600 font-medium">Condition:</span> {post.innerCondition}</div>
    <div><span className="text-gray-600 font-medium">Furnished:</span> {post.furnished ? 'Yes' : 'No'}</div>
    <div><span className="text-gray-600 font-medium">Size:</span> {post.space} m²</div>
    <div><span className="text-gray-600 font-medium">For Sale:</span> {post.forSale ? 'Yes' : 'No'}</div>
    <div><span className="text-gray-600 font-medium">Floor:</span> {post.floor}</div>
    {/* <div><span className="text-gray-600 font-medium">Ad Date:</span> {new Date(post.date).toLocaleDateString()}</div> */}
  </div>
);

const LaptopDetails = ({ post }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* <div><span className="text-gray-600 font-medium">Location:</span> {post.location}</div> */}
    {/* <div><span className="text-gray-600 font-medium">Price:</span> ${post.price?.toLocaleString()}</div> */}
    <div><span className="text-gray-600 font-medium">Storage:</span> {post.storage}</div>
    <div><span className="text-gray-600 font-medium">Brand:</span> {post.brand}</div>
    <div><span className="text-gray-600 font-medium">GPU:</span> {post.gpu}</div>
    {/* <div><span className="text-gray-600 font-medium">Ad Date:</span> {new Date(post.date).toLocaleDateString()}</div> */}
    <div><span className="text-gray-600 font-medium">RAM:</span> {post.ram} GB</div>
    <div><span className="text-gray-600 font-medium">Processor:</span> {post.processor}</div>
    <div><span className="text-gray-600 font-medium">new:</span> {post.new}</div>
  </div>
);

const BookDetails = ({ post }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* <div><span className="text-gray-600 font-medium">Location:</span> {post.location}</div> */}
    <div><span className="text-gray-600 font-medium">Author Name:</span> {post.name}</div>
    {/* <div><span className="text-gray-600 font-medium">Price:</span> ${post.price?.toLocaleString()}</div> */}
    <div><span className="text-gray-600 font-medium">Book Title:</span> {post.bookTitle}</div>
    <div><span className="text-gray-600 font-medium">Type:</span> {post.type}</div>
    <div><span className="text-gray-600 font-medium">Condition:</span> {post.state}</div>
    {/* <div><span className="text-gray-600 font-medium">Ad Date:</span> {new Date(post.date).toLocaleDateString()}</div> */}
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
  // console.log(post);
  
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

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center p-8">No {postType} data found</div>;
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>

      {/* Title Section */}
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        {post.title}
      </h1>

      {/* Image Container with hover effect */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-3xl aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden transition-shadow hover:shadow-lg">
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
      </div>

      {/* Thumbnail Previews with increased margin */}
      <div className="flex justify-center gap-2 mt-8 overflow-x-auto py-2">
        {post.images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative w-20 h-12 rounded-md overflow-hidden ${index === currentImage ? 'ring-2 ring-blue-500 p-0.5' : 'opacity-75 hover:opacity-100'}`}
            aria-label={`View image ${index + 1}`}
          >
            <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover rounded-md" />
          </button>
        ))}
      </div>

      {/* Image Navigation */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => {
            currentImage - 1 >= 0 ? setCurrentImage(currentImage - 1) : setCurrentImage(post.images.length - 1);
          }}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous image"
        >
          <FaArrowLeftLong size={20} />
        </button>
        <button 
          onClick={() => {
            currentImage + 1 < post.images.length ? setCurrentImage(currentImage + 1) : setCurrentImage(0);
          }}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next image"
        >
          <FaArrowRightLong size={20} />
        </button>
      </div>


      <div className="bg-gray-100 rounded-lg p-4 mt-6 flex flex-col sm:flex-row justify-around items-center text-center gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-bold">Price:</span> ${post.price?.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-bold">Location:</span> {post.location}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-bold">Date:</span> {new Date(post.date).toLocaleDateString()}
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700">{post.description}</p>
      </div>

      {/* Details Section with improved spacing */}
      <div className="bg-white rounded-xl items-center text-center shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        {renderDetails()}
      </div>

      {/* Seller Info and Chat with hover effects */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link 
          href={`/profile/${post.seller._id}`}
          className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors hover:scale-105"
        >
          <RxAvatar size={40} />
          <div>
            <p className="font-medium">Seller Profile</p>
            <p className="text-sm text-gray-500">{post.seller.name || 'View seller details'}</p>
          </div>
        </Link>
       { !(userId == post.seller._id) &&
        <Link 
          href={`/chat?postId=${post.id}&userId=${post.seller._id}&type=${postType}`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium hover:scale-105"
        >
          Chat with Seller
        </Link>
}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}