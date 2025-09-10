'use client'
import { useState,useEffect } from "react"
import Filters from "./components/Filters"
import PostsFetch from "./components/PostsFetch"
import Sort from "./components/Sort"
import Tabs from "./components/Tabs"
import { usePathname } from "next/navigation"

function Home() {
  const [listType,setListType] = useState('apartments');
  const [filters, setFilters] = useState({});
  const [submitFilters,setSubmitFilters] = useState(false);
  const [ready,setReady] = useState(false);
  const [sortOption, setSortOption] = useState('date_desc');
  const pathname = usePathname();

  const handleBeforeUnload = () => {
    localStorage.removeItem('filters');
    localStorage.removeItem('listType');
    localStorage.removeItem('sortOption');
  }

  useEffect(() => {
  const savedFilters = localStorage.getItem('filters');
  const savedListType = localStorage.getItem('listType');
  const savedSortOption = localStorage.getItem('sortOption');

  try {
    if (savedFilters && savedFilters !== 'undefined' && savedFilters !== '') {
      setFilters(JSON.parse(savedFilters));
    }
  } catch (e) {
    setFilters({});
  }

  try {
    if (savedListType && savedListType !== 'undefined' && savedListType !== '') {
      setListType(JSON.parse(savedListType));
    }
  } catch (e) {
    setListType('apartments');
  }

  try {
    if (savedSortOption && savedSortOption !== 'undefined' && savedSortOption !== '') {
      setSortOption(JSON.parse(savedSortOption));
    }
  } catch (e) {
    setSortOption('date_desc');
  }
  setReady(true);
  setSubmitFilters(e => !e);
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [pathname]);

   const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortOption) => {
    localStorage.setItem('sortOption', JSON.stringify(newSortOption));
    setSortOption(newSortOption);
  };

  const openForm = () => {
     window.open("https://forms.gle/NEuvM7YBUA82Y2wAA", "_blank")
  } 

  return (
    <div>
    <button 
      className="fixed bottom-6 right-6 bg-blue-800 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-100"
      onClick={openForm}
    >
      Feedback
    </button>
     <Tabs setListType={setListType} handleFilterChange={handleFilterChange} handleSortChange={handleSortChange} />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-1/5 gap-4 order-1 lg:order-1">
          <aside className="w-full bg-transparent p-4 rounded-lg h-fit shadow-sm">
            <Filters listType={listType} savedFilters={filters} setSubmitFilters={setSubmitFilters} onFilterChange={handleFilterChange}/>
          </aside>
        </div>

        <main className="flex-1 order-2 lg:order-2">
          <PostsFetch ready={ready} listType={listType} filters={filters} submitFilters={submitFilters}  sortOption={sortOption}/>
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