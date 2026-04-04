'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    num: '01',
    name: 'ShadeMatch',
    href: 'https://github.com/Rubyseher/ShadeMatch',
    tags: ['React.js', 'AI/ML', 'Color Extraction', 'Deployed'],
    star: {
      situation: 'Users struggle to match new clothes with their existing wardrobe — they buy items that never get worn.',
      task: 'Build a tool that intelligently generates outfit combinations from photos of clothes users already own.',
      action: 'Built a React app using canvas-based color extraction to analyze uploaded clothing images, then generates AI-driven outfit pairings with direct shopping links for missing pieces.',
      result: 'Deployed and live. Users can upload any clothing photo and instantly receive curated outfit matches.',
    },
    // Laptop screen gradient
    laptopGrad: ['#0f172a', '#0e7490'],
    laptopAccent: '#22d3ee',
    // Phone screen gradient
    phoneGrad: ['#164e63', '#0891b2'],
    phoneAccent: '#67e8f9',
  },
  {
    num: '02',
    name: 'Automated Oven App',
    href: 'https://github.com/Rubyseher/Automated-Oven-App',
    tags: ['React Native', 'IoT', 'WebSockets', 'Push Notifications'],
    star: {
      situation: 'Smart ovens lack intuitive remote control — users can\'t monitor cooking without being in the kitchen.',
      task: 'Design a real-time mobile interface to control and monitor a smart oven from anywhere.',
      action: 'Built a React Native cross-platform app with WebSocket-based real-time status updates and push notifications triggered when food reaches the target temperature.',
      result: 'Enabled full remote oven control across iOS and Android, cutting overcooked meals and improving kitchen efficiency.',
    },
    laptopGrad: ['#1c0a00', '#c2410c'],
    laptopAccent: '#fb923c',
    phoneGrad: ['#431407', '#ea580c'],
    phoneAccent: '#fed7aa',
  },
];

