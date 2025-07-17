'use client'
import { useState } from "react"
import Filters from "./components/Filters"
import PostsFetch from "./components/PostsFetch"
import Sort from "./components/Sort"
import Tabs from "./components/Tabs"

function Home() {
  const [listType,setListType] = useState('apartments');
  return (
    <div>
     <Tabs setListType={setListType} />

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