'use client'
import React from 'react'
import Image from 'next/image'
import moment from 'moment'

const Post = ({img, title, cat, location, date, price}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-wrap gap-6 hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-64 h-48 overflow-hidden rounded-lg">
        <Image 
          src={img} 
          fill
          className="object-cover hover:scale-105 transition-transform duration-300" 
          alt='post image' 
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-black font-medium text-lg mb-4">
          {title}
        </h2>
        
        <div className="space-y-3">
          <div className="bg-slate-100 rounded-lg p-3 space-y-2">
            <span className="flex items-center gap-1 text-slate-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {cat}
            </span>
            <span className="flex items-center gap-1 text-slate-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
            <span className="flex items-center gap-1 text-slate-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {moment(date).fromNow()}
            </span>
          </div>
          
          <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {`${price} $`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Post



