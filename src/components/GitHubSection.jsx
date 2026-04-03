'use client';

import { motion } from 'framer-motion';

const REPOS = [
  { name: 'ShadeMatch', desc: 'AI outfit suggestion web app — color extraction + shopping links', lang: 'JavaScript', langColor: '#f1e05a', href: 'https://github.com/Rubyseher/ShadeMatch' },
  { name: 'Automated-Oven-App', desc: 'React Native cross-platform IoT app for smart oven control & monitoring', lang: 'JavaScript', langColor: '#f1e05a', href: 'https://github.com/Rubyseher/Automated-Oven-App' },
  { name: 'Air-Pollution-Forecasting', desc: 'AI geospatial model for Bengaluru road pollution — ISRO conference demo', lang: 'Python', langColor: '#3572a5', href: 'https://github.com/Rubyseher/Air-Pollution-Forecasting-AI-Geospatial-Model' },
  { name: 'mern_youtube_clone', desc: 'Full-stack YouTube clone with auth, upload, playback and comments', lang: 'JavaScript', langColor: '#f1e05a', href: 'https://github.com/Rubyseher/mern_youtube_clone' },
  { name: 'COVID-Relief-Website', desc: 'COVID resources platform for Bangalore volunteers — 1 star, 1 fork', lang: 'JavaScript', langColor: '#f1e05a', href: 'https://github.com/Rubyseher/COVID-Relief-Website' },
  { name: 'RemakeTaruFoundation', desc: 'MERN-stack healthcare booking site — free doctor & video consults', lang: 'JavaScript', langColor: '#f1e05a', href: 'https://github.com/Rubyseher/RemakeTaruFoundation' },
];

export default function GitHubSection() {
  return (
    <section id="github" style={{ padding: '8rem 3rem', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '1.2rem' }}>
          Open Source
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.2rem' }}>
          On <span className="grad-text">GitHub</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#6e6e73', lineHeight: 1.65, maxWidth: 580, marginBottom: '4rem' }}>
          35+ repositories. Active contributions. Real shipped code.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '3rem',
      }}>
        {REPOS.map((repo, i) => (
          <motion.a
            key={i}
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{ padding: '1.75rem', borderRadius: 20, textDecoration: 'none', color: '#f5f5f7', display: 'block' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.85, delay: (i % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, borderColor: 'rgba(41,151,255,0.28)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.1rem' }}>📁</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#2997ff' }}>
                {repo.name}
              </span>
            </div>
            <p style={{ fontSize: '0.83rem', color: '#6e6e73', lineHeight: 1.55, marginBottom: '1rem' }}>
              {repo.desc}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: repo.langColor, display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', color: '#6e6e73' }}>{repo.lang}</span>
            </div>
          </motion.a>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <a
          href="https://github.com/Rubyseher"
          target="_blank"
          rel="noopener noreferrer"
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
          View all 35+ repos on GitHub →
        </a>
      </div>
    </section>
  );
}
