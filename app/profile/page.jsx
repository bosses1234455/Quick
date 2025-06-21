'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Picture and Personal Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                <Image
                  src="/Logo.png"
                  alt="Profile Picture"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Personal Info
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold w-32">Name:</span>
              <span className="text-gray-700">John Doe</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Email:</span>
              <span className="text-gray-700">john.doe@example.com</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Phone Number:</span>
              <span className="text-gray-700">+1 234 567 8900</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Link href="/your-ads" className="block">
            <div className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-lg">Your Ads</h3>
            </div>
          </Link>
          <Link href="/liked-ads" className="block">
            <div className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-lg">Liked Ads</h3>
            </div>
          </Link>
          <Link href="/chats" className="block">
            <div className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-lg">Chats</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}