'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ImageGrid from './ImageGrid'
import { getOptimizedImageUrl } from '@/lib/sanity.client'

interface CaseStudyBodyProps {
  project: any
  onImageClick?: (imageUrl: string) => void
}

interface SectionBlock {
  id: string
  navLabel: string
  title: string
  text?: string
  bullets?: string[]
  image?: any
  video?: { asset?: { url?: string } } | null
}

/** Split CMS text into paragraphs (blank line) and line breaks (single \n). */
function Prose({ text }: { text?: string }) {
  if (!text) return null
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  return (
    <>
      {paragraphs.map((para, i) => {
        const lines = para.split(/\n/)
        return (
          <p key={i} className="text-base text-[#2a2a2a] leading-7 mb-4 last:mb-0">
            {lines.map((line, j) => (
              <span key={j}>
                {line}
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )
      })}
    </>
  )
}

/** Render a bullet, bolding a leading "Label: rest" pattern. */
function Bullet({ text }: { text: string }) {
  const match = text.match(/^([^:–-]{2,40}):\s+(.*)$/)
  if (match) {
    return (
      <span>
        <strong className="font-semibold text-black">{match[1]}:</strong> {match[2]}
      </span>
    )
  }
  return <span>{text}</span>
}

function BulletList({ bullets }: { bullets?: string[] }) {
  if (!bullets || bullets.length === 0) return null
  return (
    <ul className="mt-2 border-t border-gray-200">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="relative text-base text-[#2a2a2a] leading-7 py-3 pl-7 border-b border-gray-200"
        >
          <span className="absolute left-0 top-[1.45rem] w-2 h-2 bg-[#D4FF00]" />
          <Bullet text={b} />
        </li>
      ))}
    </ul>
  )
}

export default function CaseStudyBody({ project, onImageClick }: CaseStudyBodyProps) {
  const [activeId, setActiveId] = useState<string>('overview')
  const articleRef = useRef<HTMLDivElement>(null)

  // Build the ordered list of text sections (overview → tldr → content → conclusion).
  const sections: SectionBlock[] = useMemo(() => {
    const out: SectionBlock[] = []
    out.push({
      id: 'overview',
      navLabel: 'Overview',
      title: project.title,
      text: project.overview || 'Project overview coming soon...',
    })
    if (project.tldr) {
      out.push({
        id: 'tldr',
        navLabel: project.tldr.title || 'TLDR',
        title: project.tldr.title || 'TLDR',
        text: project.tldr.text,
        bullets: project.tldr.bullets,
        image: project.tldr.image,
        video: project.tldr.video,
      })
    }
    project.contentSections?.forEach((s: any, i: number) => {
      out.push({
        id: `section-${i}`,
        navLabel: s.title,
        title: s.title,
        text: s.text,
        bullets: s.bullets,
        image: s.image,
        video: s.video,
      })
    })
    if (project.conclusion) {
      out.push({
        id: 'conclusion',
        navLabel: project.conclusion.title || 'Conclusion',
        title: project.conclusion.title || 'Conclusion',
        text: project.conclusion.text,
        bullets: project.conclusion.bullets,
      })
    }
    return out
  }, [project])

  // Scroll-spy: the active section is the last one whose top has passed the
  // reading line (~160px below the sticky nav). Robust for tall or short sections.
  useEffect(() => {
    const ids = sections.map((s) => s.id)

    const update = () => {
      const offset = 160
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) current = id
        else break
      }
      // Pin the last section once the page is scrolled to the bottom.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1]
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sections])

  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.timeline },
    { label: 'Tools', value: project.tools },
  ].filter((m) => m.value)

  return (
    <section className="w-full px-8 lg:px-16 py-16 lg:py-20 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-20 items-start">
        {/* Sticky context rail */}
        <aside className="hidden lg:block sticky top-28 self-start">
          {meta.map((m) => (
            <div key={m.label} className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-gray-text mb-1.5">
                {m.label}
              </p>
              <p className="text-sm text-black leading-snug">{m.value}</p>
            </div>
          ))}

          <hr className="border-gray-200 my-6" />

          <nav className="flex flex-col">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveId(s.id)}
                className={`pl-4 py-3.5 text-[13px] leading-relaxed border-l-2 transition-colors line-clamp-2 ${
                  activeId === s.id
                    ? 'text-black border-[#D4FF00]'
                    : 'text-gray-text border-gray-200 hover:text-black'
                }`}
              >
                {s.navLabel}
              </a>
            ))}
          </nav>
        </aside>

        {/* Reading column */}
        <div ref={articleRef} className="max-w-[760px]">
          {sections.map((s) => {
            const imageUrl = s.image ? getOptimizedImageUrl(s.image, 1400, 634) : null
            const videoUrl = s.video?.asset?.url
            return (
              <div key={`wrap-${s.id}`}>
              {/* Gallery sits just before the conclusion */}
              {s.id === 'conclusion' && project.gallery && (
                <div className="mb-14">
                  <ImageGrid
                    largeImage={project.gallery.largeImage}
                    largeVideo={project.gallery.largeVideo}
                    smallImages={project.gallery.smallImages}
                    onImageClick={onImageClick}
                  />
                </div>
              )}
              <motion.section
                key={s.id}
                id={s.id}
                className="mb-16 lg:mb-24 scroll-mt-28"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-[64ch]">
                  <h2 className="text-2xl font-medium text-black tracking-[-0.01em] leading-tight mb-4 max-w-[26ch]">
                    {s.title}
                  </h2>
                  <Prose text={s.text} />
                  <BulletList bullets={s.bullets} />
                </div>

                {videoUrl ? (
                  <figure className="mt-7">
                    <video
                      src={videoUrl}
                      className="w-full rounded-lg"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </figure>
                ) : imageUrl ? (
                  <figure className="mt-7">
                    <img
                      src={imageUrl}
                      alt={s.title}
                      className="w-full rounded-lg cursor-pointer"
                      onClick={() => onImageClick?.(imageUrl)}
                    />
                  </figure>
                ) : null}
              </motion.section>
              </div>
            )
          })}

          {/* Gallery falls back to the end when there is no conclusion */}
          {project.gallery && !project.conclusion && (
            <div className="mt-14">
              <ImageGrid
                largeImage={project.gallery.largeImage}
                largeVideo={project.gallery.largeVideo}
                smallImages={project.gallery.smallImages}
                onImageClick={onImageClick}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
