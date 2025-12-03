'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { SiteSettings } from '@/types/siteSettings'

interface HeroProps {
  siteSettings: SiteSettings | null
}

export default function Hero({ siteSettings }: HeroProps) {
  const displayName = siteSettings?.name || 'Sam Adekunle'
  const displayTagline = siteSettings?.tagline || 'I am a productdesigner working at the intersection of product, brand and development.'
  const email = siteSettings?.email || 'adekunlesamuel204@gmail.com'
  // Increased resolution for retina displays: 240x240 (2x of 120x120)
  const profileImageUrl = siteSettings?.profileImage ? urlFor(siteSettings.profileImage).width(240).height(240).quality(95).url() : null

  return (
    <motion.section
      className="w-full px-8 lg:px-16 pt-40 pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-start gap-6 py-8">
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
                quality={95}
                className="object-cover w-full h-full"
              />
            ) : (
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="10" r="5" fill="white" fillOpacity="0.6" />
                <path d="M5 25C5 19.4772 9.47715 15 15 15C20.5228 15 25 19.4772 25 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="white" fillOpacity="0.6" />
              </svg>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 pt-1">
          <div>
            <h1 className="text-base font-normal text-black mb-2">
              Hi, I'm {displayName}
            </h1>
            <p className="text-sm text-gray-text leading-relaxed max-w-[450px]">
              {displayTagline}
            </p>
          </div>

          {/* Let's chat button - aligned with description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:text-black border border-gray-300 hover:border-gray-400 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3H2C1.44772 3 1 3.44772 1 4V12C1 12.5523 1.44772 13 2 13H14C14.5523 13 15 12.5523 15 12V4C15 3.44772 14.5523 3 14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 4L8 8.5L15 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Let's chat
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

