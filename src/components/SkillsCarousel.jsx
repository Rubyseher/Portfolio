'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SiReact, SiTypescript, SiJavascript, SiPython, SiNodedotjs,
  SiDocker, SiKubernetes, SiGit, SiTailwindcss, SiHtml5, SiCss,
  SiMongodb, SiFirebase, SiPostman,
  SiFigma, SiGooglecloud,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const SKILLS = [
  // CLOSE to center — large
  { Icon: SiReact,       color: '#61dafb', label: 'React',      l: '22%', t: '28%', s: 78 },
  { Icon: SiDocker,      color: '#2496ed', label: 'Docker',     l: '73%', t: '30%', s: 74 },
  { Icon: FaAws,         color: '#ff9900', label: 'AWS',        l: '20%', t: '60%', s: 76 },
  { Icon: SiKubernetes,  color: '#326ce5', label: 'Kubernetes', l: '74%', t: '62%', s: 70 },
  { Icon: SiFirebase,    color: '#ffca28', label: 'Firebase',   l: '44%', t: '72%', s: 66 },
  { Icon: SiJavascript,  color: '#f7df1e', label: 'JavaScript', l: '43%', t: '20%', s: 68 },
  // MID distance — medium
  { Icon: SiTypescript,  color: '#3178c6', label: 'TypeScript', l: '10%', t: '18%', s: 54 },
  { Icon: SiNodedotjs,   color: '#68a063', label: 'Node.js',    l: '76%', t: '16%', s: 52 },
  { Icon: SiGit,         color: '#f05032', label: 'Git',        l: '8%',  t: '50%', s: 50 },
  { Icon: SiTailwindcss, color: '#38bdf8', label: 'Tailwind',   l: '85%', t: '48%', s: 52 },
  { Icon: SiMongodb,     color: '#47a248', label: 'MongoDB',    l: '28%', t: '82%', s: 50 },
  { Icon: SiHtml5,       color: '#e34f26', label: 'HTML5',      l: '64%', t: '80%', s: 50 },
  // FAR — small (at screen edges)
  { Icon: SiPython,      color: '#4584b6', label: 'Python',     l: '2%',  t: '6%',  s: 36 },
  { Icon: SiGooglecloud, color: '#4285f4', label: 'GCP/GKE',   l: '88%', t: '4%',  s: 34 },
  { Icon: SiPostman,     color: '#ff6c37', label: 'Postman',    l: '3%',  t: '78%', s: 34 },
  { Icon: SiCss,         color: '#1572b6', label: 'CSS3',       l: '88%', t: '82%', s: 34 },
  { Icon: SiFigma,       color: '#f24e1e', label: 'Figma/UX',  l: '92%', t: '36%', s: 30 },
];

export default function SkillsCarousel() {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start end', 'end start'],
  });

  const iconsOpacity = useTransform(scrollYProgress, [0.5, 0.82], [1, 0.08]);
  const iconsScale   = useTransform(scrollYProgress, [0.5, 0.82], [1, 1.18]);
  const textScale    = useTransform(scrollYProgress, [0.45, 0.82], [1, 1.22]);
  const textOpacity  = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);
  const containerScale   = useTransform(scrollYProgress, [0.5, 0.88], [1, 8]);
  const containerOpacity = useTransform(scrollYProgress, [0.78, 0.88], [1, 0]);

  return (
    <div
      id="skills"
      ref={outerRef}
      style={{ height: '200vh', position: 'relative' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <motion.div style={{
          scale: containerScale,
          opacity: containerOpacity,
          width: '100%', height: '100%',
          position: 'relative',
        }}>

          {/* Floating skill icons */}
          <motion.div style={{ opacity: iconsOpacity, scale: iconsScale }}>
            {SKILLS.map(({ Icon, color, label, l, t, s }, i) => (
              <motion.div
                key={label}
                style={{ position: 'absolute', left: l, top: t }}
                initial={{ opacity: 0, scale: 0.55, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ delay: i * 0.042, duration: 0.55, ease: [0.34, 1.3, 0.64, 1] }}
              >
                <div style={{
                  padding: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={s} color={color} style={{ display: 'block' }} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Center text */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center', pointerEvents: 'none',
          }}>
            <motion.div style={{ scale: textScale, opacity: textOpacity }}>
              <p style={{
                fontSize: '0.72rem', textTransform: 'uppercase',
                letterSpacing: '0.16em', color: '#2997ff',
                fontWeight: 600, marginBottom: '0.9rem',
              }}>
                Tech Stack
              </p>
              <h2 style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
                fontWeight: 800, letterSpacing: '-0.04em',
                lineHeight: 1.05, marginBottom: '1rem',
              }}>
                Skills that{' '}
                <span className="grad-text">ship</span>
              </h2>
              <p style={{ fontSize: '1rem', color: '#6e6e73', lineHeight: 1.6, maxWidth: 380 }}>
                From frontend to cloud infrastructure — full stack, end to end.
              </p>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
