import { useState, useEffect } from 'react'

const Sort = ({ listType, onSortChange }) => {
  const [sortOption, setSortOption] = useState('date_desc');

  const sortConfig = {
    apartments: [
      { value: 'price_asc', label: 'Price: Low to High' },
      { value: 'price_desc', label: 'Price: High to Low' },
      { value: 'date_desc', label: 'Newest First' },
      { value: 'date_asc', label: 'Oldest First' },
      { value: 'rooms_asc', label: 'Rooms: Low to High' },
      { value: 'rooms_desc', label: 'Rooms: High to Low' }
    ],
    cars: [
      { value: 'price_asc', label: 'Price: Low to High' },
      { value: 'price_desc', label: 'Price: High to Low' },
      { value: 'date_desc', label: 'Newest First' },
      { value: 'date_asc', label: 'Oldest First' },
      { value: 'year_desc', label: 'Year: Newest First' },
      { value: 'year_asc', label: 'Year: Oldest First' }
    ],
    laptops: [
      { value: 'price_asc', label: 'Price: Low to High' },
      { value: 'price_desc', label: 'Price: High to Low' },
      { value: 'date_desc', label: 'Newest First' },
      { value: 'date_asc', label: 'Oldest First' }
    ],
    books: [
      { value: 'price_asc', label: 'Price: Low to High' },
      { value: 'price_desc', label: 'Price: High to Low' },
      { value: 'date_desc', label: 'Newest First' },
      { value: 'date_asc', label: 'Oldest First' }
    ]
  };

  useEffect(() => {
    setSortOption('date_desc'); // Reset to default when listType changes
  }, [listType]);

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sort</h2>
      <div className="space-y-2">
        {sortConfig[listType]?.map((option) => (
          <label
            key={option.value}
            className={`block p-2 rounded-lg cursor-pointer transition-colors ${sortOption === option.value ? 'bg-blue-100 text-blue-800' : 'bg-white hover:bg-gray-50'}`}
          >
            <input
              type="radio"
              name="sort"
              value={option.value}
              checked={sortOption === option.value}
              onChange={(e) => handleSortChange(e.target.value)}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sort;
