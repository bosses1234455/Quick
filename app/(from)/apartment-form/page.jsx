'use client';

import { useState } from 'react';
import Image from 'next/image';
import {locations} from '../../data/data'


export default function ApartmentForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: [],
    room_count: '',
    bathroom_count: '',
    level: '',
    space: '',
    inner_condition: '',
    floor: '',
    furnished: false
  });

  const [imageFiles, setImageFiles] = useState([]);

  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const bathroomOptions = [1, 2, 3, 4, 5];
  const floorOptions = Array.from({ length: 35 }, (_, i) => i + 1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Floor Number</option>
                  {floorOptions.map(num => (
                    <option key={num} value={num}>{num}{num === 1 ? 'st' : num === 2 ? 'nd' : num === 3 ? 'rd' : 'th'} Floor</option>
                  ))}
                </select>
              </div>

              <div>
                <select
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

              <div>
                <select
                  name="room_count"
                  value={formData.room_count}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Number of Rooms</option>
                  {roomOptions.map(num => (
                    <option key={num} value={num}>{num} Room{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  name="bathroom_count"
                  value={formData.bathroom_count}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Number of Bathrooms</option>
                  {bathroomOptions.map(num => (
                    <option key={num} value={num}>{num} Bathroom{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="number"
                  name="space"
                  value={formData.space}
                  onChange={handleInputChange}
                  placeholder="Space in m²"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-26"
                />
              </div>

              <div>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                  max="8"
                />
                <p className="text-sm text-gray-500 mt-1">Upload up to 8 images</p>
                <div className="mt-2 grid grid-cols-4 gap-4">
                  {imageFiles.slice(0, 8).map((file, index) => (
                    <div key={index} className="relative h-32 w-full border rounded group">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                      <button
                        onClick={() => {
                          const newFiles = [...imageFiles];
                          newFiles.splice(index, 1);
                          setImageFiles(newFiles);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {imageFiles.length > 8 && (
                  <p className="text-red-500 text-sm mt-1">Only the first 8 images will be used</p>
                )}
              </div>

              <div>
                <select
                  name="inner_condition"
                  value={formData.inner_condition}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price in USD"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label>Furnished</label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}