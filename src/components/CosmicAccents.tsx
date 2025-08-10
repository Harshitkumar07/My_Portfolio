'use client'

import { useReducedMotion } from 'framer-motion'

// Enhanced cosmic accents with nebula-like floating elements
const COSMIC_ELEMENTS = [
  { size: 120, color: 'rgba(138, 43, 226, 0.15)', top: '8%', left: '12%', anim: 'nebulaDrift1' },
  { size: 160, color: 'rgba(25, 25, 112, 0.12)', top: '55%', left: '75%', anim: 'nebulaDrift2' },
  { size: 100, color: 'rgba(72, 61, 139, 0.18)', top: '45%', left: '8%', anim: 'nebulaDrift3' },
  { size: 80, color: 'rgba(148, 0, 211, 0.14)', top: '20%', left: '85%', anim: 'nebulaDrift4' },
  { size: 140, color: 'rgba(30, 144, 255, 0.10)', top: '75%', left: '25%', anim: 'nebulaDrift5' },
  { size: 60, color: 'rgba(255, 20, 147, 0.16)', top: '35%', left: '60%', anim: 'nebulaDrift6' },
];

export default function CosmicAccents() {
  const prefersReducedMotion = useReducedMotion()
  return (
    <>
      <style>{`
        @keyframes nebulaDrift1 { 
          0%{transform:translateY(0px) translateX(0px) scale(1)} 
          25%{transform:translateY(-15px) translateX(10px) scale(1.1)} 
          50%{transform:translateY(-8px) translateX(-5px) scale(0.9)} 
          75%{transform:translateY(-20px) translateX(8px) scale(1.05)} 
          100%{transform:translateY(0px) translateX(0px) scale(1)} 
        }
        @keyframes nebulaDrift2 { 
          0%{transform:translateY(0px) translateX(0px) scale(1)} 
          33%{transform:translateY(12px) translateX(-8px) scale(0.95)} 
          66%{transform:translateY(-10px) translateX(15px) scale(1.08)} 
          100%{transform:translateY(0px) translateX(0px) scale(1)} 
        }
        @keyframes nebulaDrift3 { 
          0%{transform:translateY(0px) translateX(0px) scale(1)} 
          40%{transform:translateY(-18px) translateX(6px) scale(1.12)} 
          80%{transform:translateY(5px) translateX(-12px) scale(0.88)} 
          100%{transform:translateY(0px) translateX(0px) scale(1)} 
        }
        @keyframes nebulaDrift4 { 
          0%{transform:translateY(0px) translateX(0px) scale(1)} 
          30%{transform:translateY(8px) translateX(-15px) scale(1.06)} 
          70%{transform:translateY(-12px) translateX(10px) scale(0.94)} 
          100%{transform:translateY(0px) translateX(0px) scale(1)} 
        }
        @keyframes nebulaDrift5 { 
          0%{transform:translateY(0px) translateX(0px) scale(1)} 
          50%{transform:translateY(-25px) translateX(-8px) scale(1.15)} 
          100%{transform:translateY(0px) translateX(0px) scale(1)} 
        }
        @keyframes nebulaDrift6 { 
          0%{transform:translateY(0px) translateX(0px) scale(1)} 
          25%{transform:translateY(-10px) translateX(12px) scale(0.92)} 
          50%{transform:translateY(8px) translateX(-6px) scale(1.08)} 
          75%{transform:translateY(-5px) translateX(20px) scale(0.96)} 
          100%{transform:translateY(0px) translateX(0px) scale(1)} 
        }
        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-0">
        {COSMIC_ELEMENTS.map((element, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: element.size,
              height: element.size,
              top: element.top,
              left: element.left,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${element.color} 0%, transparent 70%)`,
              filter: 'blur(15px)',
              zIndex: 0,
              opacity: 0.6,
              animation: prefersReducedMotion ? 'none' : `${element.anim} ${20 + i * 4}s ease-in-out infinite`,
            }}
          />
        ))}
        
        {/* Additional Cosmic Particles */}
        <div className="absolute" style={{
          width: '4px',
          height: '4px',
          backgroundColor: '#9370DB',
          borderRadius: '50%',
          top: '25%',
          left: '40%',
          filter: 'blur(1px)',
          animation: prefersReducedMotion ? 'none' : 'cosmicPulse 8s ease-in-out infinite'
        }} />
        <div className="absolute" style={{
          width: '3px',
          height: '3px',
          backgroundColor: '#4169E1',
          borderRadius: '50%',
          top: '65%',
          left: '15%',
          filter: 'blur(1px)',
          animation: prefersReducedMotion ? 'none' : 'cosmicPulse 12s ease-in-out infinite 2s'
        }} />
        <div className="absolute" style={{
          width: '2px',
          height: '2px',
          backgroundColor: '#FF1493',
          borderRadius: '50%',
          top: '40%',
          left: '90%',
          filter: 'blur(1px)',
          animation: prefersReducedMotion ? 'none' : 'cosmicPulse 15s ease-in-out infinite 4s'
        }} />
      </div>
    </>
  );
}
