'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '8rem 3rem', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '1.2rem' }}>
          Testimonials
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '3rem' }}>
          What people <span className="grad-text">say</span>
        </h2>

        <div style={{
          padding: '6rem 3rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px dashed rgba(255,255,255,0.12)',
          borderRadius: 32, textAlign: 'center',
          color: '#6e6e73',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.65 }}>
            Testimonials coming soon.<br />
            <span style={{ fontSize: '0.9rem' }}>
              Colleagues and collaborators — reach out if you&apos;d like to be featured here.
            </span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
