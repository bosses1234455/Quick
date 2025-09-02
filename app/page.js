'use client'
import { useState } from "react"
import Filters from "./components/Filters"
import PostsFetch from "./components/PostsFetch"
import Sort from "./components/Sort"
import Tabs from "./components/Tabs"

function Home() {
  const [listType,setListType] = useState('apartments');
  const [filters, setFilters] = useState({});
  const [submitFilters,setSubmitFilters] = useState(false);
  const [sortOption, setSortOption] = useState('date_desc');

   const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const openForm = () => {
    window.open("https://forms.gle/T7MHkuvxz8xDCH2X7", "_blank")
  } 

  return (
    <div>
    <button 
      className="fixed bottom-6 right-6 bg-blue-800 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-100"
      onClick={openForm}
    >
      Feedback
    </button>
     <Tabs setListType={setListType} handleFilterChange={handleFilterChange} />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-1/5 gap-4 order-1 lg:order-1">
          <aside className="w-full bg-blue-50 p-4 rounded-lg h-fit shadow-sm">
            <Filters listType={listType} setSubmitFilters={setSubmitFilters} onFilterChange={handleFilterChange}/>
          </aside>
        </div>

        <main className="flex-1 order-2 lg:order-2">
          <PostsFetch listType={listType} filters={filters} submitFilters={submitFilters}  sortOption={sortOption}/>
        </main>

        <div className="flex flex-col lg:w-1/5 gap-4 order-1 lg:order-3">
          <aside className="w-full bg-blue-50 p-4 rounded-lg h-fit shadow-sm">
            <Sort listType={listType} onSortChange={handleSortChange}/>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Home