// ── Laptop mockup ─────────────────────────────────────────────────────────────
function Laptop({ grad, accent }) {
  return (
    <div style={{ position: 'relative', width: 420 }}>
      {/* Screen */}
      <div style={{
        width: 420, height: 262,
        background: '#1a1a1a',
        borderRadius: '12px 12px 0 0',
        border: '8px solid #2a2a2a',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
        position: 'relative',
      }}>
        {/* Screen content */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(140deg, ${grad[0]}, ${grad[1]})`,
          display: 'flex', flexDirection: 'column', padding: 14, gap: 8,
        }}>
          {/* Menubar dots */}
          <div style={{ display: 'flex', gap: 5, marginBottom: 4 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
            ))}
          </div>
          {/* Mock UI bars */}
          <div style={{ height: 22, background: `${accent}22`, borderRadius: 5 }} />
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            <div style={{ width: 90, background: `${accent}18`, borderRadius: 6 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[0.5, 0.35, 0.6, 0.25].map((op, i) => (
                <div key={i} style={{
                  height: i === 0 ? 52 : 26,
                  background: `${accent}${Math.round(op * 255).toString(16).padStart(2,'0')}`,
                  borderRadius: 6,
                }} />
              ))}
            </div>
          </div>
        </div>
        {/* Webcam dot */}
        <div style={{
          position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
          width: 5, height: 5, borderRadius: '50%', background: '#333',
        }} />
      </div>
      {/* Base hinge */}
      <div style={{
        width: 420, height: 10, background: '#2a2a2a',
        borderRadius: '0 0 3px 3px',
      }} />
      {/* Base */}
      <div style={{
        width: 460, height: 16, background: '#222',
        borderRadius: '0 0 8px 8px',
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }} />
    </div>
  );
}

// ── Phone mockup ──────────────────────────────────────────────────────────────
function Phone({ grad, accent }) {
  return (
    <div style={{
      width: 150, height: 310,
      borderRadius: 30,
      border: '8px solid #2a2a2a',
      background: '#111',
      boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, ${grad[0]}, ${grad[1]})`,
        display: 'flex', flexDirection: 'column',
        padding: '28px 10px 10px',
        gap: 7,
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 18, background: '#111',
          borderRadius: '0 0 10px 10px', zIndex: 10,
        }} />
        {/* App header */}
        <div style={{ height: 22, background: `${accent}25`, borderRadius: 6 }} />
        {/* Cards */}
        {[0.55, 0.35, 0.2, 0.15].map((op, i) => (
          <div key={i} style={{
            height: i === 0 ? 70 : 38,
            background: `${accent}${Math.round(op * 255).toString(16).padStart(2,'0')}`,
            borderRadius: 10,
          }} />
        ))}
        {/* Bottom nav */}
        <div style={{
          marginTop: 'auto', height: 34,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 10px',
        }}>
          {[1, 0.4, 0.4, 0.4].map((op, i) => (
            <div key={i} style={{
              width: 16, height: 16, borderRadius: '50%',
              background: `rgba(255,255,255,${op})`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── STAR label ────────────────────────────────────────────────────────────────
function StarRow({ letter, color, text }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: 7,
        background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.72rem', fontWeight: 800, color: '#000',
        letterSpacing: '0.02em', marginTop: 2,
      }}>
        {letter}
      </div>
      <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.65, margin: 0 }}>
        {text}
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Projects() {
  const outerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * PROJECTS.length), PROJECTS.length - 1);
    setActiveIndex(idx);
  });

  const p = PROJECTS[activeIndex];

  // Star badge colors — reuse site palette
  const starColors = {
    S: '#2997ff',
    T: '#bf5af2',
    A: '#30d158',
    R: '#ff375f',
  };

  return (
    <div
      id="projects"
      ref={outerRef}
      style={{ height: `${PROJECTS.length * 100}vh`, position: 'relative' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '0 5rem', gap: '4rem',
        overflow: 'hidden', background: '#000',
      }}>

        {/* ── Left: text ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '0.72rem', textTransform: 'uppercase',
            letterSpacing: '0.16em', color: '#2997ff',
            fontWeight: 600, marginBottom: '0.8rem',
          }}>
            Projects
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: '2rem',
          }}>
            Things I&apos;ve{' '}
            <span className="grad-text">built</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Number + name */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.2rem' }}>
                <span style={{
                  fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
                  background: 'linear-gradient(135deg, #2997ff, #bf5af2)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {p.num}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
                  {p.name}
                </h3>
              </div>

              {/* STAR */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.6rem' }}>
                <StarRow letter="S" color={starColors.S} text={p.star.situation} />
                <StarRow letter="T" color={starColors.T} text={p.star.task} />
                <StarRow letter="A" color={starColors.A} text={p.star.action} />
                <StarRow letter="R" color={starColors.R} text={p.star.result} />
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.4rem' }}>
                {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>

              {/* GitHub */}
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontSize: '0.85rem', color: '#2997ff', fontWeight: 600,
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.gap = '0.8rem')}
                onMouseLeave={e => (e.currentTarget.style.gap = '0.45rem')}
              >
                View on GitHub →
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Dot counter */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '2rem' }}>
            {PROJECTS.map((_, i) => (
              <div key={i} style={{
                width: i === activeIndex ? 22 : 6, height: 6, borderRadius: 3,
                background: i === activeIndex ? '#2997ff' : 'rgba(255,255,255,0.18)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        {/* ── Right: laptop + phone ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 0.48, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              flex: '0 0 auto',
              display: 'flex', alignItems: 'flex-end', gap: '0',
              position: 'relative',
            }}
          >
            <Laptop grad={p.laptopGrad} accent={p.laptopAccent} />
            {/* Phone overlaps bottom-right of laptop */}
            <div style={{ position: 'absolute', right: -30, bottom: 0 }}>
              <Phone grad={p.phoneGrad} accent={p.phoneAccent} />
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
