'use client'

import { useState } from 'react'
import { Project } from '@/types/project'
import ProjectFilter from './ProjectFilter'
import ProjectGrid from './ProjectGrid'

interface ProjectSectionProps {
  projects: Project[]
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <>
      <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ProjectGrid projects={projects} activeFilter={activeFilter} />
    </>
  )
}

