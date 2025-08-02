'use client';
import { useEffect } from 'react';
import {useRouter} from "next/navigation"
import { useAuth } from '../context/AuthContext';

export default function GoogleLoginButton() {
  const router = useRouter();
  const {setTryingToLog} = useAuth();
  useEffect(() => {
    
    const initializeGoogle = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
        }
      );
    };

    const handleGoogleLogin = async (response) => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ googleToken: response.credential }),
        });

        const data = await res.json();
        if (res.ok) {
          console.log('Google login successful:', data);
          setTryingToLog(prev => !prev);
          router.push('/')
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error('Login error:', err);
      }
    };

    // Load script and initialize
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);
  }, []);

  return <div id="google-btn"></div>;
}
