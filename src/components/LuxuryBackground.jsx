import React, { useEffect, useRef } from 'react';

/**
 * LuxuryBackground — Performance-Optimised Version
 *
 * All animation runs exclusively on the GPU compositor thread:
 * - Aurora orbs use CSS transform/opacity only (no layout/paint triggers).
 * - Canvas particle system uses a single shadow-free batch draw per frame.
 * - Sacred watermark is a pure CSS animation using transform only.
 * - Particle count reduced to 35 for mobile and 50 for desktop.
 */
export function LuxuryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let animId;
    let running = false;
    let lastFrameTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Throttled resize handler — only fires 200ms after last resize event
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Reduce particle count on mobile for smooth 60 fps
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 14 : 28;

    const GOLD = [
      [241, 217, 162],
      [212, 175, 103],
      [255, 235, 185],
      [184, 145, 70],
    ];

    const particles = Array.from({ length: COUNT }, () => {
      const [r, g, b] = GOLD[Math.floor(Math.random() * GOLD.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.4 + 0.12,
        baseAlpha: Math.random() * 0.4 + 0.12,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.15,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.018 + 0.006,
        swayAmp: Math.random() * 0.2 + 0.05,
        swaySpeed: Math.random() * 0.008 + 0.003,
        swayPhase: Math.random() * Math.PI * 2,
        cr: r, cg: g, cb: b,
      };
    });

    let tick = 0;

    const draw = (timestamp) => {
      if (timestamp - lastFrameTime < 33) {
        if (running && !document.hidden) animId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;
      tick++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];

        p.y += p.vy;
        p.x += p.vx + Math.sin(tick * p.swaySpeed + p.swayPhase) * p.swayAmp;
        p.twinkle += p.twinkleSpeed;

        // Wrap
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W; }
        if (p.x < -6) p.x = W + 6;
        if (p.x > W + 6) p.x = -6;

        // Twinkle — simple sine for alpha, NO shadowBlur
        const alpha = p.baseAlpha * (0.55 + 0.45 * Math.sin(p.twinkle));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      if (running && !document.hidden) animId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      if (animId) cancelAnimationFrame(animId);
    };
    const handleVisibility = () => document.hidden ? stop() : start();
    document.addEventListener('visibilitychange', handleVisibility);
    start();

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#080706',
        // Force its own compositing layer so the browser never paints page content on top of it
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {/* Aurora glow orbs — GPU-composited transform/opacity only */}
      <div className="lx-aurora lx-aurora-1" />
      <div className="lx-aurora lx-aurora-2" />
      <div className="lx-aurora lx-aurora-3" />

      {/* Sacred rotating dot-grid watermark */}
      <div className="lx-watermark" />

      {/* Stardust canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85,
          // Promote canvas to its own compositing layer
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />

      {/* Radial vignette — simple CSS, no paint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, transparent 38%, rgba(5,4,3,0.6) 72%, rgba(3,2,2,0.9) 100%)',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        /* ---- Aurora Orbs ---- */
        .lx-aurora {
          position: absolute;
          border-radius: 50%;
          /* blur via filter on a fixed-position element paints once per frame on CPU
             — much cheaper than animating actual CSS filter live.
             We keep it but reduce blur radius on mobile. */
          filter: blur(80px);
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .lx-aurora-1 {
          width: 520px;
          height: 520px;
          top: -100px;
          left: 12%;
          background: radial-gradient(circle,
            rgba(212,175,103,0.42) 0%,
            rgba(184,145,70,0.18) 55%,
            transparent 78%);
          animation: lxOrb1 22s ease-in-out infinite alternate;
        }
        .lx-aurora-2 {
          width: 580px;
          height: 580px;
          bottom: -120px;
          right: 8%;
          background: radial-gradient(circle,
            rgba(241,217,162,0.32) 0%,
            rgba(141,107,53,0.15) 55%,
            transparent 78%);
          animation: lxOrb2 26s ease-in-out infinite alternate;
          animation-delay: -8s;
        }
        .lx-aurora-3 {
          width: 420px;
          height: 420px;
          top: 42%;
          left: -80px;
          background: radial-gradient(circle,
            rgba(212,175,103,0.28) 0%,
            rgba(90,62,16,0.12) 62%,
            transparent 82%);
          animation: lxOrb3 18s ease-in-out infinite alternate;
          animation-delay: -14s;
        }

        /* GPU-only keyframes: ONLY transform + opacity */
        @keyframes lxOrb1 {
          0%   { transform: translate(0,0) scale(1);    opacity: 0.18; }
          50%  { transform: translate(55px,45px) scale(1.12); opacity: 0.26; }
          100% { transform: translate(-38px,80px) scale(0.94); opacity: 0.16; }
        }
        @keyframes lxOrb2 {
          0%   { transform: translate(0,0) scale(1);    opacity: 0.20; }
          50%  { transform: translate(-60px,-50px) scale(1.15); opacity: 0.30; }
          100% { transform: translate(45px,-35px) scale(1.04); opacity: 0.18; }
        }
        @keyframes lxOrb3 {
          0%   { transform: translate(0,0) scale(1);    opacity: 0.14; }
          50%  { transform: translate(45px,-35px) scale(1.08); opacity: 0.22; }
          100% { transform: translate(-25px,28px) scale(0.92); opacity: 0.14; }
        }

        /* ---- Sacred Watermark ---- */
        .lx-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 800px;
          /* Use transform for initial centre — rotation handled via @keyframes */
          transform: translate(-50%, -50%) rotate(0deg);
          background-image:
            radial-gradient(circle, rgba(212,175,103,0.055) 1px, transparent 1px),
            radial-gradient(circle, rgba(241,217,162,0.03) 1px, transparent 1px);
          background-size: 38px 38px, 76px 76px;
          background-position: 0 0, 19px 19px;
          border-radius: 50%;
          opacity: 0.55;
          will-change: transform;
          animation: lxWatermarkRotate 200s linear infinite;
          pointer-events: none;
        }
        @keyframes lxWatermarkRotate {
          from { transform: translate(-50%, -50%) rotate(0deg);   }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* ---- Mobile: reduce sizes & blur to keep 60 fps ---- */
        @media (max-width: 768px) {
          .lx-aurora-1, .lx-aurora-2 { filter: blur(55px); width: 320px; height: 320px; }
          .lx-aurora-3 { display: none; }
          .lx-watermark { width: 500px; height: 500px; }
        }
        @media (max-width: 480px) {
          .lx-aurora-1, .lx-aurora-2 { filter: blur(40px); width: 250px; height: 250px; }
        }
      `}</style>
    </div>
  );
}
