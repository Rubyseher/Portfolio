'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Three.js Canvas must be dynamic (no SSR)
const ParticleScene = dynamic(() => import('./ParticleScene'), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative', height: '100vh', minHeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* R3F Particle Canvas */}
      {mounted && <ParticleScene />}

      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Hero content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              background: 'rgba(41,151,255,0.1)',
              border: '1px solid rgba(41,151,255,0.28)',
              borderRadius: '100px',
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#2997ff',
            }}
          >
            <span
              className="badge-dot"
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#2997ff', boxShadow: '0 0 8px #2997ff',
              }}
            />
            Open to Relocation · Available Now
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="white-grad-text"
          style={{
            fontSize: 'clamp(4rem, 11vw, 10rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.93,
            marginBottom: '1.5rem',
          }}
        >
          Ruby<br />Seher
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)',
            color: '#6e6e73', fontWeight: 400,
            letterSpacing: '-0.01em', marginBottom: '3rem',
          }}
        >
          Full Stack Developer ·{' '}
          <span className="grad-text" style={{ fontWeight: 600 }}>
            React · TypeScript · AWS
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#contact"
            style={{
              padding: '0.9rem 2.4rem', background: '#fff', color: '#000',
              borderRadius: '100px', fontSize: '0.95rem', fontWeight: 700,
              textDecoration: 'none', display: 'inline-block',
              transition: 'transform 0.2s, box-shadow 0.2s',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Let&apos;s Connect
          </a>
          <a
            href="#experience"
            style={{
              padding: '0.9rem 2.4rem', background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px',
              fontSize: '0.95rem', fontWeight: 600,
              textDecoration: 'none', display: 'inline-block',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            View My Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6e6e73' }}>
          Scroll
        </span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
