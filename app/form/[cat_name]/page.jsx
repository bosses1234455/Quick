'use client'
import ApartmentForm from "../../components/ApartmentForm";
import BookForm from "../../components/BookFrom";
import CarForm from "../../components/CarForm"
import LaptopForm from "../../components/LaptopForm";
import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";


function page({params}) {
    
    const {cat_name} = React.use(params);
    const router = useRouter();
    const adType = cat_name.replace(/-/g, ' ').toLowerCase();
    // const [loggedIn,setLoggedIn] = useState(false);
    const {loggedIn} = useAuth();
    // useEffect(() => {
    //     const token = Cookies.get('token');
    //     setLoggedIn(!!token);
        
    //     if (!token) {
    //         router.push('/login');
    //     }
    // }, [router]); // Add router to dependencies
    useEffect(() => {
        if (!loggedIn) {
            router.push('/login') // or a loading spinner while checking auth
        }
    },[router])

    switch(adType) {
        case "cars": 
            return <CarForm />
            
        case "laptops":
            return <LaptopForm />
            
        case "books":
            return <BookForm />
            
        case "apartments":
            return <ApartmentForm />
    }
}

export default page
