import React from 'react';
import { Sparkles, Award, ArrowRight } from 'lucide-react';

export function About({ onExploreShop }) {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '3.5rem', color: '#f5f0e7' }}>
      {/* Editorial Hero */}
      <section style={{ position: 'relative', padding: '3.5rem 0 2.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#d4af67', fontSize: '0.74rem', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            <Sparkles size={13} />
            <span>The Heritage of Luxery Shop</span>
            <Sparkles size={13} />
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, lineHeight: 1.15, marginBottom: '1.4rem' }}>
            The Architecture of Invisible Luxury
          </h1>
          <p style={{ color: '#c4bcb0', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            We believe that long after words are spoken and appearances fade, the olfactory signature remains etched into the architecture of memory.
          </p>
        </div>
      </section>

      {/* Main Campaign Imagery */}
      <div className="container" style={{ maxWidth: '1180px', marginBottom: '3.5rem' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(240px, 45vw, 480px)',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 103, 0.3)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)'
          }}
        >
          <img
            src="/assets/perfumes/perfume-collection.jpg"
            alt="Luxery Shop fragrance collection" loading="lazy" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(9, 9, 9, 0.75) 0%, transparent 60%)'
            }}
          />
        </div>
      </div>

      {/* Narrative Section 1: The Art of Perfumery */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <span style={{ fontSize: '0.74rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4af67', display: 'block', marginBottom: '0.6rem' }}>
                Olfactory Composition
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: '1.2rem' }}>
                The Art of Layered Fragrance
              </h2>
              <p style={{ color: '#a7a096', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Our fragrance stories draw on familiar perfumery inspirations: luminous rose, textured woods, warm amber, aromatic spices and the smoky depth of oud accords. Each profile lists its imagined top, heart and base notes to help you explore its character.
              </p>
              <p style={{ color: '#a7a096', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Scent preferences are personal, and performance can vary with skin, climate and application. Use the listed notes as a guide to the mood and direction of each composition rather than a guarantee of wear time.
              </p>
            </div>

            <div
              style={{
                borderRadius: '3px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 103, 0.25)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
              }}
            >
              <img
                src="/assets/perfumes/craftsmanship-detail.jpg"
                alt="Fragrance craftsmanship inspiration" loading="lazy" decoding="async"
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Bottle Architecture */}
      <section style={{ backgroundColor: '#0c0a08', padding: '3.5rem 0', borderTop: '1px solid rgba(212, 175, 103, 0.15)', borderBottom: '1px solid rgba(212, 175, 103, 0.15)', marginBottom: '3.5rem' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                borderRadius: '3px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 103, 0.25)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                order: 2
              }}
            >
              <img
                src="/assets/perfumes/amber-noir-front.jpg"
                alt="Bottle Design" loading="lazy" decoding="async"
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
            </div>

            <div style={{ order: 1 }}>
              <span style={{ fontSize: '0.74rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4af67', display: 'block', marginBottom: '0.6rem' }}>
                Vessel Architecture
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: '1.2rem' }}>
                Heavy Crystal Sculptures To Honor The Liquid
              </h2>
              <p style={{ color: '#a7a096', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                A distinctive fragrance deserves a considered presentation. Our visual direction pairs sculptural bottle silhouettes with prismatic highlights and warm amber light.
              </p>
              <p style={{ color: '#a7a096', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Brushed-gold details, dark surfaces and balanced proportions bring a gallery-like quality to the concept, turning the daily fragrance ritual into a quiet moment of indulgence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1rem' }}>
          Begin Your Olfactory Journey
        </h2>
        <p style={{ color: '#a7a096', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Explore our collection of 31 fragrance profiles.
        </p>
        <button onClick={onExploreShop} className="btn-primary" style={{ padding: '1rem 2.8rem', fontSize: '0.85rem' }}>
          <span>Discover The Boutique</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
