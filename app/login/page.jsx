'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const GoogleLoginButton = dynamic(() => import('../components/GoogleLoginButton'), {
  ssr: false,
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { setTryingToLog, loggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn) {
      router.push('/');
    }
  }, [router, loggedIn]);

  const schema = Yup.object().shape({
    mail: Yup.string().required("Email is required").email("Please enter a valid email"),
    password: Yup.string().required("Password is required").min(7, "Password must be at least 7 characters"),
  });

  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ mail, password }) => {
      setError('');
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });
      
      if (res.ok) {
        setTryingToLog(prev => !prev);
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.error);
      }
    },
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="mail"
              value={values.mail}
              onChange={handleChange}
              onBlur={handleBlur}
              name="mail"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.mail && touched.mail 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-800 focus:border-blue-800"
              } transition-colors`}
              placeholder="example@gmail.com"
            />
            {errors.mail && touched.mail && (
              <div className="mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-red-600 text-sm">{errors.mail}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.password && touched.password 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-800 focus:blue-blue-800"
              } transition-colors`}
              name="password"
              placeholder="Enter your password"
            />
            {errors.password && touched.password && (
              <div className="mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-red-600 text-sm">{errors.password}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-800 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Login"}
          </button>
        </form>

        <div className="mt-6 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <GoogleLoginButton />
        </div>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link 
            href="/register"
            className="font-medium text-blue-800 hover:text-blue-600 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}