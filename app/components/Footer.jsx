import React from 'react'
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="bg-gray-200 border-t border-gray-300 py-4 text-sm text-gray-600 mt-auto z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms
            </a>
          </div>

          <div className="flex gap-6 mb-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
              <FaXTwitter size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} All Rights Reserved to big_bosses team
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer