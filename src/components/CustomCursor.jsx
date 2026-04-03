'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const curRef  = useRef(null);
  const ringRef = useRef(null);
  const posRef  = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const cur  = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    };

    const animate = () => {
      const p = posRef.current;
      p.rx += (p.x - p.rx) * 0.13;
      p.ry += (p.y - p.ry) * 0.13;
      ring.style.left = p.rx + 'px';
      ring.style.top  = p.ry + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    const els = document.querySelectorAll('a, button');
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={curRef}  className="cursor"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
