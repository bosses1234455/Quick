import { useState, useEffect } from 'react'

const Filters = ({ listType, onFilterChange }) => {
  const [filters, setFilters] = useState({});

  const filterConfig = {
    apartments: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'rooms', label: 'Rooms', type: 'select', options: ['1', '2', '3', '4+'] },
      { name: 'furnished', label: 'Furnished', type: 'boolean' },
      { name: 'sell', label: 'for sale', type: 'boolean' }
    ],
    cars: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'brand', label: 'Brand', type: 'select', options: ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Other'] },
      { name: 'year', label: 'Year', type: 'select', options: ['2024', '2023', '2022', '2021', '2020', 'Older'] }
    ],
    laptops: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'brand', label: 'Brand', type: 'select', options: ['Apple', 'Dell', 'HP', 'Lenovo', 'Other'] },
      { name: 'ram', label: 'RAM', type: 'select', options: ['4GB', '8GB', '16GB', '32GB+'] }
    ],
    books: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'type', label: 'Type', type: 'select', options: ['Textbook', 'Fiction', 'Non-Fiction', 'Other'] },
      { name: 'condition', label: 'Condition', type: 'select', options: ['New', 'Like New', 'Good', 'Fair'] }
    ]
  };

  useEffect(() => {
    setFilters({}); // Reset filters when listType changes
  }, [listType]);

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="space-y-4">
        {filterConfig[listType]?.map((filter) => (
          <div key={filter.name} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{filter.label}</label>
            {filter.type === 'select' ? (
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters[filter.name] || ''}
                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : filter.type === 'boolean' ? (
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={filters[filter.name] || false}
                  onChange={(e) => handleFilterChange(filter.name, e.target.checked)}
                />
                <span className="ml-2">Yes</span>
              </label>
            ) : (
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters[filter.name] || ''}
                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                placeholder={`Enter ${filter.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
