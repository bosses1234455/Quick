'use client'
import { useState } from "react"
import Filters from "./components/Filters"
import PostsFetch from "./components/PostsFetch"
import Sort from "./components/Sort"

function Home() {
  const [listType,setListType] = useState('apartments');
  return (
    <div>
      <div className="w-4/5 mx-auto flex justify-between gap-4 my-5 flex-wrap">
        <div className="flex-1 bg-cyan-500 p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => setListType('apartments')}
        >
          Apartments
        </div>
        <div className="flex-1 bg-fuchsia-500 p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => setListType('books')}
        >
          Books
        </div>
        <div className="flex-1 bg-yellow-500 p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => setListType('cars')}
        >
          Cars
        </div>
        <div className="flex-1 bg-black p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => setListType('laptops')}
        >
          Laptops
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-1/5 gap-4 order-1 lg:order-1">
          <aside className="w-full bg-blue-50 p-4 rounded-lg h-fit shadow-sm">
            <Filters />
          </aside>
        </div>

        <main className="flex-1 order-2 lg:order-2">
          <PostsFetch listType={listType} />
        </main>

        <div className="flex flex-col lg:w-1/5 gap-4 order-1 lg:order-3">
          <aside className="w-full bg-blue-50 p-4 rounded-lg h-fit shadow-sm">
            <Sort />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Home