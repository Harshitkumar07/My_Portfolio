'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, type ReactNode } from 'react'
import Image from 'next/image'
import type React from 'react'
import type { Variants } from 'framer-motion'
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPython, SiMongodb, SiMysql, SiFirebase, SiRedis,
  SiGit, SiGithub, SiVercel, SiFigma, SiPostman, SiLeetcode, SiGeeksforgeeks
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb'
import ParallaxScene from '../components/ParallaxScene'
import { projects } from '../data/projects'
import { sendContactEmail } from '../lib/email'

// Roles used in the typewriter effect (module scope to keep stable reference)
const ROLES = ['Aspiring Full Stack Developer', 'Software Engineer', 'Data Science Engineer', 'Frontend Developer', 'Backend Developer']

const frontendIcons: Record<string, ReactNode> = {
  'HTML5': <SiHtml5 className="text-orange-500 w-5 h-5" />,
  'CSS3': <SiCss3 className="text-blue-600 w-5 h-5" />,
  'JavaScript': <SiJavascript className="text-yellow-400 w-5 h-5" />,
  'React.js': <SiReact className="text-cyan-400 w-5 h-5" />,
  'TypeScript': <SiTypescript className="text-blue-500 w-5 h-5" />,
  'Tailwind CSS': <SiTailwindcss className="text-teal-400 w-5 h-5" />,
};

const backendIcons: Record<string, ReactNode> = {
  'Node.js': <SiNodedotjs className="text-green-600 w-5 h-5" />,
  'Express.js': <SiNodedotjs className="text-gray-800 dark:text-white w-5 h-5" />,
  'Python': <SiPython className="text-yellow-500 w-5 h-5" />,
  'Java': <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 to-orange-400 flex items-center justify-center"><span className="text-white text-xs font-bold">J</span></div>,
  'FastAPI': <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"><span className="text-white text-[10px] font-bold">FA</span></div>,
};

const toolsIcons: Record<string, ReactNode> = {
  'Git': <SiGit className="text-orange-600 w-5 h-5" />,
  'GitHub': <SiGithub className="text-black dark:text-white w-5 h-5" />,
  'VS Code': <TbBrandVscode className="text-blue-600 w-5 h-5" />,
  'Vercel': <SiVercel className="text-black dark:text-white w-5 h-5" />,
  'Figma': <SiFigma className="text-pink-500 w-5 h-5" />,
  'Postman': (SiPostman
    ? <SiPostman className="text-orange-500 w-5 h-5" />
    : <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"><span className="text-white text-[9px] font-bold">PM</span></div>
  ),
  'C': <div className="w-5 h-5 rounded-full bg-sky-600 flex items-center justify-center"><span className="text-white text-[10px] font-bold">C</span></div>,
  'C++': <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center"><span className="text-white text-[10px] font-bold">C++</span></div>,
  'Java': <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 to-orange-400 flex items-center justify-center"><span className="text-white text-xs font-bold">J</span></div>,
};

const databaseIcons: Record<string, ReactNode> = {
  'MongoDB': <SiMongodb className="text-green-500 w-5 h-5" />,
  'MySQL': <SiMysql className="text-blue-700 w-5 h-5" />,
  'Firebase': <SiFirebase className="text-yellow-400 w-5 h-5" />,
  'Redis': <SiRedis className="text-red-500 w-5 h-5" />,
};

// Contact info constants (update these with your real details)
const contact = {
  email: 'csds22137@glbitm.ac.in',
  phone: '+91 9811745393',
  linkedin: 'https://www.linkedin.com/in/harshit-kumar-573579203/',
  github: 'https://github.com/Harshitkumar07',
  leetcode: 'https://leetcode.com/u/Harshitkumar07/',
  geeksforgeeks: 'https://www.geeksforgeeks.org/user/notharshit/',
  portfolio: '/',
};


