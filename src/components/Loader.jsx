'use client';

import { useEffect, useRef, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const fillRef = useRef(null);

  useEffect(() => {
    // Trigger progress bar fill
    const t1 = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = '100%';
    }, 80);
    // Fade out loader
    const t2 = setTimeout(() => setVisible(false), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: '#000',
        zIndex: 100000, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column', gap: '2rem',
        transition: 'opacity 0.7s ease',
      }}
    >
      <span
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          fontWeight: 900, letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #2997ff 0%, #bf5af2 50%, #ff375f 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Ruby Seher
      </span>
      <div style={{
        width: 220, height: 2, background: 'rgba(255,255,255,0.08)',
        borderRadius: 2, overflow: 'hidden',
      }}>
        <div
          ref={fillRef}
          style={{
            height: '100%', width: '0%',
            background: 'linear-gradient(90deg, #2997ff, #bf5af2)',
            borderRadius: 2,
            transition: 'width 1.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  );
}
