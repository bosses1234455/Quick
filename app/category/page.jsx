
import Image from 'next/image'
import Link from 'next/link'

const CategoryPage = () => {
  const categories = [
    { id: 1, name: 'Cars', color: 'bg-yellow-400',img:"/car.jpeg" },
    { id: 2, name: 'Apartments', color: 'bg-yellow-400',img:"/apartment.jpg" },
    { id: 4, name: 'Laptops', color: 'bg-yellow-400',img:"/laptop.jpg" },
    { id: 5, name: 'Books', color: 'bg-yellow-400',img:"/book.jpg" }
  ]

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-12">Choose a category</h1>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/form/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className={`flex rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-md shadow-gray-300 transition-transform duration-500`}>
              <div className={`${category.color} w-1/2 h-48 relative`}>
                <Image
                  src={category.img}
                  alt="categoryImage"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>

              <div className="bg-gray-200 w-1/2 h-48 font-bold text-3xl pl-2.5 pt-2.5">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage