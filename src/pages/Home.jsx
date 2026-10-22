import React, { useEffect, useRef, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { FragranceFinder } from '../components/FragranceFinder';
import { PRODUCTS, COLLECTIONS } from '../data/products';
import { Sparkles, ArrowRight, Award, Compass, Gift, ChevronRight, Star, Flame, Zap } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

function AnimatedStat({ target, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 18);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#f1d9a2', fontWeight: 600, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7368', marginTop: '0.4rem' }}>{label}</div>
    </div>
  );
}

export function Home({ onSelectProduct, setActivePage }) {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 6);
  const bestSellers = PRODUCTS.filter(p => p.bestSeller).slice(0, 6);
  const newArrivals = PRODUCTS.filter(p => p.newArrival).slice(0, 6);
  const discoveryCoffret = PRODUCTS.find(p => p.id === 'discovery-trio-coffret') || PRODUCTS[0];

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'transparent', color: '#f5f0e7' }}>
      {/* 1. Cinematic Hero Section */}
      <Hero
        onDiscover={() => navigateTo('shop')}
        onBestSellers={() => {
          const el = document.getElementById('best-sellers-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Animated Stats Bar */}
      <div
        style={{
          backgroundColor: 'rgba(12, 10, 8, 0.78)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(212, 175, 103, 0.2)',
          borderBottom: '1px solid rgba(212, 175, 103, 0.2)',
          padding: '1.75rem 0'
        }}
      >
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.25rem',
            alignItems: 'center'
          }}>
            <AnimatedStat target={31} suffix="" label="Fragrance Profiles" />
            <AnimatedStat target={3} suffix="" label="Note Layers · Top / Heart / Base" />
            <AnimatedStat target={3} suffix="+" label="Bottle Views Per Fragrance" />
            <AnimatedStat target={5} suffix="" label="Curated Collections" />
            <AnimatedStat target={12} suffix="" label="Best Seller Picks" />
          </div>
        </div>
      </div>

      {/* 3. Gold Luxury Marquee */}
      <div
        style={{
          backgroundColor: 'rgba(18, 16, 13, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(212, 175, 103, 0.18)',
          borderBottom: '1px solid rgba(212, 175, 103, 0.18)',
          padding: '0.8rem 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3rem',
            animation: 'marquee 25s linear infinite',
            fontSize: '0.74rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#f1d9a2'
          }}
        >
          <span>⚜️ A Modern Luxury Fragrance Ritual</span>
          <span>•</span>
          <span>Sculptural Flacons · Champagne-Gold Details</span>
          <span>•</span>
          <span>Explore Top · Heart · Base Notes</span>
          <span>•</span>
          <span>Amber Resins, Oud Accords & Rose-Inspired Notes</span>
          <span>•</span>
          <span>⚜️ A Modern Luxury Fragrance Ritual</span>
          <span>•</span>
          <span>Sculptural Flacons · Champagne-Gold Details</span>
        </div>
      </div>

      {/* 4. Featured Masterpieces — 6 products */}
      <section style={{ padding: '3.25rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#d4af67', fontSize: '0.74rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Sparkles size={13} />
              <span>Curated Selection</span>
              <Sparkles size={13} />
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
              The Masterpiece Editions
            </h2>
            <p style={{ color: '#a7a096', fontSize: '0.88rem', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
              Six featured fragrance concepts, each with its own character, note pyramid and visual identity.
            </p>
          </div>

          <div className="product-grid-responsive">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => navigateTo('shop')}
              className="btn-outline-gold"
              style={{ padding: '0.9rem 2.2rem', fontSize: '0.78rem' }}
            >
              <span>Explore All {PRODUCTS.length - 1} Fragrances</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. The Olfactory Heritage Editorial Banner */}
      <section
        style={{
          position: 'relative',
          padding: '4rem 0',
          backgroundColor: 'rgba(12, 10, 8, 0.78)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(212, 175, 103, 0.18)',
          borderBottom: '1px solid rgba(212, 175, 103, 0.18)',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Visual */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '85%',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 103, 0.3)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)'
                }}
              >
                <img
                  src="/assets/perfumes/craftsmanship-detail.jpg"
                  alt="Perfume-making inspiration" loading="lazy" decoding="async"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Inset badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  right: '1.5rem',
                  backgroundColor: 'rgba(9, 9, 9, 0.94)',
                  border: '1px solid #d4af67',
                  padding: '1rem 1.6rem',
                  borderRadius: '2px',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#f1d9a2', fontWeight: 600 }}>
                  Scent, Composed
                </div>
                <div style={{ fontSize: '0.65rem', color: '#a7a096', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  A Study in Fragrance
                </div>
              </div>
            </div>

            {/* Story */}
            <div>
              <div style={{ color: '#d4af67', fontSize: '0.74rem', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                Atelier Philosophy
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15, marginBottom: '1.4rem' }}>
                Where Time & Alchemy Dissolve Into Pure Emotion
              </h2>
              <p style={{ color: '#c4bcb0', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                At Luxery Shop, a perfume is more than a fragrance; it is an invisible signature. Each collection explores a distinct meeting of woods, florals, resins, spice and modern perfumery.
              </p>
              <p style={{ color: '#a7a096', fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '2.2rem' }}>
                From deep amber accords to luminous florals, each fragrance profile is presented with its own notes, character and visual story so you can discover a scent that feels distinctly yours.
              </p>
              <button
                onClick={() => navigateTo('about')}
                className="btn-primary"
                style={{ fontSize: '0.78rem' }}
              >
                <span>Read Our Maison Story</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers Section — 6 products */}
      <section id="best-sellers-section" style={{ padding: '3.25rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ color: '#d4af67', fontSize: '0.74rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame size={13} />
                <span>Global Favorites</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", margin: 0 }}>
                Most Coveted Signatures
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              style={{ background: 'none', border: 'none', color: '#f1d9a2', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>View All Best Sellers</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="product-grid-responsive">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. New Arrivals Section — 6 products */}
      <section style={{ padding: '3.25rem 0', backgroundColor: 'rgba(12, 10, 8, 0.78)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '1px solid rgba(212, 175, 103, 0.15)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ color: '#d4af67', fontSize: '0.74rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={13} />
                <span>Fresh From The Atelier</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", margin: 0 }}>
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              style={{ background: 'none', border: 'none', color: '#f1d9a2', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Shop New Arrivals</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="product-grid-responsive">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Gender & Lifestyle Collections Grid */}
      <section style={{ padding: '3rem 0', backgroundColor: 'transparent', borderTop: '1px solid rgba(212, 175, 103, 0.15)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif" }}>
              Tailored For Your Presence
            </h2>
            <p style={{ color: '#a7a096', fontSize: '0.88rem', margin: '0.4rem auto 0 auto' }}>
              Explore dedicated olfactory directions crafted for distinctive moments.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2rem'
            }}
          >
            {/* Men */}
            <div
              onClick={() => navigateTo('shop-men')}
              style={{
                position: 'relative',
                height: '460px',
                borderRadius: '3px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(212, 175, 103, 0.25)'
              }}
            >
              <img
                src="/assets/perfumes/perfume-lifestyle-men.jpg"
                alt="Men's Luxury Perfumes" loading="lazy" decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9, 9, 9, 0.92) 0%, rgba(9, 9, 9, 0.2) 60%, transparent 100%)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <div style={{ color: '#d4af67', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Commanding & Noble
                </div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0.3rem 0 0.8rem 0' }}>
                  Men’s High Parfumerie
                </h3>
                <span style={{ color: '#f1d9a2', fontSize: '0.76rem', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Explore Collection</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>

            {/* Women */}
            <div
              onClick={() => navigateTo('shop-women')}
              style={{
                position: 'relative',
                height: '460px',
                borderRadius: '3px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(212, 175, 103, 0.25)'
              }}
            >
              <img
                src="/assets/perfumes/perfume-lifestyle-women.jpg"
                alt="Women's Haute Parfumerie" loading="lazy" decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9, 9, 9, 0.92) 0%, rgba(9, 9, 9, 0.2) 60%, transparent 100%)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <div style={{ color: '#d4af67', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Hypnotic & Sublime
                </div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0.3rem 0 0.8rem 0' }}>
                  Women’s Fine Fragrances
                </h3>
                <span style={{ color: '#f1d9a2', fontSize: '0.76rem', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Explore Collection</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>

            {/* Unisex */}
            <div
              onClick={() => navigateTo('shop-unisex')}
              style={{
                position: 'relative',
                height: '460px',
                borderRadius: '3px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(212, 175, 103, 0.25)'
              }}
            >
              <img
                src="/assets/perfumes/unisex-fragrance-campaign.jpg"
                alt="Unisex Artisanal Fragrances" loading="lazy" decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9, 9, 9, 0.92) 0%, rgba(9, 9, 9, 0.2) 60%, transparent 100%)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <div style={{ color: '#d4af67', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Timeless & Pure
                </div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0.3rem 0 0.8rem 0' }}>
                  Unisex Extractions
                </h3>
                <span style={{ color: '#f1d9a2', fontSize: '0.76rem', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Explore Collection</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Fragrance Finder Section */}
      <section style={{ padding: '3.25rem 0' }}>
        <div className="container">
          <FragranceFinder onSelectProduct={onSelectProduct} />
        </div>
      </section>

      {/* 8. Discovery Coffret & Gifting Section */}
      <section
        style={{
          position: 'relative',
          padding: '3.25rem 0',
          backgroundColor: 'rgba(12, 10, 8, 0.78)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(212, 175, 103, 0.18)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#d4af67', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                <Gift size={13} />
                <span>Bespoke Gifting</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15, marginBottom: '1.2rem' }}>
                The Royal Discovery Coffret
              </h2>
              <p style={{ color: '#c4bcb0', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Housed in a velvet-lined jewelry case with hand-gilded corners, this coffret contains three 15ml flacons of our most celebrated creations: Amber Noir, Velvet Oud, and Rose Velvet.
              </p>
              <div style={{ fontSize: '1.4rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#f1d9a2', marginBottom: '1.8rem' }}>
                {formatCurrency(discoveryCoffret.price)}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onSelectProduct(discoveryCoffret)}
                  className="btn-primary"
                  style={{ fontSize: '0.78rem' }}
                >
                  <span>Acquire Coffret</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => navigateTo('shop')}
                  className="btn-secondary"
                  style={{ fontSize: '0.78rem' }}
                >
                  <span>View All Gift Sets</span>
                </button>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '80%',
                borderRadius: '3px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 103, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)'
              }}
            >
              <img
                src="/assets/perfumes/perfume-gift-box.jpg"
                alt="Luxery Shop Perfume Gift Coffret" loading="lazy" decoding="async"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
