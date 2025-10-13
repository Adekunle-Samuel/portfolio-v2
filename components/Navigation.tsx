'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SiteSettings } from '@/types/siteSettings'

interface NavigationProps {
  siteSettings?: SiteSettings | null
}

export default function Navigation({ siteSettings }: NavigationProps = { siteSettings: null }) {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-8 lg:px-16 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-xs text-black hover:text-gray-600 transition-colors"
            >
              Work
            </Link>
            <Link 
              href="/about" 
              className="text-xs text-black hover:text-gray-600 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/experience" 
              className="text-xs text-black hover:text-gray-600 transition-colors"
            >
              Experience
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            {siteSettings?.socialLinks?.linkedin && (
              <>
                <a 
                  href={siteSettings.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-black hover:text-gray-600 transition-colors"
                >
                  LinkedIn
                </a>
                {siteSettings?.socialLinks?.github && (
                  <span className="text-xs text-black">/</span>
                )}
              </>
            )}
            {siteSettings?.socialLinks?.github && (
              <a 
                href={siteSettings.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-black hover:text-gray-600 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

