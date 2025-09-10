


import { useState, useEffect } from 'react'

const Sort = ({ listType, onSortChange,savedSortOption  }) => {
  const [sortOption, setSortOption] = useState(savedSortOption || 'date_desc');

  const sortConfig = {
    apartments: [
      { value: 'price_asc', label: 'Price ▲' },
      { value: 'price_desc', label: 'Price ▼' },
      { value: 'date_desc', label: 'Newest ▲' },
      { value: 'date_asc', label: 'Oldest ▲' },
      { value: 'rooms_asc', label: 'Rooms ▲' },
      { value: 'rooms_desc', label: 'Rooms ▼' },
      { value: 'space_asc', label: 'Space ▲' },
      { value: 'space_desc', label: 'Space ▼' }
    ],
    cars: [
      { value: 'price_asc', label: 'Price ▲' },
      { value: 'price_desc', label: 'Price ▼' },
      { value: 'date_desc', label: 'Newest ▲' },
      { value: 'date_asc', label: 'Oldest ▲' },
      { value: 'year_desc', label: 'Year ▼' },
      { value: 'year_asc', label: 'Year ▲' },
      { value: 'milage_asc', label: 'Mileage ▲' },
      { value: 'milage_desc', label: 'Mileage ▼' }
    ],
    laptops: [
      { value: 'price_asc', label: 'Price ▲' },
      { value: 'price_desc', label: 'Price ▼' },
      { value: 'date_desc', label: 'Newest ▲' },
      { value: 'date_asc', label: 'Oldest ▲' }
    ],
    books: [
      { value: 'price_asc', label: 'Price ▲' },
      { value: 'price_desc', label: 'Price ▼' },
      { value: 'date_desc', label: 'Newest ▲' },
      { value: 'date_asc', label: 'Oldest ▲' }
    ]
  }

   useEffect(() => {
    if(savedSortOption) {setSortOption(savedSortOption); return;}
    setSortOption('date_desc');
  }, [listType,savedSortOption])

  const handleSortChange = (value) => {
    setSortOption(value)
    onSortChange(value)
  }

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold mb-2">Sort</h2>
      <div className="grid grid-cols-2 gap-2">
        {sortConfig[listType]?.map((option) => (
          <label
            key={option.value}
            className={`flex justify-center items-center h-10 w-full text-sm rounded-md cursor-pointer transition-colors ${
              sortOption === option.value
                ? 'bg-blue-100 text-blue-800'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
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
  )
}

export default Sort
