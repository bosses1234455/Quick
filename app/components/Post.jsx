'use client'
import React from 'react'
import Image from 'next/image'
import moment from 'moment'

const Post = ({img,title,cat,location,date}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-wrap gap-4">
    <Image src={img} width={256} height={160} className="w-64 h-40 bg-white rounded-lg" alt='post image' />
    <div className="flex-1">
      <div className="bg-green-300 text-black py-1 px-4 rounded-full w-fit mb-2">
        {title}
      </div>
      <div className="flex gap-2 mb-2">
        <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">{cat}</span>
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">{location}</span>
      </div>
      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{moment(date).fromNow()}</span>
      {/* <div className="flex justify-end">
        <span className="text-purple-600 text-xl">★</span>
      </div> */}
    </div>
  </div>
  )
}

export default Post



