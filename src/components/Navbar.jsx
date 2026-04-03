'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#experience',   label: 'Experience' },
  { href: '#skills',       label: 'Skills' },
  { href: '#projects',     label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#github',       label: 'GitHub' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '1.1rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        background: 'rgba(0,0,0,0.72)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'border-color 0.4s',
      }}
    >
      <span
        style={{
          fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #fff 0%, #6e6e73 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Ruby Seher
      </span>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                color: '#6e6e73', textDecoration: 'none',
                fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.01em',
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => (e.target.style.color = '#f5f5f7')}
              onMouseLeave={e => (e.target.style.color = '#6e6e73')}
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            style={{
              padding: '0.5rem 1.2rem',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px',
              color: '#f5f5f7', textDecoration: 'none',
              fontSize: '0.82rem', fontWeight: 500,
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            Hire Me
          </a>
        </li>
      </ul>
    </nav>
  );
}
