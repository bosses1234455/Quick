'use client';

import { useState } from 'react';
import Image from 'next/image';
import {locations} from '../data/data'
import {jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Notification from './Notification';


export default function ApartmentForm() {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: [],
    room_count: '',
    bathroom_count: '',
    space: '',
    inner_condition: '',
    floor: '',
    furnished: false,
    sell: false
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

  
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
    setImageFiles([...e.target.files]);
  };
  


    // const handleImageChange = (e) => {
    //   const files = Array.from(e.target.files);
    //   setImageFiles(files);
    // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch('/api/apartments',{
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //   if(res.ok) {
  //     console.log('success')
  //   }
  //   else {
  //     console.log(res);
  //   }
  // }


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
      console.log(cookie);
      

      const seller_id = jwtDecode(cookie);
      
      formDataToSend.set('seller_id', seller_id.userId);
      console.log(seller_id.userId);
      

      const res = await fetch('/api/apartments',{
        method: 'POST',
        body: formDataToSend
      });      

      if(!res.ok) {
        console.log("failed");  
      }
      if(res.ok) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          router.push('/');
        }, 2000);
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
                  placeholder="Enter a descriptive title"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">Floor Number</label>
                <select
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Floor</option>
                  {floorOptions.map(num => (
                    <option key={num} value={num}>{num}{num === 1 ? 'st' : num === 2 ? 'nd' : num === 3 ? 'rd' : 'th'} Floor</option>
                  ))}
                </select>
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
                <label htmlFor="room_count" className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
                <select
                  id="room_count"
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
                <label htmlFor="bathroom_count" className="block text-sm font-medium text-gray-700 mb-1">Number of Bathrooms</label>
                <select
                  id="bathroom_count"
                  name="bathroom_count"
                  value={formData.bathroom_count}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Number of Bathrooms</option>
                  {bathroomOptions.map(num => (
                    <option key={num} value={num}>{num} Bathroom{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="space" className="block text-sm font-medium text-gray-700 mb-1">Apartment Space</label>
                <input
                  id="space"
                  type="number"
                  name="space"
                  value={formData.space}
                  onChange={handleInputChange}
                  placeholder="Enter space in square meters"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Apartment Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed description of the apartment"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-26 resize-none"
                />
              </div>

              {/* <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Apartment Images</label>
                <input
                  id="images"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                  max="8"
                  required
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
              </div> */}

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Apartment Images (Max 8)</label>
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

              <div>
                <label htmlFor="inner_condition" className="block text-sm font-medium text-gray-700 mb-1">Interior Condition</label>
                <select
                  id="inner_condition"
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

              <div className="flex items-center space-x-2">
                <input
                  id="furnished"
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="furnished" className="text-sm font-medium text-gray-700">Furnished</label>
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
        <Notification postType={'Apartment'} showNotification={showNotification}/>
      </div>
    </div>
  );
}