'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal';
import Tabs from '@/app/components/Tabs';
import PostsFetch from '@/app/components/PostsFetch';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import ErrorDisplay from '@/app/components/ErrorDisplay';
import NotFoundDisplay from '@/app/components/NotFoundDisplay';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [listType, setListType] = useState('apartments');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_num: '',
    password: ''
  });
  const [tokenId, setTokenId] = useState('');
  const [profilePic, setProfilePic] = useState('/Logo.png'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const { data } = await response.json();
        setUserData(data);
       
        setFormData({
          username: data.username || '',
          email: data.email || '',
          phone_num: data.phone_num || '',
          password: ''
        });
      
        if (data.profile_picture) {
          setProfilePic(data.profile_picture);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decoded = jwtDecode(token);
      decoded ? setTokenId(decoded.userId) : null;
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    const formData = new FormData();
    formData.append('images', file);

    try {
      const response = await fetch(`/api/user/${id}/profile_picture`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      
    
      setProfilePic(result.profile_picture);
      
      setUserData(prev => ({
        ...prev,
        profile_picture: result.profilePicture
      }));
      
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Update failed');
      
      const { data } = await response.json();
      setUserData(data);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterChange = () => {};
  const handleSortChange = () => {};

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!userData) return <NotFoundDisplay />;

  return (
    <div className="min-h-screen bg-[#eeeeee] p-4">
      <div className="max-w-4xl mx-auto">
        <div className={`bg-white rounded-lg shadow-md p-6 relative transition-all duration-500 ${isEditing ? 'blur-sm' : ''}`}>
          <div className="bg-white rounded-lg shadow-md p-6 relative">
      
            {tokenId == userData.id && 
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
            }
            
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <label htmlFor="profilePic" className={`${tokenId == id ?"cursor-pointer" : '' }`}>
                  <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden relative group">
                    <Image
                      src={profilePic}
                      alt="Profile Picture"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                    {tokenId == id && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm">Change</span>
                      </div>
                    )}
                  </div>
                </label>
                <input 
                  type="file" 
                  id="profilePic" 
                  name="profilePic" 
                  ref={fileInputRef}
                  disabled={tokenId != id}
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userData.username || 'User'}
                </h1>
              
              </div>
            </div>

      
            <div className="space-y-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                  {userData.phone_num && (
                    <div>
                      <p className="text-sm text-gray-500">Contact number</p>
                      <p className="text-gray-900">{userData.phone_num}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 text-sm font-mono">{userData.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs setListType={setListType} handleSortChange={handleSortChange} handleFilterChange={handleFilterChange}/>
          <PostsFetch listType={listType} id={id} ready={true}/>
        </div>
        
      
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_num"
                value={formData.phone_num}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
