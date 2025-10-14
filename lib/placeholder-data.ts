import { Project } from '@/types/project'

// Sample placeholder projects to show when Sanity has no content yet
export const placeholderProjects: Project[] = [
  {
    _id: 'placeholder-1',
    title: 'Project Name',
    slug: { current: 'project-1' },
    categories: ['brand', 'design'],
    coverImage: null as any,
    description: 'A sample project showcasing brand design work',
    projectUrl: 'https://example.com',
  },
  {
    _id: 'placeholder-2',
    title: 'Product Design',
    slug: { current: 'product-design' },
    categories: ['design'],
    coverImage: null as any,
    description: 'User-centered product design case study',
  },
  {
    _id: 'placeholder-3',
    title: 'Web Development',
    slug: { current: 'web-development' },
    categories: ['development'],
    coverImage: null as any,
    description: 'Full-stack web application',
    projectUrl: 'https://example.com',
  },
  {
    _id: 'placeholder-4',
    title: 'Visual Identity',
    slug: { current: 'visual-identity' },
    categories: ['brand', 'design'],
    coverImage: null as any,
    description: 'Complete brand identity system',
  },
  {
    _id: 'placeholder-5',
    title: 'Mobile App',
    slug: { current: 'mobile-app' },
    categories: ['design', 'development'],
    coverImage: null as any,
    description: 'iOS and Android application design',
    projectUrl: 'https://example.com',
  },
  {
    _id: 'placeholder-6',
    title: 'Creative Direction',
    slug: { current: 'creative-direction' },
    categories: ['brand'],
    coverImage: null as any,
    description: 'Art direction for digital campaign',
  },
]

