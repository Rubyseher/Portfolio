'use client';

import { motion } from 'framer-motion';

const JOBS = [
  {
    company: 'JP Morgan Chase & Co.',
    role: 'Full Stack Software Developer',
    period: 'Jul 2024 – Present · Bangalore',
    bullets: [
      <>Spearheaded a <strong>3-member team</strong> to build a ReactJS–Flask GKP monitoring app, migrating dashboards to Grafana — <strong>reducing SRE checks by 75%</strong>, used daily by 30+ engineers.</>,
      <>Deployed a React monitoring dashboard on <strong>AWS ECS</strong>, consolidating Prometheus metrics and PostgreSQL data into a single platform used by <strong>40+ engineers</strong>.</>,
      <>Built a React–Python GKP resource optimization tool — <strong>won 1st place, Code-A-Thon 2025</strong>.</>,
      <>Developed a Python script eliminating recurring <strong>500GB snapshot overflows</strong>, reducing storage costs.</>,
      <>Built an Oracle APEX UI enabling 50 employees to self-service pod cleanup, <strong>cutting time 5× and saving 720 hr/yr</strong>. Resolved a production outage in under 1 hour.</>,
    ],
    tags: ['React.js', 'TypeScript', 'Python', 'Flask', 'AWS ECS', 'Docker', 'Grafana', 'Prometheus', 'Kubernetes', 'PostgreSQL'],
    dir: 'left',
  },
  {
    company: 'JP Morgan Chase & Co.',
    role: 'Software Engineer Program Intern',
    period: 'Jan 2024 – Jul 2024 · Bangalore',
    bullets: [
      <>Collaborated in migrating a <strong>legacy Angular frontend</strong> to ReactJS with internal UI libraries, ensuring consistent UX as Angular approached end-of-support.</>,
      <>Set up real-time <strong>Kubernetes alerts</strong> via Grafana, Prometheus &amp; Splunk, <strong>reducing issue response time by 50%</strong>.</>,
    ],
    tags: ['React.js', 'Angular', 'Grafana', 'Prometheus', 'Splunk', 'Kubernetes', 'Java'],
    dir: 'right',
  },
  {
    company: 'JP Morgan Chase & Co.',
    role: 'Summer Analyst Intern',
    period: 'Jun 2023 – Aug 2023 · Bangalore',
    bullets: [
      <>Collaborated in migrating a <strong>legacy Angular frontend</strong> to ReactJS with Bootstrap and internal UI libraries, improving long-term maintainability.</>,
    ],
    tags: ['React.js', 'Bootstrap', 'JavaScript'],
    dir: 'left',
  },
  {
    company: 'JGEC Winter of Code · Team LBTC · nextUp',
    role: 'React Developer',
    period: 'Jan 2021 – Aug 2021 · Remote',
    bullets: [
      <>Built multiple React + Node.js applications for social good, open source, and startup projects across three different organisations.</>,
    ],
    tags: ['React.js', 'Node.js', 'Python'],
    dir: 'right',
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '8rem 3rem', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '1.2rem' }}>
          Career
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.2rem' }}>
          Where I&apos;ve{' '}
          <span className="grad-text">shipped things</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#6e6e73', lineHeight: 1.65, maxWidth: 580, marginBottom: '4rem' }}>
          Real impact at real scale — from production dashboards to award-winning hackathon tools.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="timeline-bar" style={{ position: 'relative', paddingLeft: '2.5rem' }}>
        {JOBS.map((job, i) => (
          <motion.div
            key={i}
            className="timeline-dot glass-card"
            style={{
              position: 'relative', padding: '2.5rem',
              borderRadius: 24, marginBottom: '1.75rem',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, x: job.dir === 'left' ? -65 : 65 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ x: 6, borderColor: 'rgba(41,151,255,0.25)' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#2997ff', marginBottom: '0.35rem' }}>
                  {job.company}
                </p>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {job.role}
                </p>
              </div>
              <span style={{
                padding: '0.38rem 1rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '100px', fontSize: '0.78rem',
                color: '#6e6e73', whiteSpace: 'nowrap',
              }}>
                {job.period}
              </span>
            </div>

            {/* Bullets */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {job.bullets.map((b, j) => (
                <li key={j} style={{ fontSize: '0.9rem', color: '#6e6e73', paddingLeft: '1.4rem', position: 'relative', lineHeight: 1.6 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#2997ff', fontWeight: 700 }}>›</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
              {job.tags.map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
