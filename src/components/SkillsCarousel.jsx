'use client';

import { motion } from 'framer-motion';

const ROW1 = [
  { name: 'React.js',      color: '#61dafb' },
  { name: 'TypeScript',    color: '#3178c6' },
  { name: 'JavaScript',    color: '#f7df1e' },
  { name: 'Node.js',       color: '#68a063' },
  { name: 'Python',        color: '#3572a5' },
  { name: 'Flask',         color: '#ff375f' },
  { name: 'HTML5',         color: '#e34c26' },
  { name: 'CSS3',          color: '#264de4' },
  { name: 'Tailwind CSS',  color: '#38bdf8' },
  { name: 'Express',       color: '#888888' },
];
const ROW2 = [
  { name: 'AWS',           color: '#ff9900' },
  { name: 'Docker',        color: '#2496ed' },
  { name: 'Kubernetes',    color: '#326ce5' },
  { name: 'Grafana',       color: '#f46800' },
  { name: 'PostgreSQL',    color: '#336791' },
  { name: 'MongoDB',       color: '#4db33d' },
  { name: 'Firebase',      color: '#ffca28' },
  { name: 'Prometheus',    color: '#e6522c' },
  { name: 'REST APIs',     color: '#bf5af2' },
];
const ROW3 = [
  { name: 'Git',           color: '#f05032' },
  { name: 'CI/CD',         color: '#2997ff' },
  { name: 'SonarQube',     color: '#4e9bcd' },
  { name: 'WebSockets',    color: '#64d2ff' },
  { name: 'Terraform',     color: '#7b42bc' },
  { name: 'Webpack',       color: '#8dd6f9' },
  { name: 'Vite',          color: '#a259ff' },
  { name: 'React Native',  color: '#61dafb' },
  { name: 'MySQL',         color: '#00758f' },
];

function Track({ skills, animation }) {
  // Duplicate 3× for seamless infinite loop
  const all = [...skills, ...skills, ...skills];
  return (
    <div className="carousel-mask" style={{ marginBottom: '1.25rem' }}>
      <div
        className={`flex gap-4 w-max ${animation}`}
        style={{ display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {all.map((s, i) => (
          <div key={i} className="skill-pill">
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: s.color, flexShrink: 0,
              display: 'inline-block',
            }} />
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsCarousel() {
  return (
    <section id="skills" style={{ padding: '8rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 3rem', marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '1.2rem' }}>
            Tech Stack
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
            Skills that <span className="grad-text">ship</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <Track skills={ROW1} animation="animate-carousel-left" />
      {/* Row 2 — scrolls right */}
      <Track skills={ROW2} animation="animate-carousel-right" />
      {/* Row 3 — scrolls left (slower) */}
      <Track skills={ROW3} animation="animate-carousel-left2" />
    </section>
  );
}
