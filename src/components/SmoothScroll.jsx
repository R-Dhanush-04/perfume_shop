import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Native-first scrolling utilities.
 * The browser keeps full control of mouse wheels, trackpads, touch, keyboard,
 * scrollbar dragging, and nested scrollable panels. We only observe scroll
 * position for the progress indicator and return-to-top control.
 */
export function SmoothScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHoverTop, setIsHoverTop] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateScrollUI = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        setScrollProgress(maxScroll > 0 ? Math.min(100, (scrollY / maxScroll) * 100) : 0);
        setShowScrollTop(scrollY > 380);
        frame = 0;
      });
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI, { passive: true });
    updateScrollUI();

    return () => {
      window.removeEventListener('scroll', updateScrollUI);
      window.removeEventListener('resize', updateScrollUI);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2.5px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #8d6b35 0%, #d4af67 50%, #fff6d6 85%, #f1d9a2 100%)',
          boxShadow: '0 0 8px rgba(241,217,162,0.85), 0 0 16px rgba(212,175,103,0.4)',
          zIndex: 1006,
          transition: 'width 0.08s linear',
          pointerEvents: 'none',
          willChange: 'width',
        }}
      />

      <div
        className="sctl-wrapper"
        style={{
          position: 'fixed',
          bottom: '26px',
          right: '26px',
          zIndex: 991,
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? 'visible' : 'hidden',
          transform: showScrollTop
            ? (isHoverTop ? 'translateY(-4px) scale(1.06)' : 'translateY(0) scale(1)')
            : 'translateY(16px) scale(0.9)',
          transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1), visibility 0.3s',
          willChange: 'transform, opacity',
        }}
      >
        <button
          id="scroll-to-top-btn"
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHoverTop(true)}
          onMouseLeave={() => setIsHoverTop(false)}
          aria-label="Scroll to top"
          tabIndex={showScrollTop ? 0 : -1}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: isHoverTop ? 'rgba(28,23,18,0.95)' : 'rgba(14,12,10,0.88)',
            border: isHoverTop ? '1.5px solid #f1d9a2' : '1px solid rgba(212,175,103,0.4)',
            color: '#f1d9a2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: isHoverTop
              ? '0 6px 24px rgba(212,175,103,0.35), 0 0 14px rgba(241,217,162,0.4)'
              : '0 4px 18px rgba(0,0,0,0.6)',
            transition: 'all 0.22s ease',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '0.6rem', lineHeight: 1, color: '#d4af67', marginBottom: '-2px' }}>⚜️</span>
          <ChevronUp size={16} strokeWidth={2.2} />
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .sctl-wrapper { bottom: 14px !important; right: 12px !important; }
          .sctl-wrapper button { width: 40px !important; height: 40px !important; }
        }
      `}</style>
    </>
  );
}
