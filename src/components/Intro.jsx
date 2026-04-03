'use client';

import { useRef, useEffect } from 'react';

const WORDS = [
  { text: 'I', highlight: false },
  { text: 'build', highlight: false },
  { text: 'software', highlight: false },
  { text: 'that', highlight: false },
  { text: 'engineers', highlight: false },
  { text: 'actually', highlight: true },
  { text: 'use', highlight: true },
  { text: '—', highlight: false },
  { text: 'React', highlight: false },
  { text: 'dashboards,', highlight: false },
  { text: 'cloud-native', highlight: false },
  { text: 'tools,', highlight: false },
  { text: 'and', highlight: false },
  { text: 'experiences', highlight: false },
  { text: 'moving', highlight: false },
  { text: 'at', highlight: false },
  { text: 'the', highlight: false },
  { text: 'speed', highlight: true },
  { text: 'of', highlight: true },
  { text: 'thought.', highlight: true },
];

export default function Intro() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH * 0.75;
      const end   = viewH * 0.25;

      const progress = Math.max(0, Math.min(1,
        (start - rect.top) / (start - end + rect.height)
      ));

      const activeCount = Math.floor(progress * wordsRef.current.length * 1.3);
      wordsRef.current.forEach((el, i) => {
        if (!el) return;
        el.style.color = i < activeCount
          ? el.dataset.highlight === 'true'
            ? 'transparent'  // let background show through
            : 'rgba(255,255,255,1)'
          : el.dataset.highlight === 'true'
            ? 'transparent'
            : 'rgba(255,255,255,0.15)';

        // Highlighted words use a gradient; opacity controls reveal
        if (el.dataset.highlight === 'true') {
          el.style.opacity = i < activeCount ? '1' : '0.15';
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      id="intro"
      ref={containerRef}
      style={{ padding: '10rem 3rem 8rem', maxWidth: 1160, margin: '0 auto' }}
    >
      <p
        style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
          fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.03em',
          display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', alignItems: 'baseline',
        }}
      >
        {WORDS.map((w, i) =>
          w.highlight ? (
            <span
              key={i}
              ref={el => (wordsRef.current[i] = el)}
              data-highlight="true"
              className="grad-text"
              style={{ display: 'inline-block', opacity: 0.15, transition: 'opacity 0.4s' }}
            >
              {w.text}
            </span>
          ) : (
            <span
              key={i}
              ref={el => (wordsRef.current[i] = el)}
              data-highlight="false"
              style={{
                display: 'inline-block',
                color: 'rgba(255,255,255,0.15)',
                transition: 'color 0.4s',
              }}
            >
              {w.text}
            </span>
          )
        )}
      </p>
    </div>
  );
}
