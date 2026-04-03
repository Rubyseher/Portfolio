'use client';

import { useEffect, useRef } from 'react';

const W = 280;
const H = 280;
const STEP = 6;
const MAX = 700;

// Phases and durations (ms)
const FORM_MS    = 1700;  // particles converge into logo
const HOLD_MS    = 1100;  // logo displayed
const SCATTER_MS = 850;   // particles drift apart before next logo

// Each draws white on black — particles are colored per logo
function drawReact(ctx) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 10;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fill();
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

function drawAWS(ctx) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 110px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AWS', W / 2, H / 2 - 10);
  // underline arc
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(W / 2, H / 2 + 30, 80, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();
  // arrow tip right
  ctx.beginPath();
  ctx.moveTo(W / 2 + 80 * Math.cos(0.9 * Math.PI), H / 2 + 30 + 80 * Math.sin(0.9 * Math.PI));
  ctx.lineTo(W / 2 + 80 * Math.cos(0.9 * Math.PI) + 14, H / 2 + 30 + 80 * Math.sin(0.9 * Math.PI) - 8);
  ctx.stroke();
}

function drawTS(ctx) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  // rounded square background outline
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 10;
  const pad = 28;
  ctx.beginPath();
  ctx.roundRect(pad, pad, W - pad * 2, H - pad * 2, 28);
  ctx.stroke();
  // TS text inside
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 120px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TS', W / 2, H / 2 + 6);
}

const LOGOS = [
  { name: 'React',  color: '#61dafb', draw: drawReact  },
  { name: 'JS',     color: '#f7df1e', draw: drawJS     },
  { name: 'AWS',    color: '#ff9900', draw: drawAWS    },
  { name: 'TS',     color: '#3178c6', draw: drawTS     },
];

function sampleLogo(drawFn) {
  const off = document.createElement('canvas');
  off.width = W; off.height = H;
  const ctx = off.getContext('2d');
  drawFn(ctx);
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts = [];
  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      const i = (y * W + x) * 4;
      if (data[i] > 120 && data[i + 3] > 120) pts.push({ x, y });
    }
  }
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  return pts.slice(0, MAX);
}

function randomScatterTarget() {
  // spread within canvas in loose random cloud
  return {
    x: W * 0.1 + Math.random() * W * 0.8,
    y: H * 0.1 + Math.random() * H * 0.8,
  };
}

export default function LogoParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // --- State ---
    let logoIndex = 0;
    let phase = 'forming';       // 'forming' | 'holding' | 'scattering'
    let phaseStart = performance.now();
    let currentColor = LOGOS[0].color;

    // Initialise particles at random positions, targets = first logo
    const logoTargets = sampleLogo(LOGOS[0].draw);
    let particles = logoTargets.map(t => ({
      x: Math.random() * W,
      y: Math.random() * H,
      tx: t.x,
      ty: t.y,
    }));

    // lerp speed per phase
    const FORM_EASE    = 0.045;   // smooth convergence, no overshoot
    const SCATTER_EASE = 0.055;

    let animId;

    const animate = (now) => {
      const elapsed = now - phaseStart;

      // ---- Phase transitions ----
      if (phase === 'forming' && elapsed > FORM_MS) {
        phase = 'holding';
        phaseStart = now;
      } else if (phase === 'holding' && elapsed > HOLD_MS) {
        phase = 'scattering';
        phaseStart = now;
        // Give every particle a random scatter destination
        particles.forEach(p => {
          const t = randomScatterTarget();
          p.tx = t.x;
          p.ty = t.y;
        });
      } else if (phase === 'scattering' && elapsed > SCATTER_MS) {
        // Advance to next logo
        logoIndex = (logoIndex + 1) % LOGOS.length;
        currentColor = LOGOS[logoIndex].color;
        const newTargets = sampleLogo(LOGOS[logoIndex].draw);

        // Reconcile particle count
        while (particles.length < newTargets.length) {
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            tx: 0, ty: 0,
          });
        }
        particles = particles.slice(0, newTargets.length);
        newTargets.forEach((t, i) => {
          particles[i].tx = t.x;
          particles[i].ty = t.y;
        });

        phase = 'forming';
        phaseStart = now;
      }

      // ---- Draw ----
      ctx.clearRect(0, 0, W, H);
      const ease = phase === 'scattering' ? SCATTER_EASE : FORM_EASE;

      // Fade alpha slightly during scatter for depth
      const alpha = phase === 'scattering' ? 0.55 : 0.82;

      particles.forEach(p => {
        p.x += (p.tx - p.x) * ease;
        p.y += (p.ty - p.y) * ease;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
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
