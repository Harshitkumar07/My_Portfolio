export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
  subtitle?: string
  features?: string[]
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    subtitle: 'Personal brand site',
    description:
      'A modern, animated portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion with themeable space/earth backgrounds.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/Harshitkumar07/My_Portfolio',
    liveUrl: 'https://your-portfolio-live-link.com',
    features: [
      'Animated canvas starfield and earth accents',
      'Accessible navigation and motion preferences',
      'Responsive, performance-focused UI',
    ],
  },
  {
    id: '3',
    title: 'E‑Commerce Platform',
    subtitle: 'Full-stack monorepo',
    description:
      'End-to-end commerce app including auth, product management, carts, and Stripe payments.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
    githubUrl: 'https://github.com/Harshitkumar07/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    features: ['Secure checkout', 'Admin dashboard', 'Responsive UI'],
  },
]
