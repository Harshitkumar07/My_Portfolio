'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from 'next-themes'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    
    if (element) {
      const navHeight = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }

    setIsMenuOpen(false)
  }

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <motion.nav
      initial={prefersReducedMotion ? false : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        bg-white/40 dark:bg-[#181f38]/90
        backdrop-blur-md
        border-b border-white/20 dark:border-slate-200/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.18)]
        ${scrolled ? 'shadow-lg' : ''}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a1a] ${activeSection === item.href.substring(1) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'}`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{
                      type: prefersReducedMotion ? 'tween' : 'spring',
                      duration: prefersReducedMotion ? 0 : undefined,
                      stiffness: prefersReducedMotion ? undefined : 380,
                      damping: prefersReducedMotion ? undefined : 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
            {/* Theme Toggle Button (Earth/Space) */}
            <motion.button
              whileTap={prefersReducedMotion ? undefined : { scale: 0.85, rotate: 20 }}
              whileHover={prefersReducedMotion ? undefined : { boxShadow: theme === 'space' ? '0 0 12px 2px #8b5cf6' : '0 0 12px 2px #22c55e', scale: 1.1 }}
              animate={{ backgroundColor: theme === 'space' ? '#1f1b3a' : '#f3f4f6', borderColor: theme === 'space' ? '#8b5cf6' : '#e5e7eb' }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setTheme(theme === 'space' ? 'earth' : 'space')}
              className="ml-4 p-2 rounded-full border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a1a]"
              aria-label="Toggle Earth/Space Mode"
              aria-pressed={mounted ? (theme === 'space') : undefined}
            >
              {mounted ? (
                <motion.div
                  key={theme}
                  initial={prefersReducedMotion ? false : { rotate: 0, scale: 0.8, opacity: 0 }}
                  animate={prefersReducedMotion ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: theme === 'space' ? 360 : 0, scale: 1, opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 20 }}
                >
                  {theme === 'space' ? (
                    // Earth Icon (indicates tapping goes to Earth)
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300 drop-shadow">
                      <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20Zm-1 3.5c.7 0 1.5.6 1.5 1.4 0 .5-.2.9-.5 1.2l-.6.6c-.3.3-.4.8-.2 1.2l.5 1.1c.2.4.6.7 1 .7h1.3c.6 0 1 .4 1 1 0 .3-.1.5-.3.7l-.8.8c-.3.3-.4.8-.2 1.2l.6 1.2c.2.4 0 .9-.4 1.1a7.5 7.5 0 11-3.5-13.2Z"/>
                    </svg>
                  ) : (
                    // Rocket Icon (indicates tapping goes to Space)
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-indigo-600 drop-shadow">
                      <path fill="currentColor" d="M14 3l7 7-4.5 1.5L12.5 22l-2.3-4.2L6 15.5 14 3Zm-5.6 9.6l2 2-2.8 1 1-3Z"/>
                    </svg>
                  )}
                </motion.div>
              ) : (
                <div className="h-5 w-5" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-white dark:hover:text-blue-400 dark:hover:bg-[#151a33] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a1a]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
            id="mobile-menu"
            className="md:hidden bg-white dark:bg-[#181f38] border-t border-gray-200 dark:border-slate-200/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a1a] ${
                    activeSection === item.href.substring(1)
                      ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-[#11162a]'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-white dark:hover:text-blue-400 dark:hover:bg-[#151a33]'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              {/* Theme Toggle Button (Mobile Earth/Space) */}
              <motion.button
                whileTap={prefersReducedMotion ? undefined : { scale: 0.9, rotate: 15 }}
                whileHover={prefersReducedMotion ? undefined : { boxShadow: theme === 'space' ? '0 0 12px 2px #8b5cf6' : '0 0 12px 2px #22c55e', scale: 1.05 }}
                animate={{ backgroundColor: theme === 'space' ? '#1f1b3a' : '#f3f4f6', borderColor: theme === 'space' ? '#8b5cf6' : '#e5e7eb' }}
                transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setTheme(theme === 'space' ? 'earth' : 'space')}
                className="mt-2 p-2 rounded-full border w-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a1a]"
                aria-label="Toggle Earth/Space Mode"
                aria-pressed={mounted ? (theme === 'space') : undefined}
              >
                {mounted ? (
                  <motion.div
                    key={theme}
                    initial={prefersReducedMotion ? false : { rotate: 0, scale: 0.8, opacity: 0 }}
                    animate={prefersReducedMotion ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: theme === 'space' ? 360 : 0, scale: 1, opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    {theme === 'space' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300 drop-shadow">
                        <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20Zm-1 3.5c.7 0 1.5.6 1.5 1.4 0 .5-.2.9-.5 1.2l-.6.6c-.3.3-.4.8-.2 1.2l.5 1.1c.2.4.6.7 1 .7h1.3c.6 0 1 .4 1 1 0 .3-.1.5-.3.7l-.8.8c-.3.3-.4.8-.2 1.2l.6 1.2c.2.4 0 .9-.4 1.1a7.5 7.5 0 11-3.5-13.2Z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-indigo-600 drop-shadow">
                        <path fill="currentColor" d="M14 3l7 7-4.5 1.5L12.5 22l-2.3-4.2L6 15.5 14 3Zm-5.6 9.6l2 2-2.8 1 1-3Z"/>
                      </svg>
                    )}
                  </motion.div>
                ) : (
                  <div className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
