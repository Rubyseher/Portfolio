'use client';

import { motion } from 'framer-motion';

const LINKS = [
  {
    label: 'ruby.seher000@gmail.com',
    href: 'mailto:ruby.seher000@gmail.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Rubyseher',
    target: '_blank',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ruby-s',
    target: '_blank',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: '+91 9513111881',
    href: 'tel:+919513111881',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 15z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '8rem 3rem', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        style={{
          position: 'relative', padding: '6rem 3rem', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(41,151,255,0.06), rgba(191,90,242,0.06))',
          border: '1px solid rgba(41,151,255,0.12)',
          borderRadius: 36, overflow: 'hidden',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(41,151,255,0.15) 0%, transparent 70%)',
        }} />

        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '1.2rem', position: 'relative' }}>
          Open to opportunities
        </p>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: '1rem', position: 'relative',
          }}
        >
          Let&apos;s build<br />
          <span className="grad-text-tri">something great</span>
        </h2>

        <p style={{ color: '#6e6e73', fontSize: '1.05rem', marginBottom: '3rem', position: 'relative' }}>
          Frontend · Full Stack · Open to relocation worldwide<br />
          <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>Bangalore, India · Available immediately</span>
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
          {LINKS.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target={l.target}
              rel={l.target ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.85rem 1.75rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '100px', color: '#f5f5f7',
                textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500,
                transition: 'background 0.25s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.13)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
