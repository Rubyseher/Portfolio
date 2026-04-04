'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    num: '01',
    name: 'ShadeMatch',
    href: 'https://github.com/Rubyseher/ShadeMatch',
    tags: ['React.js', 'AI/ML', 'Color Extraction', 'Deployed'],
    screenshot: '/logos/shade-match.png',
    headline: 'Your wardrobe, finally coordinated.',
    problem: 'Most people buy clothes that never get worn — not because they don\'t fit, but because nothing matches them.',
    solution: 'Upload a photo of any clothing item. ShadeMatch extracts its colors, finds complementary combinations from your wardrobe, and links you to anything missing.',
  },
  {
    num: '02',
    name: 'Automated Oven App',
    href: 'https://github.com/Rubyseher/Automated-Oven-App',
    tags: ['React Native', 'IoT', 'WebSockets', 'Push Notifications'],
    screenshot: null,
    screenGrad: ['#1c0a00', '#c2410c'],
    screenAccent: '#fb923c',
    headline: 'Your kitchen, in your pocket.',
    problem: 'Smart ovens are only smart when you\'re standing next to them. Overcooked meals happen the moment you leave the room.',
    solution: 'A React Native app that streams live oven status over WebSockets and pushes a notification the moment your food hits the target temperature — on iOS and Android.',
  },
];


