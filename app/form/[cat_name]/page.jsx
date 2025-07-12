'use client'
import ApartmentForm from "../../components/ApartmentForm";
import BookForm from "../../components/BookFrom";
import CarForm from "../../components/CarForm"
import LaptopForm from "../../components/LaptopForm";


function page({params}) {
    
    const {cat_name} = params;
    const adType = cat_name.replace(/-/g, ' ');
    console.log(adType);
    
  switch(adType) {
    case "car": 
        return <CarForm />
        
    case "laptop":
        return <LaptopForm />
        
    case "book":
        return <BookForm />
        
    case "apartment_sell":
        return <ApartmentForm />
        
  }
}

export default page
