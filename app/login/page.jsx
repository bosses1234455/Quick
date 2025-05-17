
'use client'
import Image from 'next/image'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Login attempt with:', email, password)
  }

  const handleGoogleLogin = () => {
    console.log('Google login attempt')
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
              required
              placeholder='example@gmail.com'
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
              required
              placeholder='e.g: 12@jawad*yegbdjash'
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-200 text-gray-500">or</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full cursor-pointer bg-white text-gray-700 py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          continue with google
        </button>
        <Link 
          href={'/register'} 
          className="block text-center mt-4 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
        >
          Don't have an account? <span className="font-semibold">Sign up</span>
        </Link>
      </div>
    </div>
  )
}
