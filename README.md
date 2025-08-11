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
│       └── email.ts              # EmailJS client utility (configure env vars)
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

---

## 🔧 Environment Variables

Create a `.env.local` in the project root (not committed). The app builds without these, but they enable full functionality:

- `NEXT_PUBLIC_PROFILE_IMG` (optional)
  - Public URL or a path under `public/` (e.g., `/1754872883418.png`).
  - Fallback is the bundled `/1754872883418.png` if unset/invalid.

- EmailJS (required only if enabling the contact form):
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

These are read at runtime by `src/lib/email.ts`.

---

## 🚀 Deployment

This app is production-ready and builds cleanly.

- Vercel (recommended)
  - Push to GitHub → Import repo on Vercel.
  - Set env vars under Project Settings → Environment Variables.
  - Build command: `npm run build`. Vercel auto-detects Next.js (App Router).

- Other platforms (Netlify, etc.)
  - Ensure Node 18+ runtime.
  - Build with `npm run build` and serve the Next.js output.
  - Configure the same environment variables for the contact form.

---

## ✍️ Content Management

- Projects: `src/data/projects.ts`
  - Add/update objects. Use `imageUrl` for thumbnails (local in `public/` or external). If missing, a fallback emoji is shown.

- Skills icons: `src/app/page.tsx`
  - Maps in `frontendIcons`, `backendIcons`, `toolsIcons`, `databaseIcons`.

- Certificates: images in `public/certificates/`
  - Buttons in `src/app/page.tsx` set preview with `setCertPreviewSrc()` and external link via `setCertPreviewHref()`.

- Contact form: client-side via EmailJS in `src/lib/email.ts`
  - Provide the three EmailJS env vars to enable.

---

## ✅ Current Status

- Next.js 15 + TypeScript with Tailwind and Framer Motion
- Dark/light theme with glassmorphism and starfield
- Typewriter roles stabilized (no exhaustive-deps warning)
- Images optimized via `next/image` (no `<img>` lint warnings)
- Builds successfully with zero warnings

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> **Maintained by Harsh**
> 
> _Built with ❤️ using Next.js, TypeScript, and Tailwind CSS_
