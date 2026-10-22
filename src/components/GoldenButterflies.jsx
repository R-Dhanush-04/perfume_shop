import React, { useState } from 'react';

/**
 * GoldenButterflies — Performance-Optimised
 *
 * Key perf decisions:
 * - No SVG filter drop-shadow (very expensive). Replaced with a single cheap
 *   CSS box-shadow on the wrapper instead.
 * - SVG defs are defined ONCE in a hidden <svg> and referenced via <use> to
 *   avoid re-rendering identical gradient nodes for every butterfly.
 * - Wing flap uses CSS animation with transform only (GPU compositor).
 * - Flight paths use CSS animation with translate only.
 * - Particle count reduced to 3 butterflies on mobile.
 */

function ButterflyShape({ flapDuration = '0.34s' }) {
  return (
    <svg
      viewBox="0 0 120 100"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <use href="#bf-defs-left"  style={{ animation: `bfFlapL ${flapDuration} ease-in-out infinite alternate` }} />
      <use href="#bf-defs-right" style={{ animation: `bfFlapR ${flapDuration} ease-in-out infinite alternate` }} />
      <use href="#bf-defs-body" />
    </svg>
  );
}

export function GoldenButterflies() {
  const [on, setOn] = useState(true);
  const [hoveringPill, setHoveringPill] = useState(false);

  if (!on) {
    return (
      <button
        onClick={() => setOn(true)}
        style={{
          position: 'fixed', bottom: '22px', left: '22px', zIndex: 991,
          background: 'rgba(18,16,13,0.85)', border: '1px solid rgba(212,175,103,0.35)',
          color: '#d4af67', padding: '0.4rem 0.85rem', borderRadius: '30px',
          fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          cursor: 'pointer', backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        }}
      >
        🦋 Butterflies OFF
      </button>
    );
  }

  return (
    <>
      {/* ── Shared SVG symbol definitions (rendered once, invisible) ── */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="bf-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff6d6" />
            <stop offset="28%"  stopColor="#f1d9a2" />
            <stop offset="62%"  stopColor="#d4af67" />
            <stop offset="88%"  stopColor="#b88f3e" />
            <stop offset="100%" stopColor="#694a15" />
          </linearGradient>
          <linearGradient id="bf-vein" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.7" />
            <stop offset="60%"  stopColor="#f1d9a2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8d6b35" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="bf-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#fff1c2" />
            <stop offset="42%"  stopColor="#d4af67" />
            <stop offset="100%" stopColor="#4a350d" />
          </linearGradient>
        </defs>

        {/* Left wing + veins */}
        <g id="bf-defs-left" style={{ transformOrigin: '59px 50px' }}>
          <path d="M58 45 C50 30,25 10,10 18 C-2 24,0 45,18 55 C32 62,52 50,58 46Z"
            fill="url(#bf-gold)" stroke="#f5dfa6" strokeWidth="0.7" />
          <path d="M57 50 C45 60,22 65,20 78 C18 90,36 94,46 84 C52 76,56 60,58 52Z"
            fill="url(#bf-gold)" stroke="#f5dfa6" strokeWidth="0.7" />
          <path d="M58 45 Q35 32 15 22 M58 45 Q30 42 12 36" fill="none" stroke="url(#bf-vein)" strokeWidth="0.55"/>
        </g>

        {/* Right wing + veins */}
        <g id="bf-defs-right" style={{ transformOrigin: '61px 50px' }}>
          <path d="M62 45 C70 30,95 10,110 18 C122 24,120 45,102 55 C88 62,68 50,62 46Z"
            fill="url(#bf-gold)" stroke="#f5dfa6" strokeWidth="0.7" />
          <path d="M63 50 C75 60,98 65,100 78 C102 90,84 94,74 84 C68 76,64 60,62 52Z"
            fill="url(#bf-gold)" stroke="#f5dfa6" strokeWidth="0.7" />
          <path d="M62 45 Q85 32 105 22 M62 45 Q90 42 108 36" fill="none" stroke="url(#bf-vein)" strokeWidth="0.55"/>
        </g>

        {/* Body */}
        <g id="bf-defs-body">
          <path d="M59 36 Q52 24 45 20" fill="none" stroke="#f1d9a2" strokeWidth="0.9" strokeLinecap="round"/>
          <circle cx="45" cy="20" r="1.3" fill="#fff5d6"/>
          <path d="M61 36 Q68 24 75 20" fill="none" stroke="#f1d9a2" strokeWidth="0.9" strokeLinecap="round"/>
          <circle cx="75" cy="20" r="1.3" fill="#fff5d6"/>
          <ellipse cx="60" cy="50" rx="2.2" ry="14" fill="url(#bf-body)"/>
          <circle cx="60" cy="36" r="2.4" fill="#f1d9a2"/>
        </g>
      </svg>

      {/* ── Flight viewport layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 35,
          pointerEvents: 'none', overflow: 'hidden',
        }}
      >
        {/* Butterfly 1 — Aurelia */}
        <div className="bf-track bf-1">
          <div className="bf-bob">
            <div className="bf-wrap bf-sz-lg">
              <ButterflyShape flapDuration="0.33s" />
            </div>
          </div>
        </div>

        {/* Butterfly 2 — Zephyra */}
        <div className="bf-track bf-2">
          <div className="bf-bob" style={{ animationDelay: '-1.2s' }}>
            <div className="bf-wrap bf-sz-md">
              <ButterflyShape flapDuration="0.38s" />
            </div>
          </div>
        </div>

        {/* Butterfly 3 — Solara (hidden below 480px) */}
        <div className="bf-track bf-3 bf-hide-xs">
          <div className="bf-bob" style={{ animationDelay: '-2.4s' }}>
            <div className="bf-wrap bf-sz-sm">
              <ButterflyShape flapDuration="0.30s" />
            </div>
          </div>
        </div>

        {/* Butterfly 4 — Lumina (hidden below 768px) */}
        <div className="bf-track bf-4 bf-hide-sm">
          <div className="bf-bob" style={{ animationDelay: '-0.8s' }}>
            <div className="bf-wrap bf-sz-xs">
              <ButterflyShape flapDuration="0.27s" />
            </div>
          </div>
        </div>

        {/* Butterfly 5 — Mirage: dim distant, hidden below 1024px */}
        <div className="bf-track bf-5 bf-hide-md" style={{ opacity: 0.55 }}>
          <div className="bf-bob" style={{ animationDelay: '-3.5s' }}>
            <div className="bf-wrap bf-sz-xs" style={{ filter: 'blur(0.6px)' }}>
              <ButterflyShape flapDuration="0.42s" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Toggle Pill ── */}
      <div
        className="bf-pill"
        style={{
          position: 'fixed', bottom: '22px', left: '22px', zIndex: 991,
          opacity: hoveringPill ? 1 : 0.38, transition: 'opacity 0.3s',
          pointerEvents: 'auto',
        }}
        onMouseEnter={() => setHoveringPill(true)}
        onMouseLeave={() => setHoveringPill(false)}
      >
        <button
          onClick={() => setOn(false)}
          style={{
            background: 'rgba(18,16,13,0.85)', border: '1px solid rgba(212,175,103,0.28)',
            color: '#f1d9a2', padding: '0.38rem 0.78rem', borderRadius: '20px',
            fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.38rem',
            backdropFilter: 'blur(8px)', boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ color: '#d4af67' }}>🦋</span>
          <span>Butterflies Flying</span>
        </button>
      </div>

      {/* ── All CSS in one block ── */}
      <style>{`
        /* Wing flap — transform only, GPU compositor */
        @keyframes bfFlapL {
          to { transform: perspective(380px) rotateY(60deg) skewY(-7deg); }
        }
        @keyframes bfFlapR {
          to { transform: perspective(380px) rotateY(-60deg) skewY(7deg); }
        }

        /* Gentle bob */
        @keyframes bfBob {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-7px) rotate(2deg); }
          100% { transform: translateY(3px) rotate(-2deg); }
        }
        .bf-bob { animation: bfBob 3s ease-in-out infinite alternate; }

        /* Butterfly sizes */
        .bf-wrap { display: flex; align-items: center; justify-content: center; }
        .bf-sz-lg { width: 46px; height: 46px; box-shadow: 0 0 14px rgba(241,217,162,0.55); border-radius: 50%; }
        .bf-sz-md { width: 38px; height: 38px; box-shadow: 0 0 10px rgba(241,217,162,0.45); border-radius: 50%; }
        .bf-sz-sm { width: 32px; height: 32px; box-shadow: 0 0 8px rgba(241,217,162,0.4); border-radius: 50%; }
        .bf-sz-xs { width: 26px; height: 26px; box-shadow: 0 0 6px rgba(241,217,162,0.35); border-radius: 50%; }

        /* ---- Flight paths ---- */
        /* Butterfly 1: diagonal lower-left → upper-right */
        .bf-1 {
          position: absolute;
          animation: bfFlight1 28s cubic-bezier(0.4,0,0.2,1) infinite;
          will-change: transform;
        }
        @keyframes bfFlight1 {
          0%   { transform: translate(-60px, 85vh) rotate(25deg); opacity: 0; }
          4%   { opacity: 1; }
          25%  { transform: translate(22vw, 65vh) rotate(15deg); }
          55%  { transform: translate(58vw, 40vh) rotate(35deg); }
          80%  { transform: translate(82vw, 20vh) rotate(10deg); }
          96%  { opacity: 1; }
          100% { transform: translate(108vw, 6vh) rotate(20deg); opacity: 0; }
        }

        /* Butterfly 2: right-to-left horizon glide */
        .bf-2 {
          position: absolute;
          animation: bfFlight2 32s cubic-bezier(0.35,0,0.25,1) infinite;
          animation-delay: -5s;
          will-change: transform;
        }
        @keyframes bfFlight2 {
          0%   { transform: translate(108vw, 22vh) rotate(-110deg); opacity: 0; }
          4%   { opacity: 1; }
          30%  { transform: translate(72vw, 30vh) rotate(-95deg); }
          60%  { transform: translate(42vw, 18vh) rotate(-115deg); }
          85%  { transform: translate(14vw, 28vh) rotate(-90deg); }
          96%  { opacity: 1; }
          100% { transform: translate(-10vw, 20vh) rotate(-105deg); opacity: 0; }
        }

        /* Butterfly 3: loop across mid-screen */
        .bf-3 {
          position: absolute;
          animation: bfFlight3 36s ease-in-out infinite;
          animation-delay: -11s;
          will-change: transform;
        }
        @keyframes bfFlight3 {
          0%   { transform: translate(12vw, 105vh) rotate(-20deg); opacity: 0; }
          5%   { opacity: 1; }
          28%  { transform: translate(38vw, 68vh) rotate(15deg); }
          52%  { transform: translate(68vw, 50vh) rotate(-10deg); }
          72%  { transform: translate(48vw, 74vh) rotate(-45deg); }
          90%  { opacity: 1; }
          100% { transform: translate(12vw, 105vh) rotate(-20deg); opacity: 0; }
        }

        /* Butterfly 4: quick left-mid to right-low */
        .bf-4 {
          position: absolute;
          animation: bfFlight4 24s ease-in-out infinite;
          animation-delay: -17s;
          will-change: transform;
        }
        @keyframes bfFlight4 {
          0%   { transform: translate(-50px, 44vh) rotate(45deg); opacity: 0; }
          5%   { opacity: 1; }
          32%  { transform: translate(30vw, 57vh) rotate(30deg); }
          65%  { transform: translate(65vw, 50vh) rotate(50deg); }
          92%  { opacity: 1; }
          100% { transform: translate(108vw, 76vh) rotate(35deg); opacity: 0; }
        }

        /* Butterfly 5: slow ethereal high-sky wander */
        .bf-5 {
          position: absolute;
          animation: bfFlight5 44s linear infinite;
          animation-delay: -2s;
          will-change: transform;
        }
        @keyframes bfFlight5 {
          0%   { transform: translate(82vw, -40px) rotate(160deg); opacity: 0; }
          5%   { opacity: 0.65; }
          38%  { transform: translate(62vw, 24vh) rotate(148deg); }
          72%  { transform: translate(30vw, 12vh) rotate(168deg); }
          95%  { opacity: 0.65; }
          100% { transform: translate(-30px, 38vh) rotate(155deg); opacity: 0; }
        }

        /* ---- Responsive visibility ---- */
        @media (max-width: 480px)  { .bf-hide-xs { display: none !important; } }
        @media (max-width: 768px)  { .bf-hide-sm { display: none !important; } }
        @media (max-width: 1024px) { .bf-hide-md { display: none !important; } }

        /* Mobile pill */
        @media (max-width: 640px) {
          .bf-pill { bottom: 14px !important; left: 12px !important; }
        }
      `}</style>
    </>
  );
}
