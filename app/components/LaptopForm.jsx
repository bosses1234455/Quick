'use client';

import { useState } from 'react';
import Image from 'next/image';
import { locations } from '../data/data';
import { lbrands } from '../data/data';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function LaptopForm() {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    processor: '',
    ram: '',
    storage: '',
    gpu: '',
    location: '',
    description: '',
    images: null
  });

  // const [imageFile, setImageFile] = useState(null);
  const [imageFiles,setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }; 

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
    setImageFiles([...e.target.files]);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     setFormData(prev => ({
  //       ...prev,
  //       image: URL.createObjectURL(file)
  //     }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images') {
          formDataToSend.append(key, value);
        }
      });
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append('images', formData.images[i]);
        }
      }
      const cookie = Cookies.get('token');
      
      const seller_id = jwtDecode(cookie);
      
      formDataToSend.set('seller_id', seller_id.userId);

      const res = await fetch('/api/laptops',{
        method: 'POST',
        body: formDataToSend
      });

      if(!res.ok) {
        console.log("failed");  
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a title for your laptop"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Laptop Brand</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Brand</option>
                  {lbrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

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
                <label htmlFor="processor" className="block text-sm font-medium text-gray-700 mb-1">Processor</label>
                <input
                  id="processor"
                  type="text"
                  name="processor"
                  value={formData.processor}
                  onChange={handleInputChange}
                  placeholder="Processor (e.g., Intel Core i7)"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-1">RAM</label>
                <input
                  id="ram"
                  type="text"
                  name="ram"
                  value={formData.ram}
                  onChange={handleInputChange}
                  placeholder="RAM (e.g., 16GB)"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-1">Storage</label>
                <input
                  id="storage"
                  type="text"
                  name="storage"
                  value={formData.storage}
                  onChange={handleInputChange}
                  placeholder="Storage (e.g., 512GB SSD)"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="gpu" className="block text-sm font-medium text-gray-700 mb-1">GPU (Graphics Card)</label>
                <input
                  id="gpu"
                  type="text"
                  name="gpu"
                  value={formData.gpu}
                  onChange={handleInputChange}
                  placeholder="GPU (e.g., NVIDIA RTX 3060)"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter a detailed description of the laptop"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-25 resize-none"
                />
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Laptop Images (Max 8)</label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
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