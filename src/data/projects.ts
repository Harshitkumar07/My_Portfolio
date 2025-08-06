export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://portfolio.example.com'
  },
  // Add more projects here
]
