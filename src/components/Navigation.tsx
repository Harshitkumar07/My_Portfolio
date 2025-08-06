'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        bg-white/40 dark:bg-[#181f38]/90
        backdrop-blur-xl
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${activeSection === item.href.substring(1) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'}`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.85, rotate: 20 }}
              whileHover={{ boxShadow: resolvedTheme === 'dark' ? '0 0 12px 2px #fbbf24' : '0 0 12px 2px #6366f1', scale: 1.1 }}
              animate={{ backgroundColor: resolvedTheme === 'dark' ? '#22223b' : '#f3f4f6', borderColor: resolvedTheme === 'dark' ? '#6366f1' : '#e5e7eb' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-2 rounded-full border transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              <motion.div
                key={resolvedTheme}
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ rotate: resolvedTheme === 'dark' ? 360 : 0, scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {resolvedTheme === 'dark' ? (
                  // Sun Icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m8.66-12.34l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                ) : (
                  // Moon Icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              {/* Theme Toggle Button (Mobile) */}
              <motion.button
                whileTap={{ scale: 0.85, rotate: 20 }}
                whileHover={{ boxShadow: resolvedTheme === 'dark' ? '0 0 12px 2px #fbbf24' : '0 0 12px 2px #6366f1', scale: 1.1 }}
                animate={{ backgroundColor: resolvedTheme === 'dark' ? '#22223b' : '#f3f4f6', borderColor: resolvedTheme === 'dark' ? '#6366f1' : '#e5e7eb' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="mt-2 p-2 rounded-full border w-full flex items-center justify-center transition-colors duration-200 focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                <motion.div
                  key={resolvedTheme}
                  initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: resolvedTheme === 'dark' ? 360 : 0, scale: 1, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  {resolvedTheme === 'dark' ? (
                    // Sun Icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m8.66-12.34l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                  ) : (
                    // Moon Icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
