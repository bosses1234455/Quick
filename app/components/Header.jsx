'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


export default function Header() {

  const [isCookie,setIsCookie] = useState(false);
  const [id,setId] = useState('');
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

  useEffect(() => {
      const token = Cookies.get('token');
      const c = jwtDecode(token);
      setId(c.userId);
  },[])
  
  return (
    <header className="flex h-20 justify-between items-center p-4 bg-gray-100 mb-8">
      <Image src="/Logo.png" width={65} height={65} alt="Logo" className="rounded-full"/>
      {!isCookie && <Link href={'/login'} className="px-6 py-2 bg-gray-200 rounded-full cursor-pointer">Login</Link>}
      {isCookie && <Link href={`/profile/${id}`} className="px-6 py-2 bg-gray-200 rounded-full cursor-pointer">profile</Link>}
  </header>
  )
}
