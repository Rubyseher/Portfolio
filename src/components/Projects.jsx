'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── ShadeMatch — laptop section ───────────────────────────────────────────────
function ShadeMatchSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY       = useTransform(scrollYProgress, [0, 0.08], [20, 0]);

  // Text fades in first
  const textOpacity = useTransform(scrollYProgress, [0.06, 0.20], [0, 1]);
  const textY       = useTransform(scrollYProgress, [0.06, 0.20], [30, 0]);

  // Lid: -85 = nearly closed, 18 = open ~105°
  const lidAngle      = useTransform(scrollYProgress, [0.22, 0.58], [-85, 18]);
  const screenOpacity = useTransform(scrollYProgress, [0.42, 0.56], [0, 1]);

  return (
    <div ref={ref} style={{ height: '300vh', position: 'relative', background: '#000' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: '#000', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 5rem',
        gap: '1.5rem',
      }}>
        {/* Label + title */}
        <motion.div style={{ opacity: headerOpacity, y: headerY, textAlign: 'center' }}>
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#2997ff', fontWeight: 600, marginBottom: '0.4rem' }}>
            Projects
          </p>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
            Things I&apos;ve <span className="grad-text">built</span>
          </h2>
        </motion.div>

        {/* Center: project text */}
        <motion.div style={{ opacity: textOpacity, y: textY, textAlign: 'center', maxWidth: 620 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem', justifyContent: 'center', marginBottom: '0.7rem' }}>
            <span style={{
              fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
              background: 'linear-gradient(135deg, #2997ff, #bf5af2)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>01</span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.03em' }}>ShadeMatch</h3>
          </div>
          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.35, color: '#f5f5f7', marginBottom: '0.7rem' }}>
            Your wardrobe, finally coordinated.
          </p>
          <p style={{ fontSize: '0.88rem', color: '#6e6e73', lineHeight: 1.7, marginBottom: '0.6rem' }}>
            Most people buy clothes that never get worn — not because they don&apos;t fit, but because nothing matches them.
          </p>
          <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '1rem' }}>
            Upload a photo of any clothing item. ShadeMatch extracts its colors, finds complementary combinations from your wardrobe, and links you to anything missing.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', justifyContent: 'center', marginBottom: '0.9rem' }}>
            {['React.js', 'AI/ML', 'Color Extraction', 'Deployed'].map(t => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>
          <a href="https://github.com/Rubyseher/ShadeMatch" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#2997ff', fontWeight: 600, textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.gap = '0.8rem')}
            onMouseLeave={e => (e.currentTarget.style.gap = '0.45rem')}
          >View on GitHub →</a>
        </motion.div>

        {/* Center: laptop below text */}
        <div style={{ perspective: 1100, perspectiveOrigin: '50% -30%' }}>
          <div style={{ width: 520, transform: 'rotateX(-20deg)', transformStyle: 'preserve-3d' }}>
            <motion.div style={{
              width: 520, height: 295,
              transformOrigin: '50% 100%',
              rotateX: lidAngle,
              transformStyle: 'preserve-3d',
              position: 'relative', zIndex: 2,
            }}>
              {/* Shell back */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(165deg, #3e3e3e, #252525)',
                borderRadius: '14px 14px 0 0',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}>
                <div style={{
                  position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%,-50%)',
                  width: 34, height: 34, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.07)',
                }} />
              </div>
              {/* Screen */}
              <div style={{
                position: 'absolute', inset: 0,
                background: '#0a0a0a', borderRadius: '14px 14px 0 0',
                border: '8px solid #2c2c2c', overflow: 'hidden',
                backfaceVisibility: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
                  width: 7, height: 7, borderRadius: '50%', background: '#2a2a2a', zIndex: 10,
                }} />
                <motion.div style={{ opacity: screenOpacity, position: 'absolute', inset: 0 }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image src="/logos/shade-match.png" alt="ShadeMatch" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <div style={{ width: 520, height: 10, background: '#2a2a2a' }} />
            <div style={{ width: 554, height: 10, background: '#1e1e1e', borderRadius: '0 0 10px 10px', margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.9)' }} />
          </div>
        </div>

        {/* Dot: first of 2 */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: i === 0 ? 22 : 6, height: 6, borderRadius: 3, background: i === 0 ? '#2997ff' : 'rgba(255,255,255,0.18)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── iPhone mockup ─────────────────────────────────────────────────────────────
function IPhone({ src, rotateY, translateX, translateY, scaleVal, zIndex, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        width: 200, height: 420,
        transform: `perspective(1000px) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scaleVal})`,
        transformOrigin: 'bottom center',
        position: 'relative',
        zIndex,
        flexShrink: 0,
      }}
    >
      {/* Chassis */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 46,
        background: `linear-gradient(${rotateY > 0 ? '120deg' : rotateY < 0 ? '240deg' : '180deg'}, #5a5a5a, #1a1a1a, #2e2e2e)`,
        padding: 4,
        boxShadow: zIndex === 3
          ? '0 50px 100px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.18)'
          : '0 30px 70px rgba(0,0,0,0.75), 0 0 0 0.5px rgba(255,255,255,0.08)',
        position: 'relative',
      }}>
        {/* Light sheen — left phones get right-edge light, right phones get left-edge light */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 46,
          background: rotateY > 0
            ? 'linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.13) 100%)'
            : rotateY < 0
              ? 'linear-gradient(90deg, rgba(255,255,255,0.13) 0%, transparent 40%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
          pointerEvents: 'none', zIndex: 10,
        }} />
        {/* Side button hints */}
        <div style={{
          position: 'absolute',
          top: 110, [rotateY >= 0 ? 'right' : 'left']: -5,
          width: 4, height: 60, borderRadius: 2,
          background: 'linear-gradient(180deg, #555, #333)',
        }} />
        <div style={{
          position: 'absolute',
          top: 90, [rotateY >= 0 ? 'left' : 'right']: -5,
          width: 4, height: 36, borderRadius: 2,
          background: 'linear-gradient(180deg, #555, #333)',
        }} />
        <div style={{
          position: 'absolute',
          top: 136, [rotateY >= 0 ? 'left' : 'right']: -5,
          width: 4, height: 36, borderRadius: 2,
          background: 'linear-gradient(180deg, #555, #333)',
        }} />

        {/* Screen */}
        <div style={{ width: '100%', height: '100%', borderRadius: 42, background: '#000', overflow: 'hidden', position: 'relative' }}>
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            width: 88, height: 24, background: '#000', borderRadius: 14, zIndex: 10,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
          }} />
          {src ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src={src} alt="oven app" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(160deg, #1c0a00, #9a3412)',
              display: 'flex', flexDirection: 'column',
              padding: '48px 14px 14px', gap: 10,
            }}>
              <div style={{ height: 24, background: 'rgba(251,146,60,0.35)', borderRadius: 6 }} />
              {[0.55, 0.35, 0.22, 0.15].map((op, i) => (
                <div key={i} style={{ height: i === 0 ? 100 : 48, background: `rgba(251,146,60,${op})`, borderRadius: 10 }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Automated Oven — phones section ───────────────────────────────────────────
function OvenSection() {
  const phones = ['/projects/oven-1.png', '/projects/oven-2.png', '/projects/oven-3.png'];

  return (
    <div style={{ background: '#000', padding: '8rem 3rem 6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Centered heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ textAlign: 'center', maxWidth: 680, marginBottom: '5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{
            fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
            background: 'linear-gradient(135deg, #2997ff, #bf5af2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>02</span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Automated Oven App</h3>
        </div>

        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.35, color: '#f5f5f7', marginBottom: '1rem' }}>
          Your kitchen, in your pocket.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#6e6e73', lineHeight: 1.75, marginBottom: '0.8rem' }}>
          Smart ovens are only smart when you&apos;re standing next to them. Overcooked meals happen the moment you leave the room.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#a1a1aa', lineHeight: 1.75, marginBottom: '1.6rem' }}>
          A React Native app that streams live oven status over WebSockets and pushes a notification the moment your food hits the target temperature — on iOS and Android.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', justifyContent: 'center', marginBottom: '1.2rem' }}>
          {['React Native', 'IoT', 'WebSockets', 'Push Notifications'].map(t => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>

        <a href="https://github.com/Rubyseher/Automated-Oven-App" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#2997ff', fontWeight: 600, textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.gap = '0.8rem')}
          onMouseLeave={e => (e.currentTarget.style.gap = '0.45rem')}
        >View on GitHub →</a>
      </motion.div>

      {/* 3 iPhones centered */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        filter: 'drop-shadow(0 60px 80px rgba(0,0,0,0.7))',
        gap: '0px',
      }}>
        {/* Left phone */}
        <div style={{ marginRight: -32 }}>
          <IPhone src={phones[0]} rotateY={28} translateX={0} translateY={30} scaleVal={0.86} zIndex={1} delay={0.12} />
        </div>
        {/* Center phone */}
        <IPhone src={phones[1]} rotateY={0} translateX={0} translateY={0} scaleVal={1} zIndex={3} delay={0} />
        {/* Right phone */}
        <div style={{ marginLeft: -32 }}>
          <IPhone src={phones[2]} rotateY={-28} translateX={0} translateY={30} scaleVal={0.86} zIndex={1} delay={0.12} />
        </div>
      </div>

      {/* Dot: second of 2 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4rem' }}>
        {[0, 1].map(i => (
          <div key={i} style={{ width: i === 1 ? 22 : 6, height: 6, borderRadius: 3, background: i === 1 ? '#2997ff' : 'rgba(255,255,255,0.18)' }} />
        ))}
      </div>
    </div>
  );
}

// ── Entry point ────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <div id="projects" style={{ background: '#000' }}>
      <ShadeMatchSection />
      <OvenSection />
    </div>
  );
}
