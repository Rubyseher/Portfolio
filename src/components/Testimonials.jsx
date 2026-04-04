'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Jyothi',
    role: 'Senior Engineer · JPMorgan Chase',
    text: 'Ruby didn\'t just build what was asked — she built what was needed. Her Grafana dashboards changed how our entire team monitors incidents.',
    side: 'left',
    grad: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
  },
  {
    name: 'Ilyaz',
    role: 'Tech Lead · JPMorgan Chase',
    text: 'She picked up Kubernetes, AWS ECS, and our infra stack within weeks and was contributing meaningfully before most interns had finished onboarding.',
    side: 'right',
    grad: 'linear-gradient(135deg, #818cf8, #c084fc)',
  },
  {
    name: 'Aadi',
    role: 'Software Engineer · JPMorgan Chase',
    text: 'The Oracle APEX tool Ruby built saved our team hundreds of hours — and she shipped it in record time. She makes everyone around her better.',
    side: 'left',
    grad: 'linear-gradient(135deg, #f472b6, #a78bfa)',
  },
  {
    name: 'Shayan',
    role: 'Collaborator · JGEC Winter of Code',
    text: 'Ruby has demonstrated excellent communication, strong leadership, and diligence. She will be an exceptional asset to any team she is part of.',
    side: 'right',
    grad: 'linear-gradient(135deg, #34d399, #38bdf8)',
  },
];

function Bubble({ text, name, role, side, grad, delay }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: 560, position: 'relative' }}>
        {/* Bubble */}
        <div style={{
          background: grad,
          borderRadius: isLeft ? '22px 22px 22px 4px' : '22px 22px 4px 22px',
          padding: '2rem 2.2rem 1.6rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          position: 'relative',
        }}>
          <p style={{
            fontSize: '1.08rem', fontWeight: 500,
            color: '#fff', lineHeight: 1.75,
            marginBottom: '1.2rem',
          }}>
            {text}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', margin: 0 }}>{name}</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{role}</p>
            </div>
            {/* Avatar placeholder initials */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 700, color: '#fff',
              flexShrink: 0,
            }}>
              {name[0]}
            </div>
          </div>
        </div>
        {/* Tail */}
        <div style={{
          position: 'absolute',
          bottom: -10,
          [isLeft ? 'left' : 'right']: 18,
          width: 0, height: 0,
          borderLeft: isLeft ? '12px solid transparent' : 'none',
          borderRight: isLeft ? 'none' : '12px solid transparent',
          borderTop: `12px solid ${isLeft ? '#a78bfa' : '#818cf8'}`,
        }} />
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '10rem 5rem', maxWidth: 1100, margin: '0 auto' }}>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '5rem' }}
      >
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#2997ff', fontWeight: 600, marginBottom: '0.8rem' }}>
          Testimonials
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
          Backed by strong <span className="grad-text">recommendations.</span>
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        {TESTIMONIALS.map((t, i) => (
          <Bubble key={t.name} {...t} delay={0} />
        ))}
      </div>

    </section>
  );
}
