'use client'
import { useState,useEffect } from 'react'
import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const [resError, setResError] = useState('');
  const [code, setCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {setTryingToLog,loggedIn} = useAuth();

    useEffect(() => {
       
          if (loggedIn) {
              router.push('/') 
          }
      },[router,loggedIn])

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mail: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
      ),
    phone_num: Yup.string()
      .required("Phone number is required")
    
      .length(12, "Phone number must be exactly 12 digits")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mail: "",
      password: "",
      phone_num: ""
    },
    validationSchema: schema,
    onSubmit: async ({ name, mail, password, phone_num }) => {
      setIsLoading(true);
      setResError('');

      if (!isEmailSent) {
        try {
          const res = await fetch('/api/auth/emailVerification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: mail })
          });
          
          const data = await res.json();
          
          if (res.ok) {
            setCode(data.code);
            setIsEmailSent(true);
          } else {
            setResError(data.error || 'Failed to send verification email');
          }
        } catch (error) {
          setResError('Network error. Please try again.');
        }
      } else {
      
        if (verificationCode !== code) {
          setResError('Invalid verification code');
          setIsLoading(false);
          return;
        }

        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              username: name, 
              mail, 
              password, 
              phone_num 
            })
          });

          const data = await res.json();
          
          if (res.ok) {
            setTryingToLog(prev => !prev);
            router.push('/');
          } else {
            setResError(data.error || 'Registration failed');
          }
        } catch (error) {
          setResError('Network error. Please try again.');
        }
      }
      setIsLoading(false);
    },
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit, setFieldValue } = formik;

  const handleResendCode = async () => {
    setIsLoading(true);
    setResError('');
    
    try {
      const res = await fetch('/api/auth/emailVerification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.mail })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setCode(data.code);
        setResError('New verification code sent!');
      } else {
        setResError(data.error || 'Failed to resend code');
      }
    } catch (error) {
      setResError('Network error. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 mt-12">
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isEmailSent ? (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
                  required
                  name='name'
                  placeholder='Enter your full name'
                />
                {errors.name && touched.name && <span className='text-red-600 text-sm'>{errors.name}</span>}
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
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
                  required
                  placeholder='example@gmail.com'
                />
                {errors.mail && touched.mail && <span className='text-red-600 text-sm'>{errors.mail}</span>}
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
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none"
                  required
                  placeholder='e.g: 1234A%*z'
                />
                {errors.password && touched.password && <span className='text-red-600 text-sm'>{errors.password}</span>}
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
                  onChange={phone => setFieldValue('phone_num', phone)}
                  inputProps={{
                    name: 'phone_num',
                    onBlur: handleBlur,
                    required: true
                  }}
                />
                {errors.phone_num && touched.phone_num && <span className='text-red-600 text-sm'>{errors.phone_num}</span>}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-medium mb-4">Verify Your Email</h3>
              <p className="text-sm text-gray-600 mb-4">
                We've sent a verification code to {values.mail}
              </p>
              
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F9FAFB] focus:outline-none text-center text-lg"
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                />
              </div>

              <button
                type="button"
                onClick={handleResendCode}
                className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
                disabled={isLoading}
              >
                Resend code
              </button>
            </div>
          )}

          {resError && (
            <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded">
              {resError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-blue-800 text-white py-2 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : (isEmailSent ? 'Verify & Register' : 'Send Verification Code')}
          </button>
        </form>

        {isEmailSent && (
          <button
            onClick={() => setIsEmailSent(false)}
            className="w-full mt-4 text-sm text-gray-600 hover:text-blue-800"
          >
            ← Back to edit details
          </button>
        )}

        <Link
          href={'/login'}
          className="block text-center mt-4 text-sm text-gray-600 hover:text-blue-800 transition-colors"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  )
}