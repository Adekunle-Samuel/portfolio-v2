'use client'

import { motion } from 'framer-motion'

interface ProjectInfoProps {
  overview: string
  timeline: string
  tools: string
  role: string
}

export default function ProjectInfo({ overview, timeline, tools, role }: ProjectInfoProps) {
  return (
    <motion.section 
      className="w-full px-8 lg:px-16 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-10">
        {/* Overview */}
        <div className="flex flex-col gap-2 max-w-[460px]">
          <h2 className="text-sm font-medium text-gray-text tracking-tight">
            Product Overview
          </h2>
          <p className="text-xs text-black leading-relaxed">
            {overview}
          </p>
        </div>

        {/* Project Details */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-text tracking-tight">
              Timeline
            </h3>
            <p className="text-xs text-black">
              {timeline}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-text tracking-tight">
              Tools
            </h3>
            <p className="text-xs text-black">
              {tools}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-text tracking-tight">
              Role
            </h3>
            <p className="text-xs text-black">
              {role}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

