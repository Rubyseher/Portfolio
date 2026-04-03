'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { val: 75,  suffix: '%', label: 'Reduction in SRE checks via Grafana monitoring dashboard' },
  { val: 40,  suffix: '+', label: 'Engineers using her dashboards daily at JPMorgan Chase' },
  { val: 720, suffix: '+', label: 'Engineering hours saved per year via Oracle APEX tool' },
  { val: 900, suffix: '+', label: 'Participants competed against at Code for Good Hackathon' },
];

function Counter({ val, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2200;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(ease * val));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [val]);

  return (
    <span ref={ref} style={{
      fontSize: '3.2rem', fontWeight: 900, letterSpacing: '-0.05em',
      background: 'linear-gradient(135deg, #2997ff, #bf5af2)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text', lineHeight: 1, display: 'block',
    }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section style={{ padding: '6rem 3rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
      }}>
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="glass-card"
            style={{ padding: '2rem 1.75rem', borderRadius: 20, textAlign: 'center' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.85, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -5, borderColor: 'rgba(41,151,255,0.35)' }}
          >
            <Counter val={s.val} suffix={s.suffix} />
            <p style={{ fontSize: '0.82rem', color: '#6e6e73', marginTop: '0.6rem', lineHeight: 1.4 }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
