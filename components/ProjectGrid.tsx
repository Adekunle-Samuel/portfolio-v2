'use client'

import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  activeFilter: string
}

export default function ProjectGrid({ projects, activeFilter }: ProjectGridProps) {
  // Filter projects based on the active filter
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true
    return project.categories?.includes(activeFilter)
  })

  return (
    <section className="w-full px-8 lg:px-16 py-12">
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}

