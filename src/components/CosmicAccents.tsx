'use client'

// 3 lightweight blurred dots with pure CSS animation
const DOTS = [
  { size: 80, color: 'rgba(131,56,236,0.16)', top: '10%', left: '15%', anim: 'float1' },
  { size: 120, color: 'rgba(255,255,255,0.08)', top: '60%', left: '70%', anim: 'float2' },
  { size: 90, color: 'rgba(56,131,236,0.12)', top: '50%', left: '10%', anim: 'float3' },
];

export default function CosmicAccents() {
  return (
    <>
      <style>{`
        @keyframes float1 { 0%{transform:translateY(0)} 50%{transform:translateY(18px)} 100%{transform:translateY(0)} }
        @keyframes float2 { 0%{transform:translateY(0)} 50%{transform:translateY(-22px)} 100%{transform:translateY(0)} }
        @keyframes float3 { 0%{transform:translateY(0)} 50%{transform:translateY(14px)} 100%{transform:translateY(0)} }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-0">
        {DOTS.map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: dot.size,
              height: dot.size,
              top: dot.top,
              left: dot.left,
              borderRadius: '50%',
              background: dot.color,
              filter: 'blur(12px)',
              zIndex: 0,
              opacity: 1,
              animation: `${dot.anim} ${18 + i * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
