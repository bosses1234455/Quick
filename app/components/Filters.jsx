import React from 'react'

const Filters = () => {
  return (
       <div className="mb-8">
             <h2 className="text-2xl font-bold mb-4">Filter:</h2>
             <div className="space-y-4 flex flex-row w-1/2 gap-4">
               {[1, 2, 3].map((item) => (
                 <span key={item} className="bg-white w-20 rounded-lg flex justify-between h-8">
                   {/* <div className="w-24 h-6 bg-gray-200 rounded"></div>
                   <div className="w-24 h-6 bg-gray-200 rounded"></div> */}
                 </span>
               ))}
             </div>
           </div>
  )
}

export default Filters
