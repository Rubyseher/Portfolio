'use client';

import { useEffect, useRef, useState } from 'react';

const W = 280;
const H = 280;
const INTERVAL = 5000;
const STEP = 6;
const MAX = 1200;

// Each function draws white on a black canvas — particles are colored separately
function drawReact(ctx) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2, cy = H / 2;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 10;
  ctx.fillStyle = '#fff';

  // center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fill();

  // 3 ellipses rotated 60° apart
  [0, 60, 120].forEach(deg => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(0, 0, 120, 42, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });
}

function drawJS(ctx) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 180px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JS', W / 2, H / 2 + 10);
}

function drawDocker(ctx) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';

  // container grid — 3 rows, increasing columns
  const bw = 38, bh = 28, gap = 8;
  const rows = [[1,2],[0,1,2,3],[0,1,2,3,4]];
  const startY = 32;

  rows.forEach((cols, r) => {
    const rowW = cols.length * bw + (cols.length - 1) * gap;
    const startX = (W - rowW) / 2;
    cols.forEach((_, c) => {
      const x = startX + c * (bw + gap);
      const y = startY + r * (bh + gap);
      ctx.beginPath();
      ctx.roundRect(x, y, bw, bh, 4);
      ctx.fill();
    });
  });

  // whale body
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(W / 2 - 10, 175, 78, Math.PI * 0.15, Math.PI * 0.85);
  ctx.stroke();

  // spout
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(W / 2 + 62, 155);
  ctx.quadraticCurveTo(W / 2 + 90, 120, W / 2 + 75, 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W / 2 + 75, 100);
  ctx.quadraticCurveTo(W / 2 + 105, 90, W / 2 + 95, 115);
  ctx.stroke();

  // eye
  ctx.beginPath();
  ctx.arc(W / 2 - 40, 168, 5, 0, Math.PI * 2);
  ctx.fill();
}

const LOGOS = [
  { name: 'React',  color: '#61dafb', draw: drawReact  },
  { name: 'JS',     color: '#f7df1e', draw: drawJS     },
  { name: 'Docker', color: '#099cec', draw: drawDocker },
];

function sample(drawFn, existing) {
  const off = document.createElement('canvas');
  off.width = W; off.height = H;
  const ctx = off.getContext('2d');
  drawFn(ctx);
  const data = ctx.getImageData(0, 0, W, H).data;

  const targets = [];
  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      const i = (y * W + x) * 4;
      // bright white pixel
      if (data[i] > 120 && data[i + 3] > 120) {
        targets.push({ tx: x, ty: y });
      }
    }
  }

  // shuffle
  for (let i = targets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targets[i], targets[j]] = [targets[j], targets[i]];
  }

  return targets.slice(0, MAX).map((t, i) => ({
    tx: t.tx,
    ty: t.ty,
    x: existing[i] ? existing[i].x : Math.random() * W,
    y: existing[i] ? existing[i].y : Math.random() * H,
    vx: existing[i] ? existing[i].vx * 0.3 : 0,
    vy: existing[i] ? existing[i].vy * 0.3 : 0,
    size: Math.random() * 1.5 + 0.6,
  }));
}

export default function LogoParticles() {
  const canvasRef    = useRef(null);
  const particlesRef = useRef([]);
  const indexRef     = useRef(0);
  const animRef      = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Initial sample
    particlesRef.current = sample(LOGOS[0].draw, []);

    // Cycle logos
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % LOGOS.length;
      particlesRef.current = sample(LOGOS[indexRef.current].draw, particlesRef.current);
    }, INTERVAL);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      const color = LOGOS[indexRef.current].color;

      particlesRef.current.forEach(p => {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.014;
        p.vy += dy * 0.014;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = 0.82;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ display: 'block', opacity: 0.9 }}
    />
  );
}
