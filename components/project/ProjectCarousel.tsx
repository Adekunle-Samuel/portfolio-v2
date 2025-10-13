'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/types/project'
import { getOptimizedImageUrl } from '@/lib/sanity.client'

interface ProjectCarouselProps {
  currentSlug: string
  projects: Project[]
}

export default function ProjectCarousel({ currentSlug, projects }: ProjectCarouselProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Filter out current project
  const otherProjects = projects.filter(p => p.slug.current !== currentSlug)

  return (
    <motion.section 
      className="w-full py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full overflow-x-auto px-8 lg:px-16">
        <div className="flex gap-2.5 justify-center min-w-max mx-auto">
          {otherProjects.map((project, index) => (
            <Link 
              key={project._id}
              href={`/projects/${project.slug.current}`}
              onMouseEnter={() => setHoveredId(project._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative w-[249px] h-[140px] rounded-lg overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Project Image */}
                <div className="absolute inset-0">
                  {project.coverImage ? (
                    <img 
                      src={getOptimizedImageUrl(project.coverImage, 498, 280)} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center w-full h-full">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="15" width="40" height="30" rx="2" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
                        <circle cx="20" cy="25" r="3" fill="white" fillOpacity="0.3"/>
                        <path d="M10 38L20 28L30 35L40 25L50 35V42C50 43 49 44 48 44H12C11 44 10 43 10 42V38Z" fill="white" fillOpacity="0.3"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Grayscale overlay - removed on hover */}
                <motion.div
                  className="absolute inset-0 bg-white/60 backdrop-grayscale"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: hoveredId === project._id ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Project Title on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project._id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="text-xs font-bold text-white">{project.title}</p>
                    <p className="text-[10px] text-white/70">{project.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

