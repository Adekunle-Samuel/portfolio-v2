'use client'

import { motion } from 'framer-motion'
import { SideProject } from '@/types/sideProject'
import { getOptimizedImageUrl } from '@/lib/sanity.client'

interface SideProjectsContentProps {
  sideProjects: SideProject[]
}

function domainFromUrl(url: string, displayUrl?: string): string {
  if (displayUrl) return displayUrl
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const ExternalIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
)

function ProjectRow({ project, index }: { project: SideProject; index: number }) {
  const domain = domainFromUrl(project.url, project.displayUrl)
  const reversed = index % 2 === 1
  const showEmbed = project.embed !== false
  const posterUrl = project.poster ? getOptimizedImageUrl(project.poster, 1400, 900) : null

  return (
    <motion.article
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
    >
      {/* Browser-framed preview */}
      <div className={`${reversed ? 'lg:order-2' : ''} border border-gray-200 rounded-xl overflow-hidden bg-white`}>
        <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-gray-200 bg-[#fafafa]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0 flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-text hover:text-black hover:border-gray-300 transition-colors"
          >
            <span className="truncate">{domain}</span>
            <ExternalIcon className="ml-auto flex-shrink-0 text-gray-300" />
          </a>
        </div>

        <div className="relative h-[300px] sm:h-[360px] bg-[#f4f4f4]">
          {showEmbed ? (
            <iframe
              src={project.url}
              title={`${project.title} preview`}
              loading="lazy"
              className="w-full h-full border-0 block"
              referrerPolicy="no-referrer"
            />
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full h-full"
            >
              {posterUrl ? (
                <img src={posterUrl} alt={project.title} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900" />
              )}
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                <span className="flex items-center gap-2 bg-white/95 text-black text-xs font-medium rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-2 h-2 bg-[#D4FF00]" />
                  Open site
                </span>
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Text column */}
      <div className={reversed ? 'lg:order-1' : ''}>
        <p className="text-[11px] uppercase tracking-[0.14em] text-gray-text">Side project</p>
        <h2 className="text-2xl font-medium text-black tracking-[-0.01em] leading-tight mt-2 mb-3.5">
          {project.title}
        </h2>
        {project.excerpt && (
          <p className="text-base text-[#2a2a2a] leading-relaxed max-w-[42ch]">{project.excerpt}</p>
        )}

        {project.tools && project.tools.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-gray-text mb-2.5">Built with</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="text-xs text-black border border-gray-200 rounded-full px-3 py-1">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.goal && (
          <div className="mt-5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-gray-text mb-2">Goal</p>
            <p className="text-[0.95rem] text-[#2a2a2a] leading-relaxed max-w-[42ch]">{project.goal}</p>
          </div>
        )}

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-sm text-black border border-black px-[18px] py-2.5 hover:bg-black hover:text-white transition-colors"
        >
          <span className="w-[7px] h-[7px] bg-[#D4FF00]" />
          Visit site
        </a>
      </div>
    </motion.article>
  )
}

export default function SideProjectsContent({ sideProjects }: SideProjectsContentProps) {
  return (
    <section className="w-full px-8 lg:px-16 pt-32 lg:pt-40 pb-24">
      <div className="max-w-[1440px] mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.16em] text-gray-text mb-4">Lab · Side projects</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black tracking-[-0.02em] leading-[1.05] max-w-[16ch]">
            Things I build on the side
          </h1>
          <p className="text-base sm:text-lg text-[#2a2a2a] leading-relaxed max-w-[52ch] mt-5">
            Small experiments and tools I make in my spare time. Each one is live — click in and
            play with it, or open the full thing.
          </p>
        </motion.header>

        {sideProjects.length > 0 ? (
          <div className="mt-16 lg:mt-20 flex flex-col gap-20 lg:gap-24">
            {sideProjects.map((project, index) => (
              <ProjectRow key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-base text-gray-text">
            No side projects yet — add one in the Studio under “Side Project.”
          </p>
        )}
      </div>
    </section>
  )
}
