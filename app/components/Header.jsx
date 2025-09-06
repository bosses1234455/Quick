'use client'
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie";
import { usePathname } from 'next/navigation';
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {

  const {loggedIn,id} = useAuth();
  const pathname = usePathname();
  const [loginButton,setLoginButton] = useState(true);

  useEffect(() => {
    if(pathname == '/login') setLoginButton(false);
    else setLoginButton(true);
  },[pathname])
  const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload();
  };
  
  return (
    <header className="flex h-16 justify-between items-center p-4 bg-[#090BA1] relative overflow-hidden">
      {/* Brightness effect using pseudo-elements */}
      <style jsx>{`
        header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 45%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 55%
          );
          background-size: 200% 200%;
          animation: shine 3s infinite;
        }
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      <Link href={"/"}>
        <Image
          src="/Lo.png"
          width={50}
          height={50}
          alt="Logo"
          className="rounded-full relative z-10"
        />
      </Link>
      {(!loggedIn & loginButton) ?  (
        <Link
          href={"/login"}
          className="text-sm px-3 py-1 md:text-base md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 relative z-10 text-white font-medium shadow-sm hover:shadow-md"
        >
          Login
        </Link>
      ) : null}
      {loggedIn && (
        <div className="relative z-10 flex gap-1 md:gap-3 flex-nowrap">
          {/* <Link
            href={"/myChats"}
            className="text-sm px-3 py-1 md:text-base md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >
            Your chats
          </Link> */}
          <Link
            href={"/myChats"}
            className="flex items-center justify-center text-xs sm:text-sm md:text-base px-3 py-1 md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >
            Your chats
          </Link>

          {/* <Link href={'/category'}
            className="text-xs px-3 py-1 md:text-base lg:text-small md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >
            Post an ad
          </Link> */}
          <Link
            href={"/category"}
            className="flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-base px-3 py-1 md:px-5 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >
            Post an ad
          </Link>

          <Link
            href={`/profile/${id}`}
            className="flex items-center justify-center text-xs px-3 py-1 sm:text-sm md:text-base md:px-5 md:py-1.5 lg:text-base bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
          >
            Profile
          </Link>
          <button
            className="flex items-center justify-center text-xs px-3 py-1 sm:text-sm md:text-base md:px-5 md:py-1.5 lg:text-base bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-300 text-white font-medium shadow-sm hover:shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
