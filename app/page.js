import CarList from "./components/CarList";
import LoadingSkeleton from './components/LoadingSkeleton';

async function getCarData() {
  try {
    const res = await fetch('http://localhost:3000/api/cars?limit=20', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch cars');
    return { cars: await res.json() }; // Wrap in object
  } catch (error) {
    console.error(error);
    return { cars: [] }; // Return empty array in same shape
  }
}


export default async function Home() {

  const data = await  getCarData();
  const cars = data?.cars || [];
  return (
    <div className="min-h-screen bg-white">
    <div className="flex p-4 gap-6">
      <main className="flex-1">
      {cars.length === 0 ? (
          <LoadingSkeleton count={5} />
        ) : (
          <CarList cars={cars} />
        )}
      </main>

      <aside className="w-80 bg-gray-100 p-4 rounded-lg h-fit">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Filter:</h2>
          <div className="space-y-4">
            {/* Filter options would go here */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium mb-2">Brand</h3>
              {/* Would map through available brands */}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Sort:</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <select className="w-full p-2 border rounded">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  )
}

// export default Home