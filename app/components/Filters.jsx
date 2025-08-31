
///////////////////////////////////////////


import { useState, useEffect } from 'react';
import { locations, muhafazat, brand, laptop, rams, bookTypes, condition, models } from '../data/data';

const Filters = ({ listType, onFilterChange,setSubmitFilters }) => {
  const [filters, setFilters] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');

  const filterConfig = {
    apartments: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'minSpace', label: 'Min space', type: 'number' },
      { name: 'maxSpace', label: 'Max space', type: 'number' },
      { name: 'rooms', label: 'Rooms', type: 'select', options: ['1', '2', '3', '4+'] },
      { name: 'condetion', label: 'Condetion', type: 'select', options: condition },
      { name: 'furnished', label: 'Furnished', type: 'boolean' },
      { name: 'sell', label: 'for sale', type: 'boolean' },
      { name: 'location', label: 'Location', type: 'select', options: locations },
    ],
    cars: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'minYear', label: 'Min Year', type: 'number' },
      { name: 'maxYear', label: 'Max Year', type: 'number' },
      { name: 'minMileage', label: 'Min Mileage', type: 'number' },
      { name: 'maxMileage', label: 'Max Mileage', type: 'number' },
      { name: 'brand', label: 'Brand', type: 'select', options: brand },
      { name: 'model', label: 'Model', type: 'select', options: [] },
      { name: 'location', label: 'Location', type: 'select', options: muhafazat }
    ],
    laptops: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'brand', label: 'Brand', type: 'select', options: laptop },
      { name: 'ram', label: 'RAM', type: 'select', options: rams },
      { name: 'location', label: 'Location', type: 'select', options: muhafazat },
      { name: 'new', label: 'New', type: 'boolean' }
    ],
    books: [
      { name: 'minPrice', label: 'Min Price', type: 'number' },
      { name: 'maxPrice', label: 'Max Price', type: 'number' },
      { name: 'type', label: 'Type', type: 'select', options: bookTypes },
      { name: 'location', label: 'Location', type: 'select', options: muhafazat }
    ]
  };

  useEffect(() => {
    setSelectedBrand('');
    setFilters({});
  }, [listType]);



  const handleFilterChange = (name, value) => {
    // Convert value to number if it's numeric
    let newValue = value;
    if (!isNaN(value) && value !== '') {
      newValue = Number(value);
      if (newValue < 0) return; // Don't allow negative numbers
    }
  
    const newFilters = { ...filters, [name]: newValue };
  
    // ✅ Reset model when brand changes
    if (name === "brand") {
      newFilters.model = "";
      setSelectedBrand(newValue);
    }
  
    // Validate min/max
    if (name.startsWith('min')) {
      const maxName = name.replace('min', 'max');
      if (newFilters[maxName] !== undefined && newFilters[maxName] !== '' && newFilters[maxName] < newValue) {
        newFilters[maxName] = newValue;
      }
    } else if (name.startsWith('max')) {
      const minName = name.replace('max', 'min');
      if (newFilters[minName] !== undefined && newFilters[minName] !== '' && newFilters[minName] > newValue) {
        newFilters[minName] = newValue;
      }
    }
  
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  


  // Helper to check if two inputs are "Min" and "Max" pair
  const isMinMaxPair = (index, array, filter) => {
    return (
      filter.name.startsWith("min") &&
      array[index + 1] &&
      array[index + 1].name === filter.name.replace("min", "max")
    );
  };

  return (
    <div className="mb-4 text-sm">
      <h2 className="text-xl font-semibold mb-2">Filters</h2>
      <div className="space-y-2">
        {filterConfig[listType]?.map((filter, index, arr) => {
          // Handle Min/Max pair
          if (isMinMaxPair(index, arr, filter)) {
            const maxFilter = arr[index + 1];
            return (
              <div key={filter.name} className="flex gap-2">
                {[filter, maxFilter].map(f => (
                  <div key={f.name} className="flex-1 flex flex-col">
                    <label className="text-xs font-medium">{f.label}</label>
                    <input
                      type="number"
                      className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                      value={filters[f.name] || ''}
                      onChange={e => handleFilterChange(f.name, e.target.value)}
                      placeholder={f.label}
                    />
                  </div>
                ))}
              </div>
            );
          }

          // Skip rendering max filter, it was handled in the pair
          if (filter.name.startsWith("max") && arr[index - 1].name === filter.name.replace("max", "min")) {
            return null;
          }

          return (
            <div key={filter.name} className="flex flex-col">
              <label className="text-xs font-medium">{filter.label}</label>
              {filter.type === 'select' && (
                <select
                  className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                  value={filters[filter.name] || ''}
                  onChange={e => handleFilterChange(filter.name, e.target.value)}
                  disabled={filter.name === "model" && !selectedBrand}
                >
                  <option value="">All</option>
                  {filter.name === "model"
                    ? selectedBrand && models[selectedBrand]?.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))
                    : filter.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))
                  }
                </select>
              )}
              {filter.type === 'boolean' && (
                <label className="inline-flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={filters[filter.name] || false}
                    onChange={e => handleFilterChange(filter.name, e.target.checked)}
                  />
                  <span className="text-xs">Yes</span>
                </label>
              )}
              {filter.type === 'number' && (
                <input
                  type="number"
                  className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-400 text-sm"
                  value={filters[filter.name] || ''}
                  onChange={e => handleFilterChange(filter.name, e.target.value)}
                  placeholder={filter.label}
                />
              )}
            </div>
          );
        })}
      </div>
      <button 
      className='w-[100%] mt-4 p-1.5 rounded-md cursor-pointer opacity-70 hover:opacity-100 bg-blue-800 text-white'
      onClick={() => setSubmitFilters(e => !e)}>apply filters</button>
    </div>
  );
};

export default Filters;

