import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export function Hero({ onDiscover, onBestSellers }) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'min(78vh, 760px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        paddingTop: '56px'
      }}
    >
      {/* Background Hero Image with subtle parallax */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${offsetY}px)`,
          transition: 'transform 0.1s linear',
          zIndex: 1
        }}
      >
        <img
          src="/assets/perfumes/hero-perfume.jpg"
          alt="Luxery Shop Perfume Masterpiece"
          style={{
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            filter: 'brightness(0.62) contrast(1.08)'
          }}
        />

        {/* Ambient Dark Gradient Vignette & Gold Atmospheric Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to bottom, rgba(9, 9, 9, 0.4) 0%, rgba(9, 9, 9, 0.2) 40%, rgba(9, 9, 9, 0.85) 85%, #090909 100%),
              radial-gradient(circle at 50% 45%, rgba(212, 175, 103, 0.12) 0%, rgba(9, 9, 9, 0.6) 75%)
            `
          }}
        />
      </div>

      {/* Editorial Content Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '920px',
          paddingTop: '3rem',
          paddingBottom: '5rem'
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.4rem',
            background: 'rgba(18, 16, 13, 0.65)',
            border: '1px solid rgba(212, 175, 103, 0.28)',
            borderRadius: '2px',
            marginBottom: '1.8rem',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Sparkles size={13} color="#d4af67" />
          <span
            style={{
              fontSize: '0.74rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#f1d9a2',
              fontWeight: 500
            }}
          >
            The Art of Scent
          </span>
          <Sparkles size={13} color="#d4af67" />
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.8rem)',
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1.12,
            marginBottom: '1.4rem',
            color: '#f5f0e7'
          }}
        >
          An Invisible Signature.
          <br />
          <span
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #f1d9a2 0%, #d4af67 50%, #8d6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            A Lasting Impression.
          </span>
        </h1>

        {/* Supporting Subtext */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.03em',
            color: '#c4bcb0',
            maxWidth: '680px',
            margin: '0 auto 2.6rem auto',
            lineHeight: 1.6
          }}
        >
          Discover extraordinary fragrances crafted to become part of your identity. Handcrafted extractions of rare amber, noble oud, and French petals.
        </p>

        {/* Call-to-Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={onDiscover}
            className="btn-primary"
            style={{
              fontSize: '0.82rem',
              padding: '1.05rem 2.4rem'
            }}
          >
            <span>Discover the Collection</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onBestSellers}
            className="btn-secondary"
            style={{
              fontSize: '0.82rem',
              padding: '1.05rem 2.4rem'
            }}
          >
            <span>Explore Best Sellers</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#a7a096',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: 'smooth'
          });
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#d4af67'
          }}
        >
          Scroll to Explore
        </span>
        <ChevronDown size={18} color="#d4af67" style={{ animation: 'bounce 2s infinite' }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(6px); }
          60% { transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
}