// Starburst animation variants for skill items
const starburstItem: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -12, filter: 'blur(6px)' },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 300, damping: 22, delay: i * 0.06 },
  }),
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [certPreviewSrc, setCertPreviewSrc] = useState<string | null>(null)
  const [certPreviewHref, setCertPreviewHref] = useState<string | null>(null)

  // Role typewriter effect
  const [typedText, setTypedText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(ROLES[0])
      return
    }

    const current = ROLES[roleIdx % ROLES.length]
    const isComplete = typedText === current
    const isEmpty = typedText.length === 0

    let delay = 80
    if (isDeleting) delay = 35
    if (!isDeleting && isComplete) delay = 1200
    if (isDeleting && isEmpty) delay = 400

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (!isComplete) {
          setTypedText(current.slice(0, typedText.length + 1))
        } else {
          setIsDeleting(true)
        }
      } else {
        if (!isEmpty) {
          setTypedText(current.slice(0, typedText.length - 1))
        } else {
          setIsDeleting(false)
          setRoleIdx((i) => (i + 1) % ROLES.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, roleIdx, prefersReducedMotion])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
    } catch (error) {
      console.error('Contact Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Resolve a safe profile image src for Next/Image
  const envProfile = process.env.NEXT_PUBLIC_PROFILE_IMG
  const isHttp = (s: string) => /^https?:\/\//i.test(s)
  const toPublicPath = (s?: string): string => {
    if (!s) return ''
    let v = s.trim()
    // normalize Windows backslashes
    v = v.replace(/\\\\/g, '/').replace(/\\/g, '/')
    if (isHttp(v)) return v
    // disallow absolute file/system paths like C:/... or file:...
    if (/^[a-zA-Z]:\//.test(v) || /^file:/i.test(v)) return ''
    // handle protocol-relative URLs
    if (v.startsWith('//')) return 'https:' + v
    if (v.startsWith('/')) return v
    if (v.startsWith('public/')) return '/' + v.replace(/^public\//, '')
    // allow simple filenames (no slashes) from public/
    if (/^[\w\-.]+$/.test(v)) return '/' + v
    return ''
  }
  const normalizedEnv = toPublicPath(envProfile)
  if (envProfile && !normalizedEnv) {
    console.warn('Invalid NEXT_PUBLIC_PROFILE_IMG value; falling back to default image:', envProfile)
  }
  const profileSrc: string = normalizedEnv || '/1754872883418.png'
  const isExternal = isHttp(profileSrc)

  return (
    <main className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:!bg-none dark:!bg-transparent dark:!from-transparent dark:!to-transparent">
      {/* Home Section */}
      <section id="home" className="pt-16 md:pt-24">
        <div className="w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 items-center md:h-[calc(100svh-6rem)]">
              {/* Left: Photo (second on mobile) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="order-2 md:order-1 h-full md:min-h-[calc(100svh-6rem)] flex items-center justify-center"
              >
                <div className="relative aspect-square w-[52vw] sm:w-[48vw] md:w-[min(36vw,55vh)] lg:w-[min(34vw,65vh)] xl:w-[min(32vw,72vh)] 2xl:w-[min(30vw,78vh)] rounded-full overflow-hidden ring-4 ring-purple-500/40 shadow-2xl bg-gradient-to-br from-cosmic-blue/40 to-cosmic-purple/50">
                  <Image
                    src={profileSrc}
                    alt="Harshit Kumar"
                    fill
                    sizes="(max-width: 640px) 62vw, (max-width: 768px) 55vw, (max-width: 1024px) 36vw, (max-width: 1280px) 34vw, (max-width: 1536px) 32vw, 30vw"
                    className="object-cover"
                    unoptimized={isExternal}
                    priority
                  />
                </div>
              </motion.div>

              {/* Right: Content (first on mobile) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="order-1 md:order-2 h-full md:min-h-[calc(100svh-6rem)] flex flex-col justify-center text-left"
              >
                <p className="text-sm md:text-base text-gray-600 dark:text-cosmic-silver mb-2">Hello there! I&apos;m</p>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Harshit <span className="text-cosmic-purple">Kumar</span>
                </h1>
                <p className="text-xl md:text-2xl text-cosmic-blue dark:text-cosmic-cyan font-semibold mt-3">
                  <span>{typedText}</span>
                  {!prefersReducedMotion && (
                    <span className="ml-0.5 inline-block align-baseline border-r-2 border-cosmic-blue dark:border-cosmic-cyan animate-pulse" style={{ height: '1.2em' }} />
                  )}
                </p>
                <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-cosmic-silver max-w-2xl">
                  Final-year B.Tech student passionate about creating innovative web solutions and building the future of technology
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-block"
                  >
                    Contact Me
                  </motion.a>
                  <motion.a
                    href={process.env.NEXT_PUBLIC_RESUME_URL || '/resume.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview Resume
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
            {[
              { title: 'Modern Tech Stack', description: 'Built with Next.js, TypeScript, and Tailwind CSS', icon: '⚡' },
              { title: 'Responsive Design', description: 'Optimized for all devices and screen sizes', icon: '📱' },
              { title: 'Performance Focused', description: 'Fast loading and smooth animations', icon: '🚀' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 rounded-2xl shadow-xl text-center border border-white/20 dark:border-slate-200/10 backdrop-blur-md bg-white/30 dark:!bg-transparent ring-1 ring-blue-400/10 hover:ring-2 hover:ring-fuchsia-400/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center glass-section">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: About & Goals */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">About</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    I&apos;m a final-year B.Tech student passionate about full-stack development.
                    I love solving complex problems through code and creating user-centric applications.
                    My journey in tech started with curiosity and has evolved into a deep passion for
                    building innovative solutions.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Goals</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    To become a skilled full-stack developer, contribute to meaningful projects,
                    and continuously learn emerging technologies. I aim to work with innovative
                    companies that value creativity and technical excellence.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Relevant Coursework</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Data Structures & Algorithms', 'DBMS', 'OOP', 'Operating Systems', 'Computer Networks', 'Machine Learning', 'Data Mining', 'Probability & Statistics'].map((cw) => (
                      <span key={cw} className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 dark:bg-white/5 dark:text-blue-300 border border-blue-200/50 dark:border-white/10">{cw}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Problem Solving', 'Communication', 'Teamwork', 'Ownership', 'Adaptability', 'Time Management'].map((sk) => (
                      <span key={sk} className="px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-700 dark:bg-white/5 dark:text-purple-300 border border-purple-200/50 dark:border-white/10">{sk}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right: Education Ladder */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Education</h3>
                <div className="relative">
                  <div aria-hidden className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/60 to-purple-600/60" />
                  <ul className="space-y-8">
                    {/* Class 10 */}
                    <li className="relative pl-12">
                      <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-blue-500/20 text-sm font-bold">10</span>
                      <div className="glass-card rounded-xl p-4 dark:!bg-transparent border border-white/20 dark:border-slate-200/10">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Class 10 – R.S.S. International School, Noida</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Percentage: 82% • 2019</p>
                      </div>
                    </li>
                    {/* Class 12 */}
                    <li className="relative pl-12">
                      <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-fuchsia-600 text-white flex items-center justify-center ring-4 ring-fuchsia-500/20 text-sm font-bold">12</span>
                      <div className="glass-card rounded-xl p-4 dark:!bg-transparent border border-white/20 dark:border-slate-200/10">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Class 12 (PCM) – R.S.S. International School, Noida</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Percentage: 92% • 2021</p>
                      </div>
                    </li>
                    {/* B.Tech */}
                    <li className="relative pl-12">
                      <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center ring-4 ring-purple-500/20 text-sm font-bold">B</span>
                      <div className="glass-card rounded-xl p-4 dark:!bg-transparent border border-white/20 dark:border-slate-200/10">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">B.Tech in Computer Science (Data Science)</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">G.L. Bajaj Institute of Technology and Management, Greater Noida • 2022–Present</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center glass-section">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.7 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
            >
              Skills & Technologies
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Frontend */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, type: 'spring', bounce: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Frontend
                </h3>
                <div className="space-y-3">
                  {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'TypeScript', 'Tailwind CSS'].map((skill, idx) => (
  <motion.div
    key={skill}
    custom={idx}
    variants={starburstItem}
    initial="hidden"
    whileInView="show"
    animate={prefersReducedMotion ? { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' } : undefined}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ scale: 1.03 }}
    className="flex items-center space-x-2"
  >
    {frontendIcons[skill] || <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </motion.div>
))}
                </div>
              </motion.div>
              
              {/* Backend */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Backend
                </h3>
                <div className="space-y-3">
                  {['Node.js', 'Express.js', 'Python', 'FastAPI', 'Java'].map((skill, idx) => (
  <motion.div
    key={skill}
    custom={idx}
    variants={starburstItem}
    initial="hidden"
    whileInView="show"
    animate={prefersReducedMotion ? { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' } : undefined}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ scale: 1.03 }}
    className="flex items-center space-x-2"
  >
    {backendIcons[skill] || <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </motion.div>
))}
                </div>
              </motion.div>
              
              {/* Database */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Database
                </h3>
                <div className="space-y-3">
                  {['MongoDB', 'MySQL', 'Firebase', 'Redis'].map((skill, idx) => (
  <motion.div
    key={skill}
    custom={idx}
    variants={starburstItem}
    initial="hidden"
    whileInView="show"
    animate={prefersReducedMotion ? { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' } : undefined}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ scale: 1.03 }}
    className="flex items-center space-x-2"
  >
    {databaseIcons[skill] || <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </motion.div>
))}
                </div>
              </motion.div>
              
              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Tools & Others
                </h3>
                <div className="space-y-3">
                  {['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Figma', 'C', 'C++', 'Java'].map((skill, idx) => (
  <motion.div
    key={skill}
    custom={idx}
    variants={starburstItem}
    initial="hidden"
    whileInView="show"
    animate={prefersReducedMotion ? { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' } : undefined}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ scale: 1.03 }}
    className="flex items-center space-x-2"
  >
    {toolsIcons[skill] || <div className="w-2 h-2 bg-gray-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </motion.div>
))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center glass-section">
        <div className="container mx-auto px-4 py-16">
          <ParallaxScene intensity={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
                Featured Projects
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    animate={prefersReducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : undefined}
                    transition={{ duration: 0.7, delay: 0.1 + idx * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative group bg-gray-50 dark:!bg-transparent backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer ring-1 ring-gray-300 dark:ring-white/15 hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${p.title} details`}
                    onClick={() => {
                      const url = p.liveUrl || p.githubUrl;
                      if (url) window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const url = p.liveUrl || p.githubUrl;
                        if (url) window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {p.imageUrl ? (
                      <div className="relative h-48 w-full">
                        <Image
                          src={p.imageUrl}
                          alt={`${p.title} cover`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized={/^https?:\/\//i.test(p.imageUrl ?? '')}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-6xl">🚀</div>
                      </div>
                    )}
                    {/* Shimmer overlay */}
                    <div className="pointer-events-none absolute inset-0">
                      <motion.div
                        initial={{ x: '-150%' }}
                        whileInView={{ x: '150%' }}
                        animate={prefersReducedMotion ? { x: 0 } : undefined}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 + idx * 0.05 }}
                        className="h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        {p.title}
                      </h3>
                      {p.subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{p.subtitle}</p>
                      )}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        {p.githubUrl && (
                          <a 
                            href={p.githubUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                          </a>
                        )}
                        {p.liveUrl && (
                          <a 
                            href={p.liveUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ParallaxScene>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="min-h-screen flex items-center justify-center glass-section">
        <div className="container mx-auto px-4 py-16">
          <ParallaxScene intensity={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-6xl mx-auto"
            >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              Certificates & Achievements
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Certificate 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Data Science Master
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    Altair
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Issued: Sep–Nov 2023
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Hands-on program covering data analysis, visualization, and ML foundations using Python, Pandas, NumPy, and Altair.
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => { setCertPreviewSrc('/certificates/Data Science Master (Altair).jpeg'); setCertPreviewHref('https://drive.google.com/file/d/112uGh3Y8kk18aQA5-CTrxEYM7lCfo7dX/view?usp=drive_link') }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    aria-label="Preview Data Science Master certificate"
                  >
                    Preview
                  </button>
                </div>
              </motion.div>
              
              {/* Certificate 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Coding World Cup — AIR 519
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    Coding World Cup
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Issued: Nov 2023
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Achieved All India Rank 519 in a national-level coding competition.
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => { setCertPreviewSrc('/certificates/Coding World Cup (Coding Ninjas).jpeg'); setCertPreviewHref('https://drive.google.com/file/d/1Aqzj_E1fH9AoFmymauLDcuc7K9dQ8DrV/view?usp=drive_link') }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    aria-label="Preview Coding World Cup certificate"
                  >
                    Preview
                  </button>
                </div>
              </motion.div>
              
              {/* Certificate 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Data Analytics Process Automation
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    Certification Program
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Issued: Apr–Jun 2024
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Automated data preparation and analytics workflows; hands-on with ETL, dashboards, and process automation.
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => { setCertPreviewSrc('/certificates/Data Analytics Process Automation (Alteryx).jpeg'); setCertPreviewHref('https://drive.google.com/file/d/1AhpM9MEAQUicuyRGkoNudet0futEbFR1/view?usp=drive_link') }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    aria-label="Preview Data Analytics Process Automation certificate"
                  >
                    Preview
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
          </ParallaxScene>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center glass-section">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              Get In Touch
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Send me a message
                </h3>
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Thank you for your message! I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        Failed to send message. Please try again or contact me directly.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
                        errors.name 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
                        errors.email 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder={contact.email}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors ${
                        errors.message 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`w-full px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              </motion.div>
              
              {/* Contact Info & Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                    Let&apos;s connect!
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    I&apos;m always open to discussing new opportunities, interesting projects, 
                    or just having a chat about technology. Feel free to reach out!
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-white font-semibold">Email</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-white font-semibold">Phone</p>
                      <p className="text-gray-600 dark:text-gray-300">{contact.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Follow me on
                  </h4>
                  <div className="flex space-x-4">
                    <a 
                      href={contact.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href={contact.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href={contact.leetcode}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="LeetCode"
                    >
                      <SiLeetcode className="w-6 h-6 text-white" />
                    </a>
                    <a 
                      href={contact.geeksforgeeks}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="GeeksforGeeks"
                    >
                      <SiGeeksforgeeks className="w-6 h-6 text-white" />
                    </a>
                    <a 
                      href={contact.portfolio}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-slate-700 hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Portfolio"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Certificate preview overlay */}
      <AnimatePresence>
        {certPreviewSrc && (
          <motion.div
            key="cert-preview"
            className="fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => { setCertPreviewSrc(null); setCertPreviewHref(null) }}
            />
            <motion.div
              className="relative z-[71] max-w-3xl w-[min(92vw,720px)] max-h-[80vh] overflow-auto rounded-2xl border border-white/15 bg-white/80 dark:bg-[#0f1226]/80 backdrop-blur-md p-3 shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              role="dialog"
              aria-modal="true"
              aria-label="Certificate preview"
            >
              <button
                onClick={() => { setCertPreviewSrc(null); setCertPreviewHref(null) }}
                className="absolute top-3 right-3 inline-flex items-center justify-center rounded-lg p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close preview"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="mb-3 flex justify-end">
                <a
                  href={certPreviewHref ?? certPreviewSrc ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview in new tab
                </a>
              </div>
              
              <div className="relative w-full h-[70vh] mx-auto rounded-lg overflow-hidden">
                <Image
                  src={certPreviewSrc ?? ''}
                  alt="Certificate preview image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 92vw, 720px"
                  unoptimized={/^https?:\/\//i.test(certPreviewSrc ?? '')}
                  onError={() => { setCertPreviewSrc('https://placehold.co/1200x800/png?text=Certificate+Preview') }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
