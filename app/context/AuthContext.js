'use client'

import { useState,useEffect,createContext,useContext } from "react"
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [loggedIn,setLoggedIn] = useState(false);
    const [tryingToLog,setTryingToLog] = useState(false);
    const [id,setId] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
          const token = Cookies.get('token');
          setLoggedIn(!!token);
          setIsLoading(false);
           if (token) {
              const decoded = jwtDecode(token);
              setId(decoded.userId);
            } else {
              setId('');
            }
      },[tryingToLog])
    return <AuthContext.Provider value={{loggedIn,isLoading,setTryingToLog,id}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext);
}