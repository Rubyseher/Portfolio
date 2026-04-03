'use client';

import { motion } from 'framer-motion';

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: '1st Place — Code-A-Thon 2025, JPMorgan',
    desc: "Won JPMorgan's internal hackathon with a React–Python GKP resource optimization tool suggesting optimal CPU/Memory allocations across clusters.",
    dir: 'left',
  },
  {
    icon: '🥈',
    title: '2nd Place — Global Hackathon 2024, JPMorgan',
    desc: "Revamped JPMorgan's internal global employee contact book in a cross-country team, improving UI/UX and usability — now used company-wide.",
    dir: 'right',
  },
  {
    icon: '🎓',
    title: 'Code for Good — Internship Award',
    desc: 'Competed on a full-stack MERN application against 900+ participants from across India. Awarded a JPMorgan Chase internship offer.',
    dir: 'left',
  },
  {
    icon: '🚀',
    title: 'ISRO Conference — Tool Demo',
    desc: 'Presented an AI-based pollution prediction model for Bengaluru roads, including a QGIS spatial-data demo at Science Gallery Bengaluru.',
    dir: 'right',
  },
  {
    icon: '⭐',
    title: 'GPA 9.04 / 10 — B.Tech Computer Science',
    desc: 'Graduated with distinction from Dayananda Sagar University (2020–2024). Coursework spanning Full Stack, AI/ML, AWS, Cyber Security, and DBMS.',
    dir: 'left',
  },
  {
    icon: '⚡',
    title: 'GitHub: Pull Shark · YOLO · Quickdraw',
    desc: 'Earned GitHub achievement badges across 35+ public repositories, with active open-source contributions and collaborative pull requests.',
    dir: 'right',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: '8rem 3rem', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '1.2rem' }}>
          Recognition
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '4rem' }}>
          Wins that <span className="grad-text">followed</span>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
        gap: '1.25rem',
      }}>
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={i}
            className="glass-card"
            style={{
              display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              padding: '1.75rem', borderRadius: 20,
            }}
            initial={{ opacity: 0, x: a.dir === 'left' ? -55 : 55 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, borderColor: 'rgba(191,90,242,0.3)' }}
          >
            <div style={{
              width: 50, height: 50, flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(41,151,255,0.12), rgba(191,90,242,0.12))',
              borderRadius: 14, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.4rem',
            }}>
              {a.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                {a.title}
              </h3>
              <p style={{ fontSize: '0.83rem', color: '#6e6e73', lineHeight: 1.55 }}>
                {a.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
