import ApartmentForm from "../components/ApartmentForm";
import BookForm from "../components/BookFrom";
import CarForm from "../components/CarForm"
import LaptopForm from "../components/LaptopForm";


function page() {
    const adType = "car"
  switch(adType) {
    case "car": 
        return <CarForm />
        
    case "laptop":
        return <LaptopForm />
        
    case "book":
        return <BookForm />
        
    case "apartments":
        return <ApartmentForm />
        
  }
}

export default page
