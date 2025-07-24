
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const GoogleLoginButton = dynamic(() => import('../components/GoogleLoginButton'), {
  ssr: false,
});

export default function LoginPage() {
  const router = useRouter();

  const schema = Yup.object().shape({
    mail: Yup.string().required().email(),
    password: Yup.string().required().min(7),
  });
  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },

    validationSchema: schema,

    onSubmit: async ({  mail, password }) => {

      const res = await fetch('/api/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      })
      if(res.ok) {
        router.push('/');
      }
      else {
        console.log(res);
      }
    },
  });


  const { errors, touched, values, handleChange,handleBlur, handleSubmit } = formik;
  
  return (
    <div className="min-h-screen flex flex-col items-center p-4 mt-12">
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="mail"
              value={values.mail}
              onChange={handleChange}
              onBlur={handleBlur}
              name='mail'
              className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
              required
              placeholder='example@gmail.com'
            />
            {errors.mail && touched.mail && <span className='text-red-600'>{errors.mail}</span>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
              required
              name='password'
              placeholder='e.g: 12@jawad*yegbdjash'
            />
            {errors.password && touched.password && <span className='text-red-600'>{errors.password}</span>}
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

          <div className='pt-6'>
            <GoogleLoginButton />
          </div>

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
