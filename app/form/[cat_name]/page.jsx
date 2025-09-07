'use client'
import ApartmentForm from "../../components/ApartmentForm";
import BookForm from "../../components/BookFrom";
import CarForm from "../../components/CarForm"
import LaptopForm from "../../components/LaptopForm";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";


function page({params}) {
    
    const {cat_name} = React.use(params);
    const router = useRouter();
    const adType = cat_name.replace(/-/g, ' ').toLowerCase();

    const {loggedIn} = useAuth();
    useEffect(() => {
        if (!loggedIn) {
            router.push('/login') 
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
