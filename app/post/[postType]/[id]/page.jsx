'use client'
import { useEffect, useState } from 'react';
import { useParams,usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function PostDetail() {
  const { id } = useParams();
  const pathname = usePathname();
  const [currentImage,setCurrentImage] = useState(0);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postType = pathname.split('/')[2];

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/${postType}/${id}`,{
          method: 'GET'
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch car');
        }

        const { data } = await res.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!car) return <div className="text-center p-8">No car data found</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Image Gallery */}
          <div className="relative w-full h-96 bg-gray-200 rounded-lg mb-4">
            {car.images?.[currentImage] && (
              <Image
                src={car.images[0]}
                alt={car.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
            <button onClick={() => {
              console.log(car.images)
              currentImage + 1 < car.images.length ? setCurrentImage(currentImage + 1) : setCurrentImage(0);
            }}>next</button>
          
          {/* Description */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{car.description || "No description provided"}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <div className="space-y-2">
              <p><strong>Brand:</strong> {car.brand}</p>
              <p><strong>Model:</strong> {car.model}</p>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Location:</strong> {car.location}</p>
              <p><strong>Price:</strong> ${car.price?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

