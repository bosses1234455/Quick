import Filters from "./components/Filters"
import PostsFetch from "./components/PostsFetch"
import Sort from "./components/Sort"
function Home() {

  return (

    <div>
      <aside className="w-full bg-gray-100 p-4 rounded-lg h-fit flex justify-between flex-wrap">
        <Filters />
        <Sort />
      </aside>
      <main className="my-5">
      <PostsFetch listType={'apartments'} />
      </main>
   </div>
  )
}

export default Home