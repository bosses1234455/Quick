'use client'
import { useEffect, useState } from "react"
import Filters from "./components/Filters"
import PostsFetch from "./components/PostsFetch"
import Sort from "./components/Sort"
import Tabs from "./components/Tabs"
import { usePathname } from "next/navigation"

function Home() {
  const [listType,setListType] = useState('apartments');
  const [filters, setFilters] = useState({});
  const [submitFilters,setSubmitFilters] = useState(false);
  const [sortOption, setSortOption] = useState('date_desc');
  const pathname = usePathname();

   const handleFilterChange = (newFilters) => {
    // localStorage.setItem('filters', JSON.stringify(newFilters));
    // localStorage.setItem('listType', JSON.stringify(listType));
    setFilters(newFilters);
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    const savedListType = localStorage.getItem('listType');
    const savedSortOption = localStorage.getItem('sortOption');
    if (savedFilters) setFilters(JSON.parse(savedFilters));
    if (savedListType) setListType(JSON.parse(savedListType));
    if (savedSortOption) setSortOption(JSON.parse(savedSortOption));
    setSubmitFilters(e => !e);
  },[pathname]);

  const handleSortChange = (newSortOption) => {
    localStorage.setItem('sortOption', JSON.stringify(newSortOption));
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
          <aside className="w-full bg-transparent p-4 rounded-lg h-fit shadow-sm">
            <Filters listType={listType} savedFilters={filters} setSubmitFilters={setSubmitFilters} onFilterChange={handleFilterChange}/>
          </aside>
        </div>

        <main className="flex-1 order-2 lg:order-2">
          <PostsFetch listType={listType} filters={filters} submitFilters={submitFilters}  sortOption={sortOption}/>
        </main>

        <div className="flex flex-col lg:w-1/5 gap-4 order-1 lg:order-3">
          <aside className="w-full bg-transparent p-4 rounded-lg h-fit shadow-sm">
            <Sort listType={listType} savedSortOption={sortOption} onSortChange={handleSortChange}/>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Home