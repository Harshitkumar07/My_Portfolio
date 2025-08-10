'use client'

// Subtle, static Earth-themed accent layer (no animations)
// Designed to mirror CosmicAccents but with earth tones and zero motion

const EARTH_ELEMENTS = [
  { size: 160, color: 'rgba(34, 197, 94, 0.18)', top: '10%', left: '8%' },
  { size: 120, color: 'rgba(16, 185, 129, 0.16)', top: '70%', left: '15%' },
  { size: 180, color: 'rgba(132, 204, 22, 0.12)', top: '35%', left: '75%' },
  { size: 100, color: 'rgba(59, 130, 246, 0.10)', top: '18%', left: '60%' }, // water hint
  { size: 90,  color: 'rgba(34, 197, 94, 0.14)', top: '60%', left: '85%' },
  { size: 130, color: 'rgba(16, 185, 129, 0.12)', top: '42%', left: '35%' },
  { size: 70,  color: 'rgba(132, 204, 22, 0.14)', top: '82%', left: '62%' },
];

export default function EarthAccents() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {EARTH_ELEMENTS.map((el, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: el.size,
            height: el.size,
            top: el.top,
            left: el.left,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${el.color} 0%, transparent 70%)`,
            filter: 'blur(14px)',
            opacity: 0.5,
            zIndex: 0,
          }}
        />
      ))}

      {/* Soft sunlight highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(600px 400px at 25% 12%, rgba(34, 197, 94, 0.06), transparent 60%), ' +
            'radial-gradient(500px 350px at 80% 35%, rgba(59, 130, 246, 0.05), transparent 60%)',
          zIndex: 0,
        }}
      />
    </div>
  );
}
