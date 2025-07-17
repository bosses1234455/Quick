'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Modal from '../../components/Modal'; // Assume you have a Modal component
import Tabs from '@/app/components/Tabs';
import PostsFetch from '@/app/components/PostsFetch';

export default function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [listType,setListType] = useState('apartment');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

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
          phone: data.phone || '',
          password: ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!userData) return <NotFoundDisplay />;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          {/* Edit Button (Top Right) */}
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>

          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
              <Image
                src="/Logo.png"
                alt="Profile Picture"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userData.username || 'User'}
              </h1>
              {userData.email && (
                <p className="text-gray-600">{userData.email}</p>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                {userData.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{userData.phone}</p>
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

          {/* Edit Modal */}
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
                  name="phone"
                  value={formData.phone}
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
      <Tabs setListType={setListType} />
      <PostsFetch listType={listType} id={id} />
    </div>
  );
}

// Helper components (put these in separate files or at bottom)
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

function ErrorDisplay({ message }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {message}
      </div>
    </div>
  );
}

function NotFoundDisplay() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-gray-600">User not found</div>
    </div>
  );
}