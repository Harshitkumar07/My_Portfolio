# 🚀 My Portfolio

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

A modern, animated portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features a cosmic/space theme, glassmorphism, dark mode, and professional animations.

---

## ✨ Features
- Modern, responsive design with mobile‑first hero and two‑column desktop layout
- Global starfield background in dark ("space") theme, optimized for performance (reduced density on mobile, throttled updates)
- Space/cosmic glassmorphism theme with transparent sections to reveal starfield
- Accessible theme toggle (earth ↔ space) with hydration‑safe rendering
- Smooth, once‑per‑view animations via Framer Motion viewport controls
- Lighter blur effects for better performance (backdrop‑blur‑md)
- Responsive, keyboard‑friendly navigation

---

## 🛠️ Tech Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion**
- **react-icons**

---

## 📁 Folder Structure

```
My_Portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global Tailwind styles
│   │   ├── layout.tsx            # App root layout (ThemeProvider + BackgroundLayer)
│   │   └── page.tsx              # Main page (Home)
│   ├── components/
│   │   ├── BackgroundLayer.tsx   # Global background wrapper
│   │   ├── Starfield.tsx         # Perf‑aware starfield canvas (dark mode)
│   │   ├── SpaceObjects.tsx      # Decorative space objects (skipped in perf mode)
│   │   ├── CosmicAccents.tsx     # Extra cosmic accents
│   │   ├── EarthAccents.tsx      # Light theme accents
│   │   ├── ParallaxScene.tsx     # Parallax utilities
│   │   ├── Navigation.tsx        # Top navigation with theme toggle
│   │   └── ThemeProvider.tsx     # next-themes wrapper (earth/space)
│   ├── data/
│   │   └── projects.ts           # Portfolio projects data (update real content)
│   └── lib/
│       └── email.ts              # Placeholder email utility (no backend yet)
├── public/
│   └── certificates/             # Certificate images
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── next-env.d.ts
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚦 Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> **Maintained by Harsh**
> 
> _Built with ❤️ using Next.js, TypeScript, and Tailwind CSS_
