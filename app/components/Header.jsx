'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Header() {

  const [isCookie,setIsCookie] = useState(false);
  useEffect(() => {
    const checkCookie = () => {
      setIsCookie(!!Cookies.get('token'));
    };
    
    // Initial check
    checkCookie();

    // Optional: Polling (check every 1s) for external changes
    const interval = setInterval(checkCookie, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <header className="flex h-20 justify-between items-center p-4 bg-gray-100 mb-8">
      <Image src="/Logo.png" width={65} height={65} alt="Logo" className="rounded-full"/>
      {!isCookie && <Link href={'/login'} className="px-6 py-2 bg-gray-200 rounded-full cursor-pointer">Login</Link>}
  </header>
  )
}
