'use client';

import { useState } from 'react';
import Image from 'next/image';
import {locationOptions, conditions} from '../data/data'
import {jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Notification from './Notification';
import Select from 'react-select';


export default function ApartmentForm() {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const [error,setError] = useState('');
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

  // const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8].map(num => ({
    value: num,
    label: `${num} Room${num !== 1 ? 's' : ''}`
  }));
  
  const bathroomOptions = [1, 2, 3, 4, 5].map(num => ({
    value: num,
    label: `${num} Bathroom${num !== 1 ? 's' : ''}`
  }));
  
  const floorOptions = Array.from({ length: 36 }, (_, i) => {
    const floor = i + 1;
    return { value: floor, label: floor.toString() };
  });
  

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
      

      const res = await fetch('/api/apartments',{
        method: 'POST',
        body: formDataToSend
      });      

      if(!res.ok) {
        setError('check your inputs');
        console.log(res);
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
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
                  Floor Number
                </label>
                <Select
                  inputId="floor"
                  name="floor"
                  value={floorOptions.find(option => option.value === formData.floor) || null}
                  onChange={selected =>
                    handleInputChange({ target: { name: 'floor', value: selected?.value } })
                  }
                  options={floorOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select Floor"
                />
              </div>


              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Select
                  inputId="location"
                  name="location"
                  value={locationOptions.find(option => option.value === formData.location) || null}
                  onChange={selected =>
                    handleInputChange({ target: { name: 'location', value: selected?.value } })
                  }
                  options={locationOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select Location"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                  required
                />
              </div>

              <div>
                <label htmlFor="room_count" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Rooms
                </label>
                <Select
                  inputId="room_count"
                  name="room_count"
                  value={roomOptions.find(option => option.value === formData.room_count) || null}
                  onChange={selected =>
                    handleInputChange({ target: { name: 'room_count', value: selected?.value } })
                  }
                  options={roomOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Number of Rooms"
                  required
                />
              </div>

              
              <div>
                <label htmlFor="bathroom_count" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Bathrooms
                </label>
                <Select
                  inputId="bathroom_count"
                  name="bathroom_count"
                  value={bathroomOptions.find(option => option.value === formData.bathroom_count) || null}
                  onChange={selected =>
                    handleInputChange({ target: { name: 'bathroom_count', value: selected?.value } })
                  }
                  options={bathroomOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select Number of Bathrooms"
                  required
                />
              </div>

              <div>
                <label htmlFor="inner_condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Interior Condition
                </label>
                <Select
                  inputId="inner_condition"
                  name="inner_condition"
                  value={conditions.find(option => option.value === formData.inner_condition) || null}
                  onChange={selected =>
                    handleInputChange({ target: { name: 'inner_condition', value: selected?.value } })
                  }
                  options={conditions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select Condition"
                />
              </div>

            </div>

            {/* Column 2 */}
            <div className="space-y-4">        
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

              <div className="flex items-center space-x-2">
                <input
                  id="sell"
                  type="checkbox"
                  name="sell"
                  checked={formData.sell}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sell" className="text-sm font-medium text-gray-700">For Sale</label>
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
        <Notification postType={'Apartment'} showNotification={showNotification} error={error}/>
      </div>
    </div>
  );
}