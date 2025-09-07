'use client'
import Link from 'next/link'
import { useState } from 'react'

const BuySellPage = () => {
  const [hoveredOption, setHoveredOption] = useState(null)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-8 p-4">
        <Link 
          href="/"
          className={`w-64 h-64 rounded-2xl flex items-center justify-center transition-all duration-300 bg-blue-500 hover:bg-blue-600 ${
            hoveredOption === 'sell' ? 'opacity-80 scale-95' : 'hover:scale-105'
          }`}
          onMouseEnter={() => setHoveredOption('buy')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">BUY</h2>
            <p className="text-white/90 text-sm">Browse items</p>
          </div>
        </Link>

        <Link 
          href="/login"
          className={`w-64 h-64 rounded-2xl flex items-center justify-center transition-all duration-300 bg-emerald-500 hover:bg-emerald-600 ${
            hoveredOption === 'buy' ? 'opacity-80 scale-95' : 'hover:scale-105'
          }`}
          onMouseEnter={() => setHoveredOption('sell')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">SELL</h2>
            <p className="text-white/90 text-sm">List your items</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BuySellPage