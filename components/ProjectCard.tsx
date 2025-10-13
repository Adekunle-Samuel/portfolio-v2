'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/types/project'
import { urlFor } from '@/lib/sanity.client'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const imageUrl = project.coverImage 
    ? urlFor(project.coverImage).width(912).height(498).quality(90).format('webp').url()
    : null

  return (
    <Link href={`/projects/${project.slug.current}`}>
      <motion.div
        className="relative w-full aspect-[456/249] rounded-lg overflow-hidden cursor-pointer group"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
      {/* Project Image or Placeholder */}
      <div className="absolute inset-0">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="60" height="50" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
              <circle cx="25" cy="30" r="5" fill="white" fillOpacity="0.3"/>
              <path d="M10 50L25 35L40 45L55 30L70 45V60C70 62.2091 68.2091 64 66 64H14C11.7909 64 10 62.2091 10 60V50Z" fill="white" fillOpacity="0.3"/>
            </svg>
          </div>
        )}
      </div>

      {/* Overlay - appears on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent from-[53%] via-black/50 to-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content - appears on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-white">
              {project.title}
            </h3>
            <div className="border border-[#d9d9d9] rounded-lg px-2 py-0.5 inline-flex w-fit">
              <span className="text-[10px] font-regular text-white/50 tracking-tight">
                {project.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[8px] font-thin text-white tracking-tight">
              View
            </span>
            <svg 
              width="8" 
              height="8" 
              viewBox="0 0 8 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M1.60156 6.93848L6.40156 2.13848M6.40156 2.13848H1.60156M6.40156 2.13848V6.93848" 
                stroke="white" 
                strokeWidth="0.8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </Link>
  )
}

