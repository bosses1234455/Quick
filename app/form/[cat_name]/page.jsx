'use client'
import ApartmentForm from "../../components/ApartmentForm";
import BookForm from "../../components/BookFrom";
import CarForm from "../../components/CarForm"
import LaptopForm from "../../components/LaptopForm";
import React from "react";


function page({params}) {
    
    const {cat_name} = React.use(params);
    const adType = cat_name.replace(/-/g, ' ').toLowerCase();
    
    
  switch(adType) {
    case "cars": 
        return <CarForm />
        
    case "laptops":
        return <LaptopForm />
        
    case "books":
        return <BookForm />
        
    case "apartment":
        return <ApartmentForm />
  }
}

export default page
