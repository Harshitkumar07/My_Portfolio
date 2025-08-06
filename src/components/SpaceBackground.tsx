"use client";

// A subtle, elegant space background with a gradient and soft SVG nebula overlay
export default function SpaceBackground() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 60% 10%, #3a86ff 0%, #8338ec 40%, #0a1026 100%)",
        transition: "background 0.8s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* Large, rich nebula swirl (top right) */}
      <svg
        width="1200"
        height="900"
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[-120px] right-[-180px] opacity-80"
        style={{ filter: "blur(32px)", zIndex: 1 }}
      >
        <ellipse
          cx="1000"
          cy="200"
          rx="320"
          ry="160"
          fill="url(#paint0_radial)"
        />
        <ellipse
          cx="900"
          cy="300"
          rx="140"
          ry="60"
          fill="url(#paint1_radial)"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(1000 200) rotate(90) scale(160 320)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8ecae6" stopOpacity="0.6" />
            <stop offset="0.5" stopColor="#3a86ff" stopOpacity="0.24" />
            <stop offset="1" stopColor="#0a1026" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint1_radial"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(900 300) rotate(90) scale(60 140)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f72585" stopOpacity="0.25" />
            <stop offset="1" stopColor="#3a86ff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {/* Faint star cluster/bokeh */}
      <svg
        width="100vw"
        height="100vh"
        className="absolute inset-0"
        style={{ zIndex: 2 }}
      >
        <circle cx="85%" cy="12%" r="3.2" fill="#fff" opacity="0.22" />
        <circle cx="25%" cy="65%" r="2.1" fill="#fff" opacity="0.13" />
        <circle cx="50%" cy="80%" r="1.9" fill="#fff" opacity="0.10" />
        <circle cx="15%" cy="35%" r="2.3" fill="#fff" opacity="0.18" />
        <circle cx="70%" cy="55%" r="2.8" fill="#fff" opacity="0.13" />
        <circle cx="40%" cy="20%" r="1.4" fill="#fff" opacity="0.10" />
        <circle cx="60%" cy="40%" r="2.1" fill="#fff" opacity="0.12" />
      </svg>
    </div>
  );
}
