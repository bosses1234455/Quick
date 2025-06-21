'use client';

import { useState } from 'react';
import Image from 'next/image';
import {locations, brands, models, types, years, colors, doorOptions,seatOptions, conditions} from '../../data/data'

export default function CarForm() {

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    milage: '',
    type: '',
    color: '',
    doors: '',
    seat_number: '',
    outer_condition: '',
    inner_condition: '',
    description: '',
    images: [],
    location: '',
    price: '',
    title: ''
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset model when brand changes
      ...(name === 'brand' ? { model: '' } : {})
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-4 border-r border-gray-200 pr-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Car Brand</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!formData.brand}
                >
                  <option value="">Select Model</option>
                  {formData.brand && models[formData.brand].map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Year</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="milage" className="block text-sm font-medium text-gray-700 mb-1">Mileage (KM)</label>
                <input
                  id="milage"
                  type="number"
                  name="milage"
                  value={formData.milage}
                  onChange={handleInputChange}
                  placeholder="Enter mileage in kilometers"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Car Color</label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Color</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4 border-r border-gray-200 px-6">
              <div>
                <label htmlFor="doors" className="block text-sm font-medium text-gray-700 mb-1">Number of Doors</label>
                <select
                  id="doors"
                  name="doors"
                  value={formData.doors}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Number of Doors</option>
                  {doorOptions.map(num => (
                    <option key={num} value={num}>{num} Doors</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="seat_number" className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
                <select
                  id="seat_number"
                  name="seat_number"
                  value={formData.seat_number}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Number of Seats</option>
                  {seatOptions.map(num => (
                    <option key={num} value={num}>{num} Seats</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="outer_condition" className="block text-sm font-medium text-gray-700 mb-1">Exterior Condition</label>
                <select
                  id="outer_condition"
                  name="outer_condition"
                  value={formData.outer_condition}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Outer Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="inner_condition" className="block text-sm font-medium text-gray-700 mb-1">Interior Condition</label>
                <select
                  id="inner_condition"
                  name="inner_condition"
                  value={formData.inner_condition}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Inner Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Car Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed description of the car"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-25"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4 pl-6">
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Car Images (Max 8)</label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  max="8"
                />
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative w-12 h-12 bg-gray-200">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* <div>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div> */}

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price in USD"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}