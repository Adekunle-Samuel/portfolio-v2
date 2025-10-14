'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SiteSettings } from '@/types/siteSettings'
import { useState } from 'react'
import Image from 'next/image'

interface NavigationProps {
  siteSettings?: SiteSettings | null
}

export default function Navigation({ siteSettings }: NavigationProps = { siteSettings: null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 lg:px-16 py-6 lg:py-8">
          <div className="flex items-center justify-between">
            {/* Logo - visible on mobile */}
            <Link 
              href="/" 
              className="lg:hidden relative w-8 h-8"
              onClick={closeMenu}
            >
              <Image
                src="/assets/logo.png"
                alt="Logo"
                fill
                quality={95}
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation - Left Side */}
            <div className="hidden lg:flex items-center gap-8">
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
            
            {/* Desktop Navigation - Right Side */}
            <div className="hidden lg:flex items-center gap-2">
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
                  <span className="text-xs text-black">/</span>
                </>
              )}
              {siteSettings?.socialLinks?.github && (
                <>
                  <a 
                    href={siteSettings.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-black hover:text-gray-600 transition-colors"
                  >
                    GitHub
                  </a>
                  <span className="text-xs text-black">/</span>
                </>
              )}
              <a 
                href={siteSettings?.resumeFile?.asset?.url || '/api/download-resume'}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-black hover:text-gray-600 transition-colors"
              >
                Resume
              </a>
            </div>

            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col gap-1.5 w-6 h-6 items-center justify-center"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-black transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-black transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-black transition-all"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-white"
          >
            <div className="flex flex-col items-start justify-center h-full px-8 gap-8">
              {/* Navigation Links */}
              <Link 
                href="/" 
                onClick={closeMenu}
                className="text-2xl text-black hover:text-gray-600 transition-colors"
              >
                Work
              </Link>
              <Link 
                href="/about" 
                onClick={closeMenu}
                className="text-2xl text-black hover:text-gray-600 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/experience" 
                onClick={closeMenu}
                className="text-2xl text-black hover:text-gray-600 transition-colors"
              >
                Experience
              </Link>

              {/* Social Links */}
              <div className="flex flex-col gap-4 mt-8">
                {siteSettings?.socialLinks?.linkedin && (
                  <a 
                    href={siteSettings.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-base text-black hover:text-gray-600 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {siteSettings?.socialLinks?.github && (
                  <a 
                    href={siteSettings.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-base text-black hover:text-gray-600 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                <a 
                  href={siteSettings?.resumeFile?.asset?.url || '/api/download-resume'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="text-base text-black hover:text-gray-600 transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

