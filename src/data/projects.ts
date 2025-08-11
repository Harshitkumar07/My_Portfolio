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
    id: '2',
    title: 'Sports Pulse',
    subtitle: 'Real-time multi-sport scores',
    description:
      'Built a real-time multi-sport score tracking web app supporting cricket, football, basketball, and more. Integrated Firebase Realtime Database for instant updates with minimal latency and seamless cross-device synchronization. Designed a responsive UI with ReactJS for an engaging user experience.',
    technologies: ['ReactJS', 'Firebase Realtime DB', 'JavaScript'],
    features: ['Real-time updates', 'Multi-sport support', 'Responsive UI'],
  },
  {
    id: '3',
    title: 'Diet Recommendation System',
    subtitle: 'ML-powered personalized diet plans',
    description:
      'Full-stack, ML-powered web application that generates personalized diet plans based on user calorie goals, macronutrient preferences, and optional ingredients. Suggests balanced meals with detailed nutritional values and step-by-step recipes. Achieved ~20% improved prediction accuracy through advanced preprocessing and model optimization.',
    technologies: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Streamlit', 'FastAPI'],
    features: ['Personalized meal plans', 'Nutrition breakdown', 'Recipe generation'],
  },
]