function MockScreen({ grad, accent }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(140deg, ${grad[0]}, ${grad[1]})`,
      display: 'flex', flexDirection: 'column', padding: 16, gap: 10,
    }}>
      <div style={{ display: 'flex', gap: 5, marginBottom: 2 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
      </div>
      <div style={{ height: 26, background: `${accent}25`, borderRadius: 6 }} />
      <div style={{ flex: 2, background: `${accent}18`, borderRadius: 10 }} />
      <div style={{ flex: 1, display: 'flex', gap: 8 }}>
        {[0.5, 0.3, 0.2].map((op, i) => (
          <div key={i} style={{ flex: 1, background: `${accent}${Math.round(op * 255).toString(16).padStart(2, '0')}`, borderRadius: 8 }} />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const outerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Header fades in
  const headerOpacity = useTransform(scrollYProgress, [0, 0.07], [0, 1]);
  const headerY       = useTransform(scrollYProgress, [0, 0.07], [24, 0]);

  // ── Lid opening ──
  // With transformOrigin '50% 100%' (hinge at bottom of lid):
  //   rotateX(-85) = lid nearly closed (flat over keyboard, shell faces up)
  //   rotateX(18)  = lid open past vertical (~105°), screen faces viewer
  const lidAngle = useTransform(scrollYProgress, [0.07, 0.42], [-85, 18]);

  // Screen fades in as lid passes halfway open
  const screenOpacity = useTransform(scrollYProgress, [0.25, 0.40], [0, 1]);

  // ── Laptop: starts centered, moves right after open ──
  // Negative x = shift left from its natural right-side position → centers it on screen
  // As scroll passes 0.44 it drifts to its natural position (x=0)
  const laptopX = useTransform(scrollYProgress, [0.44, 0.60], [-320, 0]);

  // STAR text slides in from left once laptop moves right
  const starOpacity = useTransform(scrollYProgress, [0.50, 0.64], [0, 1]);
  const starX       = useTransform(scrollYProgress, [0.50, 0.64], [-60, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(v > 0.74 ? 1 : 0);
  });

  const p = PROJECTS[activeIndex];

  return (
    <div
      id="projects"
      ref={outerRef}
      style={{ height: '500vh', position: 'relative', background: '#000' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: '#000', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 5rem',
      }}>

        {/* ── Header ── */}
        <motion.div style={{ opacity: headerOpacity, y: headerY, textAlign: 'center', marginBottom: '0.5rem' }}>
          <p style={{
            fontSize: '0.72rem', textTransform: 'uppercase',
            letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '0.5rem',
          }}>Projects</p>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
          }}>
            Things I&apos;ve <span className="grad-text">built</span>
          </h2>
        </motion.div>

        {/* ── Main area: absolutely positioned pieces ── */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, height: 520 }}>

          {/* LEFT: STAR text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              style={{
                opacity: starOpacity, x: starX,
                position: 'absolute', left: 0, top: '50%',
                transform: 'translateY(-50%)',
                width: '46%',
              }}
              exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <span style={{
                  fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
                  background: 'linear-gradient(135deg, #2997ff, #bf5af2)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{p.num}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em' }}>{p.name}</h3>
              </div>

              <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                fontWeight: 600, letterSpacing: '-0.02em',
                lineHeight: 1.35, color: '#f5f5f7',
                marginBottom: '1rem',
              }}>
                {p.headline}
              </p>

              <p style={{ fontSize: '0.95rem', color: '#6e6e73', lineHeight: 1.75, marginBottom: '0.9rem' }}>
                {p.problem}
              </p>

              <p style={{ fontSize: '0.95rem', color: '#a1a1aa', lineHeight: 1.75, marginBottom: '1.8rem' }}>
                {p.solution}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
                {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>

              <a
                href={p.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#2997ff', fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.gap = '0.8rem')}
                onMouseLeave={e => (e.currentTarget.style.gap = '0.45rem')}
              >
                View on GitHub →
              </a>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1.5rem' }}>
                {PROJECTS.map((_, i) => (
                  <div key={i} style={{
                    width: i === activeIndex ? 22 : 6, height: 6, borderRadius: 3,
                    background: i === activeIndex ? '#2997ff' : 'rgba(255,255,255,0.18)',
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: laptop — starts centered via x offset, drifts to right half */}
          <motion.div style={{
            x: laptopX,
            position: 'absolute', right: 0, top: '50%',
            transform: 'translateY(-50%)',
          }}>
            {/* Perspective — looking slightly down from above */}
            <div style={{ perspective: 1100, perspectiveOrigin: '50% -30%' }}>
              {/* Whole chassis tilted so we see the keyboard surface */}
              <div style={{
                width: 520,
                transform: 'rotateX(-20deg)',
                transformStyle: 'preserve-3d',
              }}>

                {/* ── LID ──
                    transformOrigin bottom = hinge is at base of lid
                    rotateX(-85) = nearly closed (lid almost flat over keyboard)
                    rotateX(18)  = open past vertical, screen faces viewer        */}
                <motion.div style={{
                  width: 520, height: 325,
                  transformOrigin: '50% 100%',
                  rotateX: lidAngle,
                  transformStyle: 'preserve-3d',
                  position: 'relative', zIndex: 2,
                }}>
                  {/* Outer shell — visible when closed, looking from above */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(165deg, #3e3e3e, #252525)',
                    borderRadius: '14px 14px 0 0',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateX(180deg)',
                    boxShadow: '0 -6px 20px rgba(0,0,0,0.4)',
                  }}>
                    <div style={{
                      position: 'absolute', top: '42%', left: '50%',
                      transform: 'translate(-50%,-50%)',
                      width: 34, height: 34, borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }} />
                  </div>

                  {/* Screen face — visible when open, facing viewer */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: '#0a0a0a',
                    borderRadius: '14px 14px 0 0',
                    border: '8px solid #2c2c2c',
                    overflow: 'hidden',
                    backfaceVisibility: 'hidden',
                  }}>
                    {/* Webcam */}
                    <div style={{
                      position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
                      width: 7, height: 7, borderRadius: '50%', background: '#2a2a2a', zIndex: 10,
                    }} />

                    {/* Screenshot fades in as lid opens */}
                    <motion.div style={{ opacity: screenOpacity, position: 'absolute', inset: 0 }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          style={{ position: 'absolute', inset: 0 }}
                        >
                          {p.screenshot ? (
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                              <Image
                                src={p.screenshot}
                                alt={p.name}
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'top' }}
                              />
                            </div>
                          ) : (
                            <MockScreen grad={p.screenGrad} accent={p.screenAccent} />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hinge */}
                <div style={{ width: 520, height: 10, background: '#2a2a2a' }} />

                {/* Base */}
                <div style={{
                  width: 554, height: 10,
                  background: '#1e1e1e',
                  borderRadius: '0 0 10px 10px',
                  margin: '0 auto',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.9)',
                }} />

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
