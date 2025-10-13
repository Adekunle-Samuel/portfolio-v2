'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BackButton() {
  return (
    <motion.div 
      className="w-full py-8 flex justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href="/">
        <motion.button
          className="border border-gray-text bg-white text-black hover:text-white hover:border-black transition-colors duration-300 px-4 py-2.5 flex items-center gap-2.5 relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Swipe background effect */}
          <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300 ease-out" />
          
          {/* Content with relative positioning to stay above background */}
          <span className="relative z-10 flex items-center gap-2.5">
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path 
                d="M3.64 11.88L8.44 7.08M8.44 7.08H3.64M8.44 7.08V11.88" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs">Back to homepage</span>
          </span>
        </motion.button>
      </Link>
    </motion.div>
  )
}

