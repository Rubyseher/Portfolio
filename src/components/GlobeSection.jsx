'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CITIES = [
  { name: 'Bangalore', lat: 12.97,  lng: 77.59,   home: true  },
  { name: 'London',    lat: 51.5,   lng: -0.12                 },
  { name: 'New York',  lat: 40.71,  lng: -74.0                 },
  { name: 'Singapore', lat: 1.35,   lng: 103.82                },
  { name: 'Dubai',     lat: 25.2,   lng: 55.27                 },
  { name: 'Berlin',    lat: 52.52,  lng: 13.4                  },
  { name: 'Tokyo',     lat: 35.68,  lng: 139.69                },
  { name: 'SF',        lat: 37.77,  lng: -122.42               },
];

function project(lat, lng, rotDeg) {
  const φ = (lat * Math.PI) / 180;
  const λ = ((lng + rotDeg) * Math.PI) / 180;
  return {
    x: Math.cos(φ) * Math.sin(λ),
    y: Math.sin(φ),
    z: Math.cos(φ) * Math.cos(λ),
  };
}

function drawGridLine(ctx, value, isLat, R, cx, cy, rot) {
  const SEG = 120;
  ctx.beginPath();
  let drawing = false;
  for (let i = 0; i <= SEG; i++) {
    const curLat = isLat ? value : (i / SEG) * 180 - 90;
    const curLng = isLat ? (i / SEG) * 360 - 180 : value;
    const p = project(curLat, curLng, rot);
    const sx = cx + p.x * R;
    const sy = cy - p.y * R;
    if (p.z >= 0) {
      if (!drawing) { ctx.moveTo(sx, sy); drawing = true; }
      else ctx.lineTo(sx, sy);
    } else {
      drawing = false;
    }
  }
  const alpha = isLat && value === 0 ? 0.4 : 0.18;
  ctx.strokeStyle = `rgba(100,180,255,${alpha})`;
  ctx.lineWidth = 0.7;
  ctx.stroke();
}

export default function GlobeSection() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    const W = 560, H = 560;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(DPR, DPR);

    const R  = 210;
    const cx = W / 2;
    const cy = H / 2;

    function draw(time) {
      ctx.clearRect(0, 0, W, H);
      const rot = (time * 0.01) % 360;

      // Outer atmosphere glow
      const atmo = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R * 1.6);
      atmo.addColorStop(0,   'rgba(41,151,255,0.28)');
      atmo.addColorStop(0.4, 'rgba(80,140,255,0.18)');
      atmo.addColorStop(0.7, 'rgba(120,80,255,0.1)');
      atmo.addColorStop(1,   'transparent');
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Inner sphere fill
      const fill = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, 0, cx, cy, R);
      fill.addColorStop(0,   'rgba(41,100,180,0.08)');
      fill.addColorStop(0.6, 'rgba(10,20,60,0.18)');
      fill.addColorStop(1,   'rgba(0,0,20,0.35)');
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Latitude lines
      for (let lat = -75; lat <= 75; lat += 15) {
        drawGridLine(ctx, lat, true, R, cx, cy, rot);
      }

      // Longitude lines
      for (let lng = 0; lng < 360; lng += 15) {
        drawGridLine(ctx, lng, false, R, cx, cy, rot);
      }

      // Globe edge ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(41,151,255,0.75)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Specular highlight
      const spec = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.38, 0, cx - R * 0.1, cy - R * 0.1, R * 0.7);
      spec.addColorStop(0,   'rgba(255,255,255,0.07)');
      spec.addColorStop(0.4, 'rgba(255,255,255,0.02)');
      spec.addColorStop(1,   'transparent');
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // City pins
      CITIES.forEach(city => {
        const p = project(city.lat, city.lng, rot);
        if (p.z < 0.05) return;
        const sx = cx + p.x * R;
        const sy = cy - p.y * R;
        const pulse = 0.4 + 0.6 * Math.sin(time * 0.002 + city.lng * 0.08);

        if (city.home) {
          // Home city — warm white glow
          const hg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 14 + pulse * 6);
          hg.addColorStop(0,   'rgba(255,240,180,0.95)');
          hg.addColorStop(0.4, 'rgba(255,200,80,0.4)');
          hg.addColorStop(1,   'transparent');
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(sx, sy, 14 + pulse * 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Other cities — blue glow
          const pg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 9 + pulse * 4);
          pg.addColorStop(0,   'rgba(41,151,255,0.85)');
          pg.addColorStop(0.5, 'rgba(41,151,255,0.25)');
          pg.addColorStop(1,   'transparent');
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(sx, sy, 9 + pulse * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(200,230,255,0.9)';
          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      height: 420,
      marginBottom: '-280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '2.5rem',
      zIndex: 0,
    }}>

      {/* Label */}
      <motion.div
        style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p style={{
          fontSize: '0.7rem', textTransform: 'uppercase',
          letterSpacing: '0.2em', color: '#2997ff',
          fontWeight: 600, marginBottom: '0.4rem',
        }}>
          Open to relocation worldwide
        </p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.82rem', fontWeight: 400 }}>
          Bangalore &rarr; anywhere
        </p>
      </motion.div>

      {/* Bottom edge fade — blends globe into page */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 120,
        background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        zIndex: 3, pointerEvents: 'none',
      }} />

      {/* Bottom glow bloom */}
      <div style={{
        position: 'absolute', bottom: -40, left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 300,
        background: 'radial-gradient(ellipse at center, rgba(41,151,255,0.38) 0%, rgba(80,120,255,0.16) 40%, rgba(120,60,255,0.06) 65%, transparent 80%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Globe canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          bottom: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </section>
  );
}
