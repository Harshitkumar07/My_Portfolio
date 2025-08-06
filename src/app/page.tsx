'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPython, SiPhp, SiGraphql, SiMongodb, SiMysql, SiPostgresql, SiFirebase, SiRedis, SiSqlite,
  SiGit, SiGithub, SiVscodium, SiDocker, SiAmazon, SiVercel, SiFigma
} from 'react-icons/si';

const frontendIcons: Record<string, JSX.Element> = {
  'HTML5': <SiHtml5 className="text-orange-500 w-5 h-5" />,
  'CSS3': <SiCss3 className="text-blue-600 w-5 h-5" />,
  'JavaScript': <SiJavascript className="text-yellow-400 w-5 h-5" />,
  'React.js': <SiReact className="text-cyan-400 w-5 h-5" />,
  'Next.js': <SiNextdotjs className="text-gray-900 dark:text-white w-5 h-5" />,
  'TypeScript': <SiTypescript className="text-blue-500 w-5 h-5" />,
  'Tailwind CSS': <SiTailwindcss className="text-teal-400 w-5 h-5" />,
};
const backendIcons: Record<string, JSX.Element> = {
  'Node.js': <SiNodedotjs className="text-green-600 w-5 h-5" />,
  'Express.js': <SiNodedotjs className="text-gray-800 dark:text-white w-5 h-5" />,
  'Python': <SiPython className="text-yellow-500 w-5 h-5" />,
  'Java': <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 to-orange-400 flex items-center justify-center"><span className="text-white text-xs font-bold">J</span></div>,
  'PHP': <SiPhp className="text-indigo-600 w-5 h-5" />,
  'RESTful APIs': <SiNodedotjs className="text-green-600 w-5 h-5" />,
  'GraphQL': <SiGraphql className="text-pink-500 w-5 h-5" />,
};
const toolsIcons: Record<string, JSX.Element> = {
  'Git': <SiGit className="text-orange-600 w-5 h-5" />,
  'GitHub': <SiGithub className="text-black dark:text-white w-5 h-5" />,
  'VS Code': <SiVscodium className="text-blue-600 w-5 h-5" />,
  'Docker': <SiDocker className="text-blue-400 w-5 h-5" />,
  'AWS': <SiAmazon className="text-yellow-600 w-5 h-5" />,
  'Vercel': <SiVercel className="text-black dark:text-white w-5 h-5" />,
  'Figma': <SiFigma className="text-pink-500 w-5 h-5" />,
  'Java': <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 to-orange-400 flex items-center justify-center"><span className="text-white text-xs font-bold">J</span></div>,
};
const databaseIcons: Record<string, JSX.Element> = {
  'MongoDB': <SiMongodb className="text-green-500 w-5 h-5" />,
  'MySQL': <SiMysql className="text-blue-700 w-5 h-5" />,
  'PostgreSQL': <SiPostgresql className="text-blue-500 w-5 h-5" />,
  'Firebase': <SiFirebase className="text-yellow-400 w-5 h-5" />,
  'Redis': <SiRedis className="text-red-500 w-5 h-5" />,
  'SQLite': <SiSqlite className="text-blue-400 w-5 h-5" />,
};


export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a1026] dark:to-cosmic-purple">
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-purple flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                JD
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                John Doe
              </h1>
              <p className="text-2xl md:text-3xl text-cosmic-blue dark:text-cosmic-cyan font-semibold mt-4">
                Aspiring Full Stack Developer
              </p>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-cosmic-silver mb-8 max-w-3xl mx-auto"
            >
              Final-year B.Tech student passionate about creating innovative web solutions and building the future of technology
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
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
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Create a dummy resume download
                  const link = document.createElement('a')
                  link.href = '/resume.pdf' // You'll need to add this file to public folder
                  link.download = 'John_Doe_Resume.pdf'
                  link.click()
                }}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
          
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
                className="glass-card p-6 rounded-2xl shadow-xl text-center border border-white/20 dark:border-slate-200/10 backdrop-blur-xl bg-white/30 dark:bg-[#1a1a2e]/40 ring-1 ring-blue-400/10 hover:ring-2 hover:ring-fuchsia-400/30 transition-all duration-300"
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
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center glass-card">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-80 h-80 mx-auto glass-card rounded-2xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl border border-white/20 dark:border-slate-200/10 backdrop-blur-xl bg-gradient-to-br from-blue-500/60 via-fuchsia-500/40 to-purple-700/60">
                  JD
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Education</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    <strong>B.Tech in Computer Science Engineering</strong><br/>
                    XYZ University | 2021-2025<br/>
                    CGPA: 8.5/10
                  </p>
                </div>
                
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
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.7 }}
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
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Frontend
                </h3>
                <div className="space-y-3">
                  {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((skill) => (
  <div key={skill} className="flex items-center space-x-2">
    {frontendIcons[skill] || <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </div>
))}
                </div>
              </motion.div>
              
              {/* Backend */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.3 }}
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Backend
                </h3>
                <div className="space-y-3">
                  {['Node.js', 'Express.js', 'Python', 'Java', 'PHP', 'RESTful APIs', 'GraphQL'].map((skill) => (
  <div key={skill} className="flex items-center space-x-2">
    {backendIcons[skill] || <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </div>
))}
                </div>
              </motion.div>
              
              {/* Database */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Database
                </h3>
                <div className="space-y-3">
                  {['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis', 'SQLite'].map((skill) => (
  <div key={skill} className="flex items-center space-x-2">
    {databaseIcons[skill] || <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </div>
))}
                </div>
              </motion.div>
              
              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(131,56,236,0.18)' }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Tools & Others
                </h3>
                <div className="space-y-3">
                  {['Git', 'GitHub', 'VS Code', 'Docker', 'AWS', 'Vercel', 'Figma', 'Java'].map((skill) => (
  <div key={skill} className="flex items-center space-x-2">
    {toolsIcons[skill] || <div className="w-2 h-2 bg-gray-500 rounded-full"></div>}
    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
  </div>
))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center glass-card">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-6xl">🛒</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    E-Commerce Platform
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A full-stack e-commerce solution with user authentication, product management, 
                    shopping cart, and payment integration. Built with modern web technologies.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/johndoe/ecommerce-platform" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://ecommerce-demo.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:underline"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center">
                  <div className="text-white text-6xl">📱</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    Task Management App
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A collaborative task management application with real-time updates, 
                    team collaboration features, and intuitive drag-and-drop interface.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Next.js', 'TypeScript', 'Firebase', 'Framer Motion', 'Zustand'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/johndoe/task-manager" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://taskmanager-demo.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:underline"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="min-h-screen flex items-center justify-center glass-section">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Full Stack Web Development
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    freeCodeCamp
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Issued: March 2024
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Comprehensive certification covering HTML, CSS, JavaScript, React, Node.js, and database management.
                </p>
              </motion.div>
              
              {/* Certificate 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    React Developer Certification
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    Meta (Facebook)
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Issued: January 2024
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Advanced React concepts including hooks, context, performance optimization, and testing.
                </p>
              </motion.div>
              
              {/* Certificate 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    AWS Cloud Practitioner
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    Amazon Web Services
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Issued: December 2023
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Foundational understanding of AWS cloud services, architecture, and best practices.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center glass-card">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              >
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Send me a message
                </h3>
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
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your Name"
                    />
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
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
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
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
              
              {/* Contact Info & Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
                      <p className="text-gray-600 dark:text-gray-300">john.doe@example.com</p>
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
                      <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Follow me on
                  </h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://linkedin.com/in/johndoe" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://github.com/johndoe" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://twitter.com/johndoe" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-400 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
