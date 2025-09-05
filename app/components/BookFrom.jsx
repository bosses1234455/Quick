'use client';

import { useState } from 'react';
import Image from 'next/image';
import {locationOptions, bookTypeOptions, conditions} from '../data/data'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Notification from './Notification';
import Select from 'react-select';

export default function BookForm() {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const [error,setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    book_title:'',
    name: '',
    type: '',
    description: '',
    price: '',
    location: '',
    images: [],
    state: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [imageFiles, setImageFiles] = useState([]);

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
      

      const res = await fetch('/api/books',{
        method: 'POST',
        body: formDataToSend
      });      

      const data = await res.json();

      if(!res.ok) {
        setError(data.error ||'check your inputs');
         setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);

        }, 2000);
      }
      if(res.ok) {
        setError('');
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

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  maxLength={100}
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a title for your post"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="book_title" className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                <input
                  id="book_title"
                  type="text"
                  name="book_title"
                  maxLength={100}
                  value={formData.book_title}
                  onChange={handleInputChange}
                  placeholder="Enter the title of the book"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  maxLength={50}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter the author's name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Book Category
                </label>
                <Select
                  inputId="type"
                  name="type"
                  value={bookTypeOptions.find(option => option.value === formData.type) || null}
                  onChange={selected =>
                    handleInputChange({ target: { name: 'type', value: selected?.value } })
                  }
                  options={bookTypeOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select Book Type"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  Book Condition
                </label>
                <Select
                  inputId="state"
                  name="state"
                  value={conditions.find(option => option.value === formData.state) || null}
                  onChange={selected =>
                    handleInputChange({ target: { name: 'state', value: selected?.value } })
                  }
                  options={conditions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select Book Condition"
                />
              </div>
             
            </div>

            <div className="space-y-4">
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
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Book Description</label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={200}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter a detailed description of the book"
                  className="w-full h-30 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Book Images (Max 8)</label>
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
                  max={99999}
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price in USD"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
        <Notification showNotification={showNotification} postType={'Book'} error={error} />
      </div>
    </div>
  );
}
