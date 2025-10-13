'use client'

import { motion } from 'framer-motion'
import { SiteSettings } from '@/types/siteSettings'

interface ResumeButtonProps {
  siteSettings: SiteSettings | null
  variant?: 'default' | 'large'
  className?: string
  buttonText?: string
}

export default function ResumeButton({ siteSettings, variant = 'default', className = '', buttonText = 'Download Resume' }: ResumeButtonProps) {
  const resumeUrl = siteSettings?.resumeFile?.asset?.url

  const handleDownload = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank')
    } else {
      // Fallback to API route if no Sanity resume
      window.open('/api/download-resume', '_blank')
    }
  }

  const baseClasses = variant === 'large' 
    ? 'px-6 py-3 text-sm'
    : 'px-4 py-2.5 text-xs'

  const showIcon = buttonText === 'Download Resume'

  return (
    <motion.button
      onClick={handleDownload}
      className={`${baseClasses} border border-gray-text bg-white text-black hover:text-white hover:border-black transition-colors duration-300 flex items-center gap-2.5 relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Swipe background effect */}
      <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300 ease-out" />
      
      {/* Content with relative positioning to stay above background */}
      <span className="relative z-10 flex items-center gap-2.5">
        {showIcon && (
          <svg 
            width="15" 
            height="15" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
        {buttonText}
      </span>
    </motion.button>
  )
}

