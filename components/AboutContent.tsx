'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { About } from '@/types/about'
import { SiteSettings } from '@/types/siteSettings'
import ResumeButton from './ResumeButton'
import { urlFor } from '@/sanity/lib/image'

interface AboutContentProps {
  aboutData: About | null
  siteSettings?: SiteSettings | null
}

// Fallback data
const fallbackBio = [
  "I'm Sam Adekunle, a designer who works across product, brand, and code. I focus on making things that look right, feel intuitive, and actually work.",
  "I've built design systems, shaped brand narratives, and shipped full-stack products, from identity work that resonates to interfaces that feel effortless. My experience spans agencies, education, fintech, and pharma, where I learned to design for both emotion and complexity, balancing clarity with constraint.",
  "Right now, I'm exploring the intersection of creativity and technology, combining design tools with development, systems thinking with storytelling, and AI with product strategy. Whether I'm prototyping an idea, defining a visual language, or building a brand from scratch, I'm always working toward the same thing: making concepts real, intentional, and built to scale.",
  "I'm currently seeking opportunities where I can bring this blend of craft, systems thinking, and technical execution to a team that values thoughtful design and bold ideas. I'm looking to contribute depth, adaptability, and a drive to build things that matter.",
  "Outside of client work, I'm usually testing AI tools, tweaking layouts until they click, or building side projects to push what's possible."
]

export default function AboutContent({ aboutData, siteSettings }: AboutContentProps) {
  const bioParagraphs = aboutData?.bioParagraphs?.map(p => p.text) || fallbackBio
  const pageTitle = aboutData?.title || 'About Me'
  return (
    <section className="w-full px-8 lg:px-16 pt-40 pb-24 relative">
      {/* Decorative Asterisk Element */}
      <motion.div 
        className="fixed right-8 lg:right-16 top-1/3 bg-[#D4FF00] w-16 h-16 flex items-center justify-center"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2L20 38M2 20H38M8 8L32 32M32 8L8 32" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
      
      {/* About Me Title - Left aligned with nav */}
      <motion.h1 
        className="text-base font-normal text-black tracking-[-0.8px] mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {pageTitle}
      </motion.h1>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-sm font-normal leading-relaxed text-[#4a4a4a] space-y-6 max-w-md">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Work with me CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ResumeButton siteSettings={siteSettings} variant="large" buttonText="Work with me" />
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          {aboutData?.decorativeImage && (
            <motion.div
              className="relative w-full h-[400px] lg:h-[600px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src={urlFor(aboutData.decorativeImage).url()}
                alt="About me"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

