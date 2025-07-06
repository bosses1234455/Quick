'use client'
import { useState } from 'react'
import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterPage() {

  const {resError,setResError} = useState('');
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    mail: Yup.string().required().email(),
    password: Yup.string().required().min(7),
    phone_num: Yup.string().required(),
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      mail: "",
      password: "",
      phone_num: ""
    },

    validationSchema: schema,

    onSubmit: async ({ name, mail, password,phone_num }) => {
      const res = await fetch('/api/auth/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name,mail, password,phone_num }),
      })
      if(res.ok) {
        console.log('registered');
      }
      else {
        console.log(res);
      }
    },
  });


  const { errors, touched, values, handleChange, handleSubmit,setFieldValue } = formik;


  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
              required
              name='name'
              placeholder='John Doe'
            />
            {errors.name && touched.name && <span className='text-red-600'>{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="mail"
              name='mail'
              value={values.mail}
              onChange={handleChange}
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
              name='password'
              value={values.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
              required
              placeholder='e.g: 12@jawad*yegbdjash'
            />
            {errors.password && touched.password && <span className='text-red-600'>{errors.password}</span>}
          </div>
          <div>
            <label htmlFor="phone_num" className="block text-sm font-medium mb-2">
              Phone number
            </label>
            <PhoneInput
                    country={'sy'}
                    onlyCountries={['sy']}
                    value={values.phone_num}
                    name="phone_num"
                    id="phone_num"
                    onChange={phone => setFieldValue('phone_num',phone)}
              />
              {errors.phone_num && touched.phone_num && <span className='text-red-600'>{errors.phone_num}</span>}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700"
          >
            Register
          </button>
        </form>

        <Link href={'/login'}
         className="block text-center mt-4 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
        >
         Already have an account? Sign in
        </Link>
      </div>
    </div>
  )
}