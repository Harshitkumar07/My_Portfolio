import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'
import ThemeProvider from '../components/ThemeProvider'
import SpaceBackground from '../components/SpaceBackground'
import CosmicAccents from '../components/CosmicAccents'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'A modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpaceBackground />
        <CosmicAccents />
        <div className="relative z-10 min-h-screen">
          <ThemeProvider>
            <Navigation />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
