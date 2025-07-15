import React from 'react'

const Sort = () => {
  return (
    <div>
       <h2 className="text-2xl font-bold mb-4">Sort:</h2>
        <div className="space-y-4 flex flex-row w-1/2 gap-4">
            {[1, 2, 3].map((item) => (
               <span key={item} className="bg-white rounded-lg w-20 h-8"></span>
            ))}
        </div>
    </div>
  )
}

export default Sort
