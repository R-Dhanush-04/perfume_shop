import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CinematicIntro({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStep(1), 300);   // Step 1: Logo fade-in
    const t2 = setTimeout(() => setStep(2), 1200);  // Step 2: Perfume bottle reveal with golden light beam
    const t3 = setTimeout(() => setStep(3), 2200);  // Step 3: Headline reveal
    const t4 = setTimeout(() => setStep(4), 3200);  // Step 4: CTA reveal & ready to enter

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: '#070605',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      color: '#f5f0e7',
      transition: 'opacity 0.8s ease'
    }}>
      {/* Background ambient lighting */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212, 175, 103, 0.15) 0%, rgba(9, 9, 9, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Skip button in upper right */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: 'clamp(1rem, 3vw, 2rem)',
          right: 'clamp(1rem, 4vw, 2.5rem)',
          background: 'transparent',
          border: '1px solid rgba(212, 175, 103, 0.3)',
          color: '#d4af67',
          padding: '0.45rem 1.1rem',
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          borderRadius: '2px',
          transition: 'all 0.2s ease',
          zIndex: 10
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#f1d9a2';
          e.currentTarget.style.color = '#f1d9a2';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(212, 175, 103, 0.3)';
          e.currentTarget.style.color = '#d4af67';
        }}
      >
        Skip Prologue
      </button>

      {/* Step 1: Wordmark */}
      <div style={{
        textAlign: 'center',
        opacity: step >= 1 ? 1 : 0,
        transform: step >= 1 ? 'translateY(0)' : 'translateY(15px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        marginBottom: '1.5rem',
        zIndex: 2
      }}>
        <div style={{
          fontSize: '0.75rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#d4af67',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <Sparkles size={12} color="#d4af67" />
          <span>Haute Parfumerie</span>
          <Sparkles size={12} color="#d4af67" />
        </div>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 300,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: "'Cormorant Garamond', serif",
          background: 'linear-gradient(135deg, #f1d9a2 0%, #d4af67 50%, #8d6b35 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          Luxery Shop
        </h1>
      </div>

      {/* Step 2: Perfume bottle with light beam sweep */}
      <div style={{
        position: 'relative',
        width: 'clamp(180px, 45vw, 260px)',
        height: 'clamp(180px, 45vw, 260px)',
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? 'scale(1)' : 'scale(0.92)',
        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        zIndex: 2
      }}>
        {/* Glow halo behind bottle */}
        <div style={{
          position: 'absolute',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 103, 0.28) 0%, rgba(9, 9, 9, 0) 70%)',
          filter: 'blur(25px)'
        }} />

        {/* Flacon image */}
        <div style={{
          position: 'relative',
          width: 'clamp(160px, 40vw, 220px)',
          height: 'clamp(160px, 40vw, 220px)',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(212, 175, 103, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 103, 0.2)'
        }}>
          <img
            src="/assets/perfumes/amber-noir-front.jpg"
            alt="Luxery Shop Perfume Flacon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Golden light beam sweeping across bottle */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 20%, rgba(241, 217, 162, 0.45) 50%, transparent 80%)',
            transform: step >= 2 ? 'translateX(180%)' : 'translateX(-180%)',
            transition: 'transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* Step 3: Headline */}
      <div style={{
        textAlign: 'center',
        maxWidth: '550px',
        padding: '0 1rem',
        opacity: step >= 3 ? 1 : 0,
        transform: step >= 3 ? 'translateY(0)' : 'translateY(15px)',
        transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        marginBottom: '2rem',
        zIndex: 2
      }}>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          color: '#f5f0e7',
          letterSpacing: '0.04em',
          marginBottom: '0.5rem'
        }}>
          “An Invisible Signature. A Lasting Impression.”
        </p>
        <p style={{
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          color: '#a7a096',
          textTransform: 'uppercase'
        }}>
          Extraordinary fragrances crafted to become part of your identity
        </p>
      </div>

      {/* Step 4: CTA Button */}
      <div style={{
        opacity: step >= 4 ? 1 : 0,
        transform: step >= 4 ? 'translateY(0)' : 'translateY(15px)',
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 2
      }}>
        <button
          onClick={onComplete}
          className="btn-primary"
          style={{
            cursor: 'pointer',
            padding: '1rem 2.5rem',
            fontSize: '0.85rem'
          }}
        >
          <span>Enter Boutique</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
