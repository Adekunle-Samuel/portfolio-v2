'use client'

import { motion } from 'framer-motion'
import { About } from '@/types/about'
import { SiteSettings } from '@/types/siteSettings'
import ResumeButton from './ResumeButton'

interface ExperienceContentProps {
  aboutData: About | null
  siteSettings: SiteSettings | null
}

// Fallback experience data
const fallbackExperience = [
  { company: 'B150', role: 'Product Designer', period: '2025–Present' },
  { company: 'Ernst & Young (EY)', role: 'Production Designer (Contract)', period: '2024–2025' },
  { company: 'Rowan College at Burlington County', role: 'Visual Designer', period: '2022–2024' }
]

export default function ExperienceContent({ aboutData, siteSettings }: ExperienceContentProps) {
  const workExperience = aboutData?.workExperience?.sort((a, b) => (a.order || 0) - (b.order || 0)) || fallbackExperience
  return (
    <section className="w-full px-8 lg:px-16 pt-40 pb-24 relative">
      {/* Decorative Element */}
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
      
      {/* Work Experience Title */}
      <motion.h1 
        className="text-base font-normal text-black tracking-[-0.8px] mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Work Experience
      </motion.h1>

      <div className="max-w-[900px]">
        {/* Experience List */}
        <div className="space-y-8">
          {workExperience.map((exp, index) => (
            <motion.div
              key={index}
              className="flex items-start justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div>
                <p className="text-sm font-semibold text-black">{exp.company}</p>
                <p className="text-sm text-[#4a4a4a]">{exp.role}</p>
                {exp.description && (
                  <p className="text-sm text-[#8d8d8d] mt-2 max-w-md">{exp.description}</p>
                )}
              </div>
              <p className="text-sm text-[#8d8d8d] whitespace-nowrap">{exp.period}</p>
            </motion.div>
          ))}
        </div>

        {/* Resume Download CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ResumeButton siteSettings={siteSettings} variant="large" />
        </motion.div>
      </div>
    </section>
  )
}

