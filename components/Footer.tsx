'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SiteSettings } from '@/types/siteSettings'

interface FooterProps {
  siteSettings?: SiteSettings | null
}

export default function Footer({ siteSettings }: FooterProps = { siteSettings: null }) {
  const resumeUrl = siteSettings?.resumeFile?.asset?.url || '/api/download-resume'
  const socialLinks = siteSettings?.socialLinks
  return (
    <footer className="border-t border-gray-200 py-12 mt-24">
      <div className="w-full px-8 lg:px-16">
        <motion.div 
          className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="w-[60px] h-[60px]">
            <Image
              src="/assets/logo.png"
              alt="Samuel Akorede Adekunle Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>

          {/* Location Info */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-black">
              Made with Love in Philadelphia
            </p>
            <p className="text-xs text-gray-text">
              Built in Figma + Cursor
            </p>
            <p className="text-xs text-gray-text">
              inspo by Eric Sin
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-2 text-xs text-gray-text">
            {socialLinks?.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                LinkedIn
              </a>
            )}
            {socialLinks?.github && (
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                GitHub
              </a>
            )}
            {socialLinks?.twitter && (
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                Twitter
              </a>
            )}
            {socialLinks?.dribbble && (
              <a 
                href={socialLinks.dribbble} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                Dribbble
              </a>
            )}
            {socialLinks?.behance && (
              <a 
                href={socialLinks.behance} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                Behance
              </a>
            )}
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
