import Post from "./components/Post"

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex p-4 gap-6">
        <main className="flex-1">
          <div className="space-y-4">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </main>

        <aside className="w-80 bg-gray-100 p-4 rounded-lg h-fit">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Filter:</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-4 rounded-lg flex justify-between">
                  {/* <div className="w-24 h-6 bg-gray-200 rounded"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded"></div> */}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Sort:</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-4 rounded-lg w-full h-12"></div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Home