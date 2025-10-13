'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { SiteSettings } from '@/types/siteSettings'
import ResumeButton from './ResumeButton'

interface HeroProps {
  siteSettings: SiteSettings | null
}

export default function Hero({ siteSettings }: HeroProps) {
  const displayName = siteSettings?.name || 'Sam Adekunle'
  const displayTagline = siteSettings?.tagline || 'I am a designer working at the intersection of product, brand and development.'
  const profileImageUrl = siteSettings?.profileImage ? urlFor(siteSettings.profileImage).width(120).height(120).url() : null

  return (
    <motion.section 
      className="w-full px-8 lg:px-16 pt-40 pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-start gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden flex items-center justify-center">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={displayName}
                width={60}
                height={60}
                className="object-cover w-full h-full"
              />
            ) : (
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="10" r="5" fill="white" fillOpacity="0.6"/>
                <path d="M5 25C5 19.4772 9.47715 15 15 15C20.5228 15 25 19.4772 25 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="white" fillOpacity="0.6"/>
              </svg>
            )}
          </div>
        </motion.div>
        
        <div className="flex flex-col gap-2 pt-1">
          <h1 className="text-sm font-normal text-black">
            Hi, I'm {displayName}
          </h1>
          <p className="text-xs text-gray-text leading-relaxed max-w-[266px]">
            {displayTagline}
          </p>
        </div>
      </div>

      {/* Resume Download Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ResumeButton siteSettings={siteSettings} />
      </motion.div>
    </motion.section>
  )
}

