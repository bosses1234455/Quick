import React from 'react'

function Tabs({setListType,handleFilterChange}) {
  return (
      <div className="w-4/5 mx-auto flex justify-between gap-4 my-5 flex-wrap">
        <div className="flex-1 bg-cyan-500 p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => {
          handleFilterChange({});
          localStorage.setItem('listType', JSON.stringify('apartments'));
          localStorage.removeItem('filters');
          localStorage.removeItem('sortOption');   
          setListType('apartments')
        }}
        >
          Apartments
        </div>
        <div className="flex-1 bg-fuchsia-500 p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => {
          handleFilterChange({});
          localStorage.setItem('listType', JSON.stringify('books'));
          localStorage.removeItem('filters');
          localStorage.removeItem('sortOption');  
          setListType('books')}}
        >
          Books
        </div>
        <div className="flex-1 bg-yellow-500 p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => {
          handleFilterChange({});
          localStorage.setItem('listType', JSON.stringify('cars'));
          localStorage.removeItem('filters');
          localStorage.removeItem('sortOption');  
          setListType('cars')}}
        >
          Cars
        </div>
        <div className="flex-1 bg-black p-4 rounded-lg cursor-pointer hover:opacity-90 transition-all text-white text-center font-medium"
         onClick={() => {
          handleFilterChange({});
          localStorage.setItem('listType', JSON.stringify('laptops'));
          localStorage.removeItem('filters');
          localStorage.removeItem('sortOption');  
          setListType('laptops')}}
        >
          Laptops
        </div>
      </div>
  )
}

export default Tabs