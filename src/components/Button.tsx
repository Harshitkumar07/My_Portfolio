'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '' 
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-colors'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
