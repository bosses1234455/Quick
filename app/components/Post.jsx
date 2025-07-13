import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Post = React.memo(({ car }) => {
  try {
    // Format price with commas
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(car.price || 0).replace('.00', '');

    // Format date (e.g., "May 15, 2023")
    const formattedDate = new Date(car.createdAt || Date.now()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return (
      <div 
        className="bg-gray-100 p-4 rounded-lg flex gap-4 hover:shadow-md transition-shadow duration-200"
        role="article"
        aria-label={`${car.brand || 'Car'} ${car.model || 'listing'}`}
      >
        {/* Car Image - using first image or placeholder */}
        <div className="w-64 h-40 bg-white rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={car.images?.[0] || '/Logo.png'} 
            width={256} 
            height={160} 
            className="w-full h-full object-cover"
            alt={`${car.brand || ''} ${car.model || ''}`}
            priority={false}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Title with Brand and Model */}
          <div className="bg-green-300 text-black py-1 px-4 rounded-full w-fit mb-2 truncate">
            {car.brand || 'Brand'} {car.model || 'Model'} {car.year ? `(${car.year})` : ''}
          </div>
          
          {/* Tags for Type and Location */}
          <div className="flex gap-2 mb-2 flex-wrap">
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm truncate">
              {car.type || 'N/A'}
            </span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm truncate">
              {car.location || 'Unknown'}
            </span>
          </div>
          
          {/* Price and Date */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {formattedPrice}
            </span>
            <span className="text-gray-600 text-sm">
              Posted: {formattedDate}
            </span>
          </div>
          
          {/* Rating/Star - placeholder for future implementation */}
          <div className="flex justify-end">
            <span className="text-gray-600 text-xl">★</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering Post:', error);
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-red-500 border border-red-300">
        Error displaying this car listing
      </div>
    );
  }
});

Post.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
    type: PropTypes.string,
    location: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    milage: PropTypes.number,
    description: PropTypes.string,
  }).isRequired
};

Post.defaultProps = {
  car: {
    brand: '',
    model: '',
    price: 0,
    images: [],
    type: 'N/A',
    location: 'Unknown',
    createdAt: new Date().toISOString()
  }
};

export default Post;