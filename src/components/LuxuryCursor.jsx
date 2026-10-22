import React, { useEffect, useRef, useState } from 'react';

/**
 * LuxuryCursor — Ultra-Premium Golden Mouse Follower & Stardust Trail
 *
 * Features:
 * 1. Crisp 24K gold core bead with instant cursor positioning.
 * 2. Inertial gilded celestial halo that follows with silky physics damping.
 * 3. Floating golden stardust / ember trail spawned gently behind the pointer.
 * 4. Magnetic expansion on interactive elements (buttons, links, cards).
 * 5. Instant clean deactivation on touchscreens and mobile viewports.
 */
export function LuxuryCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse / trackpad)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || reduceMotion) return;

    setIsSupported(true);

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    let animId;
    let running = false;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Sparkle particles pool (max 26 active particles for silky 60fps)
    const sparkles = [];
    let lastSpawnTime = 0;

    const spawnSparkle = (x, y) => {
      const now = performance.now();
      if (now - lastSpawnTime < 50) return; // throttle emission
      lastSpawnTime = now;

      if (sparkles.length > 12) sparkles.shift();

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.2 + 0.3;
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        size: Math.random() * 2.2 + 0.8,
        alpha: 0.85,
        decay: Math.random() * 0.025 + 0.02,
        color: Math.random() > 0.4 ? '241, 217, 162' : '212, 175, 103'
      });
    };

    const handleMouseMove = (e) => {
      isVisible.current = true;
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Spawn stardust along trail
      spawnSparkle(e.clientX, e.clientY);

      // Check if hovering over interactive element
      const target = e.target;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], .product-card, .btn-primary, .btn-secondary, .btn-outline-gold')
        );
        isHovering.current = isInteractive;
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
    };

    const handleMouseUp = () => {
      isClicking.current = false;
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      // 1. Move instant core dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        dotRef.current.style.opacity = isVisible.current ? '1' : '0';
      }

      // 2. Smooth Lerp for Aureole Ring
      const lerp = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        const scale = isClicking.current ? 0.75 : isHovering.current ? 1.7 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scale})`;
        ringRef.current.style.opacity = isVisible.current ? '1' : '0';
        ringRef.current.style.borderColor = isHovering.current
          ? 'rgba(241, 217, 162, 0.9)'
          : 'rgba(212, 175, 103, 0.45)';
        ringRef.current.style.boxShadow = isHovering.current
          ? '0 0 16px rgba(212, 175, 103, 0.5), inset 0 0 8px rgba(241, 217, 162, 0.3)'
          : '0 0 8px rgba(212, 175, 103, 0.2)';
      }

      // 3. Render Canvas Stardust
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = sparkles.length - 1; i >= 0; i--) {
          const s = sparkles[i];
          s.x += s.vx;
          s.y += s.vy;
          s.alpha -= s.decay;

          if (s.alpha <= 0) {
            sparkles.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color}, ${s.alpha.toFixed(2)})`;
          ctx.fill();
        }
      }

      if (running && !document.hidden) animId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(render);
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
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <>
      {/* Canvas Stardust Trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />

      {/* Instant Central Golden Bead */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -3,
          left: -3,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#fff6d6',
          boxShadow: '0 0 8px #f1d9a2, 0 0 14px rgba(212, 175, 103, 0.8)',
          pointerEvents: 'none',
          zIndex: 10000,
          willChange: 'transform, opacity',
          transition: 'opacity 0.2s ease',
          opacity: 0
        }}
      />

      {/* Inertial Golden Halo Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -18,
          left: -18,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.2px solid rgba(212, 175, 103, 0.45)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform, opacity, border-color, box-shadow',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease',
          opacity: 0
        }}
      />
    </>
  );
}
