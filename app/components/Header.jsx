'use client'
import Image from "next/image"
import Link from "next/link"
// import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  // const [isCookie,setIsCookie] = useState(false);
  // const [id,setId] = useState('');
  const {loggedIn,id} = useAuth();
  
  // useEffect(() => {
    // const checkCookie = () => {
    //   const token = Cookies.get('token');
    //   setIsCookie(!!token);
    //   if (token) {
    //     const decoded = jwtDecode(token);
    //     setId(decoded.userId);
    //   } else {
    //     setId('');
    //   }
    // };
    
    // Initial check
    // checkCookie();

    // Optional: Polling (check every 1s) for external changes
    // const interval = setInterval(checkCookie, 1000);
    // return () => clearInterval(interval);
  // }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload();
  };
  
  return (
    <header className="flex h-16 justify-between items-center p-4 bg-[#090BA1] relative overflow-hidden">
      {/* Brightness effect using pseudo-elements */}
      <style jsx>{`
        header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%);
          background-size: 200% 200%;
          animation: shine 3s infinite;
        }
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <Link href={'/'} >
        <Image src="/Lo.png" width={50} height={50} alt="Logo" className="rounded-full relative z-10"/>
      </Link>
      {!loggedIn && 
        <Link href={'/login'} className="text-sm px-3 py-1 md:text-base md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 relative z-10 text-white font-medium shadow-sm hover:shadow-md">
          Login
        </Link>
      }
      {loggedIn && 
        <div className="relative z-10 flex gap-1 md:gap-3 flex-nowrap">
          <Link href={'/myChats'}
          className="text-sm px-3 py-1 md:text-base md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >Your chats</Link>
          <Link href={'/category'}
            className="text-sm px-3 py-1 md:text-base md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >
            Post an ad
          </Link>
          <Link 
            href={`/profile/${id}`} 
            className="text-sm px-3 py-1 md:text-base md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >
            Profile
          </Link>
          <button 
            className="text-sm px-3 py-1 md:text-base md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      }
    </header>
  )
}
