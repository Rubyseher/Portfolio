'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    num: '01', name: 'ShadeMatch',
    desc: 'A React web app that extracts dominant colors from uploaded clothing images and generates AI-driven matching outfit combinations with direct shopping links. Deployed and live.',
    tags: ['React.js', 'AI/ML', 'Color Extraction', 'Deployed'],
    href: 'https://github.com/Rubyseher/ShadeMatch',
    dir: 'left',
  },
  {
    num: '02', name: 'Automated Oven App',
    desc: 'A React Native cross-platform mobile app to control and monitor a smart oven remotely, with real-time push notifications when food is ready.',
    tags: ['React Native', 'IoT', 'Push Notifications'],
    href: 'https://github.com/Rubyseher/Automated-Oven-App',
    dir: 'up',
  },
  {
    num: '03', name: 'Healthcare Booking Platform',
    desc: 'A MERN-stack hackathon project for Taru Foundation enabling free doctor booking and video consultations for underserved communities, hosted on Netlify.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    href: 'https://github.com/Rubyseher/RemakeTaruFoundation',
    dir: 'right',
  },
  {
    num: '04', name: 'AI Pollution Forecasting',
    desc: 'An AI-based pollution prediction model for Bengaluru roads with QGIS geospatial data visualization, presented at ISRO Conference at Science Gallery Bengaluru.',
    tags: ['Python', 'AI/ML', 'QGIS', 'Geospatial'],
    href: 'https://github.com/Rubyseher/Air-Pollution-Forecasting-AI-Geospatial-Model',
    dir: 'left',
  },
  {
    num: '05', name: 'MERN YouTube Clone',
    desc: 'A full-stack YouTube clone with the MERN stack featuring video upload, playback, user authentication, and a comment system.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    href: 'https://github.com/Rubyseher/mern_youtube_clone',
    dir: 'up',
  },
  {
    num: '06', name: 'COVID Relief Website',
    desc: 'A volunteer-driven platform providing COVID resources across Bangalore, connecting people with essential supplies and community support in real time.',
    tags: ['React.js', 'Node.js', 'Social Good'],
    href: 'https://github.com/Rubyseher/COVID-Relief-Website',
    dir: 'right',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
    card.querySelector('.project-glow').style.opacity = '1';
  };
  const handleMouseLeave = (e) => {
    const card = cardRef.current;
    if (!card) return;
    card.querySelector('.project-glow').style.opacity = '0';
  };

  const initX = project.dir === 'left' ? -65 : project.dir === 'right' ? 65 : 0;
  const initY = project.dir === 'up' ? 55 : 0;

  return (
    <motion.div
      ref={cardRef}
      className="glass-card"
      style={{ padding: '2.5rem', borderRadius: 24, position: 'relative', overflow: 'hidden' }}
      initial={{ opacity: 0, x: initX, y: initY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, borderColor: 'rgba(41,151,255,0.25)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-glow" style={{ opacity: 0, transition: 'opacity 0.35s' }} />

      <div style={{
        fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
        marginBottom: '1.4rem',
        background: 'linear-gradient(135deg, rgba(41,151,255,0.18), rgba(191,90,242,0.18))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {project.num}
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
        {project.name}
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#6e6e73', lineHeight: 1.62, marginBottom: '1.4rem' }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {project.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
      </div>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          fontSize: '0.82rem', color: '#2997ff', fontWeight: 600,
          textDecoration: 'none', transition: 'gap 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.gap = '0.75rem')}
        onMouseLeave={e => (e.currentTarget.style.gap = '0.45rem')}
      >
        View on GitHub &nbsp;→
      </a>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '8rem 3rem', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '1.2rem' }}>
          Projects
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.2rem' }}>
          Things I&apos;ve <span className="grad-text">built</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#6e6e73', lineHeight: 1.65, maxWidth: 580, marginBottom: '4rem' }}>
          Side projects, hackathons, and experiments worth showing.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
