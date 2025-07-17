
import Image from 'next/image'
import Link from 'next/link'

const CategoryPage = () => {
  const categories = [
    { id: 1, name: 'Cars', color: 'bg-yellow-400',img:"/Logo.png" },
    { id: 2, name: 'Apartment', color: 'bg-yellow-400',img:"/Logo.png" },
    // { id: 3, name: 'Apartment_rent', color: 'bg-yellow-400',img:"/Logo.png" },
    { id: 4, name: 'Laptops', color: 'bg-yellow-400',img:"/Logo.png" },
    { id: 5, name: 'Books', color: 'bg-yellow-400',img:"/Logo.png" }
  ]

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-12">choose category</h1>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div className="md:col-span-2">
          <Link href={`/form/${categories[0].name}`}>
            <div className="flex rounded-lg overflow-hidden cursor-pointer hover:scale-103 hover:shadow-md shadow-gray-300 transition-transform duration-500">
              <div className={`${categories[0].color} w-1/3 h-48 flex items-center justify-center text-white`}>
                <Image src={categories[0].img} width={200} height={192} />
              </div>
              <div className="bg-gray-200 w-2/3 h-48 font-bold text-3xl pl-2.5 pt-2.5">
              {categories[0].name}
              </div>
            </div>
          </Link>
        </div> */}

        {categories.map((category) => (
          <Link key={category.id} href={`/form/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className={`flex rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-md shadow-gray-300 transition-transform duration-500`}>
              <div className={`${category.color} w-1/2 h-48 flex items-center justify-center text-white`}>
              <Image src={category.img} width={200} height={192} alt='categoyImage'/>
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