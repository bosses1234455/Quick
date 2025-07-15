'use client'
import ApartmentForm from "../../components/ApartmentForm";
import BookForm from "../../components/BookFrom";
import CarForm from "../../components/CarForm"
import LaptopForm from "../../components/LaptopForm";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


function page({params}) {
    
    const {cat_name} = React.use(params);
    const router = useRouter();
    const adType = cat_name.replace(/-/g, ' ').toLowerCase();
    const [loggedIn,setLoggedIn] = useState(false);
  useEffect(() => {
    const checkCookie = () => {
      setLoggedIn(!!Cookies.get('token'));
    };
    
    // Initial check
    checkCookie();

    // Optional: Polling (check every 1s) for external changes
    const interval = setInterval(checkCookie, 1000);
    !loggedIn ? router.push('/login') : null;
    return () => clearInterval(interval);
  }, []);

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
