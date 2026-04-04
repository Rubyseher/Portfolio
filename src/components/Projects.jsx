'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// MacBook Air mockup — realistic proportions, aluminum finish
// ─────────────────────────────────────────────────────────────────────────────
function MacBook({ screenshot, lidAngle, screenOpacity }) {
  // Screen: 16:10 ratio, 680px wide → 425px tall
  const SW = 680, SH = 425;
  return (
    <div style={{ perspective: 1400, perspectiveOrigin: '50% 20%' }}>
      <div style={{ width: SW + 40, transformStyle: 'preserve-3d', transform: 'rotateX(-8deg)' }}>

        {/* ── Lid (screen half) ── */}
        <motion.div style={{
          width: SW + 40, height: SH + 28,
          transformOrigin: '50% 100%',
          rotateX: lidAngle,
          transformStyle: 'preserve-3d',
          position: 'relative', zIndex: 2,
        }}>
          {/* Back of lid — silver aluminum */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '16px 16px 0 0',
            background: 'linear-gradient(170deg, #c8c8c8 0%, #a0a0a0 40%, #8a8a8a 100%)',
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
            boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.2)',
          }}>
            {/* Apple-logo-style circle */}
            <div style={{
              position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
            }} />
          </div>

          {/* Front — bezel + screen */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '16px 16px 0 0',
            background: '#1a1a1a',
            backfaceVisibility: 'hidden',
            padding: '14px 20px 6px',
            display: 'flex', flexDirection: 'column',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          }}>
            {/* Notch/camera */}
            <div style={{
              position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
              width: 10, height: 10, borderRadius: '50%', background: '#2a2a2a',
            }} />
            {/* Screen area */}
            <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', background: '#000', position: 'relative' }}>
              <motion.div style={{ opacity: screenOpacity, position: 'absolute', inset: 0 }}>
                {screenshot ? (
                  <Image src={screenshot} alt="ShadeMatch" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#111' }} />
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Hinge line ── */}
        <div style={{
          width: SW + 40, height: 4,
          background: 'linear-gradient(180deg, #888 0%, #aaa 100%)',
        }} />

        {/* ── Base / keyboard deck ── */}
        <div style={{
          width: SW + 40, height: 22,
          background: 'linear-gradient(180deg, #b0b0b0 0%, #989898 100%)',
          borderRadius: '0 0 4px 4px',
          position: 'relative',
          boxShadow: '0 2px 0 rgba(0,0,0,0.3)',
        }}>
          {/* Trackpad hint */}
          <div style={{
            position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 10, borderRadius: 4,
            background: 'rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.08)',
          }} />
        </div>

        {/* ── Foot / table surface shadow ── */}
        <div style={{
          width: SW + 80, height: 6,
          margin: '0 auto',
          background: 'linear-gradient(180deg, #888 0%, #999 100%)',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 60px 120px rgba(0,0,0,0.85), 0 20px 60px rgba(0,0,0,0.5)',
        }} />

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// iPhone 15 Pro-style mockup — titanium frame, dynamic island
// ─────────────────────────────────────────────────────────────────────────────
function IPhone15({ src, rotateY, offsetY, scale, zIdx, delay }) {
  const W = 220, H = 476;
  const isLeft  = rotateY > 0;
  const isRight = rotateY < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: W, height: H,
        transform: `perspective(1200px) rotateY(${rotateY}deg) translateY(${offsetY}px) scale(${scale})`,
        transformOrigin: 'bottom center',
        position: 'relative', zIndex: zIdx,
        flexShrink: 0,
      }}
    >
      {/* Titanium frame */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 52,
        // Titanium brushed metal — direction changes based on which side of fan
        background: isLeft
          ? 'linear-gradient(105deg, #7a7a7a 0%, #4a4a4a 30%, #2a2a2a 60%, #3e3e3e 100%)'
          : isRight
            ? 'linear-gradient(255deg, #7a7a7a 0%, #4a4a4a 30%, #2a2a2a 60%, #3e3e3e 100%)'
            : 'linear-gradient(175deg, #6e6e6e 0%, #3a3a3a 50%, #4a4a4a 100%)',
        padding: 3,
        boxShadow: zIdx === 3
          ? '0 60px 120px rgba(0,0,0,0.9), 0 0 0 0.5px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 35px 80px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.1)',
        position: 'relative',
      }}>

        {/* Light reflection on frame edge */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 52,
          background: isLeft
            ? 'linear-gradient(90deg, transparent 55%, rgba(255,255,255,0.22) 80%, rgba(255,255,255,0.08) 100%)'
            : isRight
              ? 'linear-gradient(90deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 20%, transparent 45%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%)',
          pointerEvents: 'none', zIndex: 20,
        }} />

        {/* Side buttons — volume (left) */}
        {[80, 126, 172].map((top, i) => (
          <div key={i} style={{
            position: 'absolute',
            top, left: -4,
            width: 4, height: i === 0 ? 28 : 44,
            borderRadius: '2px 0 0 2px',
            background: isLeft
              ? 'linear-gradient(90deg, #888, #666)'
              : 'linear-gradient(90deg, #444, #555)',
          }} />
        ))}
        {/* Power button (right) */}
        <div style={{
          position: 'absolute', top: 120, right: -4,
          width: 4, height: 60,
          borderRadius: '0 2px 2px 0',
          background: isRight
            ? 'linear-gradient(90deg, #666, #888)'
            : 'linear-gradient(90deg, #555, #444)',
        }} />

        {/* Screen glass */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 49,
          background: '#000',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
            width: 96, height: 26,
            background: '#000',
            borderRadius: 16,
            zIndex: 10,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
          }} />

          {/* App screenshot */}
          {src ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src={src} alt="oven app" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          ) : (
            /* Fallback gradient UI */
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(160deg, #1a0800, #7c2d12)',
              display: 'flex', flexDirection: 'column',
              padding: '52px 16px 16px', gap: 12,
            }}>
              <div style={{ height: 28, background: 'rgba(251,146,60,0.4)', borderRadius: 8 }} />
              <div style={{ height: 120, background: 'rgba(251,146,60,0.25)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid rgba(251,146,60,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(251,146,60,0.8)' }} />
                </div>
              </div>
              {[0.4, 0.25, 0.15].map((op, i) => (
                <div key={i} style={{ height: 52, background: `rgba(251,146,60,${op})`, borderRadius: 12 }} />
              ))}
            </div>
          )}

          {/* Screen glare overlay */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 49,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ShadeMatch section
// ─────────────────────────────────────────────────────────────────────────────
function ShadeMatchSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const headerY       = useTransform(scrollYProgress, [0, 0.06], [20, 0]);
  const textOpacity   = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const textY         = useTransform(scrollYProgress, [0, 0.06], [16, 0]);

  const lidAngle      = useTransform(scrollYProgress, [0.22, 0.62], [-86, 20]);
  const screenOpacity = useTransform(scrollYProgress, [0.44, 0.60], [0, 1]);

  return (
    <div ref={ref} style={{ height: '350vh', position: 'relative', background: '#000' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: '#000', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        gap: '1rem',
        padding: '4rem 4rem 2rem',
      }}>

        {/* "Things I've built" */}
        <motion.div style={{ opacity: headerOpacity, y: headerY, textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#2997ff', fontWeight: 600, marginBottom: '0.5rem' }}>
            Projects
          </p>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
            Solutions I&apos;ve <span className="grad-text">made</span>
          </h2>
        </motion.div>

        {/* ShadeMatch text — centered, Apple product-page style */}
        <motion.div style={{ opacity: textOpacity, y: textY, textAlign: 'center', maxWidth: 560 }}>
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#2997ff', fontWeight: 600, marginBottom: '0.4rem' }}>
            01 — ShadeMatch
          </p>
          <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.9rem' }}>
            Your wardrobe,<br />finally coordinated.
          </h3>
          <p style={{ fontSize: '1rem', color: '#86868b', lineHeight: 1.7, marginBottom: '1.2rem' }}>
            Most people own clothes that never get worn — not because they don&apos;t fit, but because nothing matches. ShadeMatch extracts colors from any clothing photo and generates AI-driven outfit combinations, with links to anything missing.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginBottom: '1rem' }}>
            {['React.js', 'AI/ML', 'Color Extraction', 'Deployed'].map(t => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>
          <a href="https://github.com/Rubyseher/ShadeMatch" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.9rem', color: '#2997ff', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            onMouseEnter={e => (e.currentTarget.style.gap = '0.75rem')}
            onMouseLeave={e => (e.currentTarget.style.gap = '0.4rem')}
          >View on GitHub →</a>
        </motion.div>

        {/* MacBook — centered, large */}
        <MacBook screenshot="/logos/shade-match.png" lidAngle={lidAngle} screenOpacity={screenOpacity} />

        {/* Progress dot */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[0,1].map(i => <div key={i} style={{ width: i===0?22:6, height:6, borderRadius:3, background: i===0?'#2997ff':'rgba(255,255,255,0.2)' }} />)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Automated Oven section
// ─────────────────────────────────────────────────────────────────────────────
function OvenSection() {
  const phones = ['/projects/oven-1.png', '/projects/oven-2.png', '/projects/oven-3.png'];

  return (
    <div style={{ background: '#000', padding: '10rem 4rem 8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Centered heading — same Apple style */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', maxWidth: 580, marginBottom: '6rem' }}
      >
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#2997ff', fontWeight: 600, marginBottom: '0.4rem' }}>
          02 — Automated Oven App
        </p>
        <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.9rem' }}>
          Your kitchen,<br />in your pocket.
        </h3>
        <p style={{ fontSize: '1rem', color: '#86868b', lineHeight: 1.7, marginBottom: '1.2rem' }}>
          Smart ovens are only smart when you&apos;re standing next to them. This React Native app streams live oven status over WebSockets and fires a push notification the moment your food hits temperature — on iOS and Android.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginBottom: '1rem' }}>
          {['React Native', 'IoT', 'WebSockets', 'Push Notifications'].map(t => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
        <a href="https://github.com/Rubyseher/Automated-Oven-App" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '0.9rem', color: '#2997ff', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          onMouseEnter={e => (e.currentTarget.style.gap = '0.75rem')}
          onMouseLeave={e => (e.currentTarget.style.gap = '0.4rem')}
        >View on GitHub →</a>
      </motion.div>

      {/* 3 iPhones — Apple fan layout, large */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: 0,
        filter: 'drop-shadow(0 80px 120px rgba(0,0,0,0.8))',
      }}>
        <div style={{ marginRight: -44 }}>
          <IPhone15 src={phones[0]} rotateY={32} offsetY={48} scale={0.82} zIdx={1} delay={0.15} />
        </div>
        <IPhone15 src={phones[1]} rotateY={0} offsetY={0} scale={1} zIdx={3} delay={0} />
        <div style={{ marginLeft: -44 }}>
          <IPhone15 src={phones[2]} rotateY={-32} offsetY={48} scale={0.82} zIdx={1} delay={0.15} />
        </div>
      </div>

      {/* Progress dot */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '5rem' }}>
        {[0,1].map(i => <div key={i} style={{ width: i===1?22:6, height:6, borderRadius:3, background: i===1?'#2997ff':'rgba(255,255,255,0.2)' }} />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <div id="projects" style={{ background: '#000' }}>
      <ShadeMatchSection />
      <OvenSection />
    </div>
  );
}
