import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';

export function FragranceFinder({ onSelectProduct }) {
  const { addToCart } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    family: '',
    occasion: '',
    intensity: '',
    style: '',
    budget: ''
  });

  const stepsConfig = [
    {
      step: 1,
      title: 'What olfactory family calls to your soul?',
      subtitle: 'The primary character and mood of your fragrance',
      key: 'family',
      options: [
        { label: 'Oud & Woods', value: 'Oud', desc: 'Regal agarwood, smoke, frankincense' },
        { label: 'Amber & Resins', value: 'Amber', desc: 'Warm vanilla, golden resins, honeyed spice' },
        { label: 'Floral & Petals', value: 'Floral', desc: 'Centifolia roses, jasmine, precious blossoms' },
        { label: 'Fresh & Citrus', value: 'Fresh Citrus', desc: 'Amalfi lemons, solar aldehydes, neroli' },
        { label: 'Clean Skin Musk', value: 'Musk', desc: 'Silken ambrette, white iris, intimate cashmeran' },
        { label: 'Dark Gourmand', value: 'Gourmand', desc: 'Bourbon vanilla, roasted almond, cocoa' }
      ]
    },
    {
      step: 2,
      title: 'For which occasions will you wear this signature?',
      subtitle: 'Where your scent identity will be experienced',
      key: 'occasion',
      options: [
        { label: 'Black Tie Gala & Soirée', value: 'Gala', desc: 'Grand entrances, high-society events' },
        { label: 'Intimate Rendezvous', value: 'Romantic', desc: 'Sensual evenings, close encounters' },
        { label: 'Daily Signature & Boardroom', value: 'Executive', desc: 'Refined authority, effortless presence' },
        { label: 'Sunlit Celebration', value: 'Celebration', desc: 'Garden weddings, seaside escapes' }
      ]
    },
    {
      step: 3,
      title: 'What intensity & projection do you command?',
      subtitle: 'How prominently your aura radiates in a room',
      key: 'intensity',
      options: [
        { label: 'Monumental & Enveloping', value: 'Intense', desc: 'Leaves a powerful, unforgettable trail for 14+ hours' },
        { label: 'Balanced & Elegant', value: 'Moderate', desc: 'Sophisticated sillage for 10-14 hours' },
        { label: 'Intimate Second-Skin', value: 'Subtle', desc: 'A whispering aura noticed only by those who come close' }
      ]
    },
    {
      step: 4,
      title: 'Which artistic aesthetic describes your style?',
      subtitle: 'The bespoke persona of your wardrobe',
      key: 'style',
      options: [
        { label: 'Classic Aristocratic', value: 'Classic Aristocratic', desc: 'Heritage luxury, bespoke velvet, royal heritage' },
        { label: 'Sensual & Dark Nocturne', value: 'Sensual & Dark', desc: 'Mystery, black truffle, smoked leather' },
        { label: 'Opulent Golden Radiance', value: 'Opulent Golden', desc: 'Solar brilliance, amber crystals, rich resins' },
        { label: 'Modern Avant-Garde', value: 'Modern Avant-Garde', desc: 'Architectural minimalism, rare abstractions' }
      ]
    },
    {
      step: 5,
      title: 'Select your preferred investment tier',
      subtitle: 'Indicative fragrance acquisition budget',
      key: 'budget',
      options: [
        { label: 'Accessible Haute Luxury', value: 'low', desc: 'Under ₹4,000' },
        { label: 'Prestige Signature', value: 'mid', desc: '₹4,000 — ₹5,500' },
        { label: 'Imperial Collector Edition', value: 'high', desc: 'Above ₹5,500' }
      ]
    }
  ];

  const handleSelectOption = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ family: '', occasion: '', intensity: '', style: '', budget: '' });
  };

  // Recommendation logic
  const getRecommendations = () => {
    return PRODUCTS.map(p => {
      let score = 0;
      if (answers.family && (p.fragranceFamily.includes(answers.family) || answers.family.includes(p.fragranceFamily))) score += 40;
      if (answers.intensity && p.intensity === answers.intensity) score += 25;
      if (answers.style && p.style === answers.style) score += 20;

      if (answers.budget === 'low' && p.price < 4000) score += 15;
      if (answers.budget === 'mid' && p.price >= 4000 && p.price <= 5500) score += 15;
      if (answers.budget === 'high' && p.price > 5500) score += 15;

      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.product);
  };

  const currentStepConfig = stepsConfig.find(s => s.step === step);
  const recommendations = step === 5 && answers.budget ? getRecommendations() : [];

  return (
    <div
      style={{
        backgroundColor: '#0c0a08',
        border: '1px solid rgba(212, 175, 103, 0.28)',
        borderRadius: '4px',
        padding: '3rem 2.5rem',
        maxWidth: '960px',
        margin: '0 auto',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#d4af67', fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          <Sparkles size={13} />
          <span>Bespoke Olfactory Diagnostic</span>
          <Sparkles size={13} />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#f5f0e7', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
          The Fragrance Finder
        </h2>
        <p style={{ color: '#a7a096', fontSize: '0.88rem', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
          Answer five intuitive questions to reveal the artisanal fragrance formulated to become your authentic signature.
        </p>
      </div>

      {/* Progress Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
        {stepsConfig.map((s) => (
          <div
            key={s.step}
            style={{
              width: '45px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: s.step <= step ? '#d4af67' : 'rgba(255, 255, 255, 0.1)',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Step Content */}
      {step <= 5 && !answers.budget && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d4af67' }}>
              Step {currentStepConfig.step} of 5
            </span>
            <h3 style={{ fontSize: '1.45rem', color: '#f5f0e7', marginTop: '0.4rem', fontFamily: "'Cormorant Garamond', serif" }}>
              {currentStepConfig.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#a7a096' }}>
              {currentStepConfig.subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1.2rem'
            }}
          >
            {currentStepConfig.options.map((opt) => {
              const isSelected = answers[currentStepConfig.key] === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelectOption(currentStepConfig.key, opt.value)}
                  style={{
                    backgroundColor: isSelected ? 'rgba(212, 175, 103, 0.18)' : 'rgba(18, 16, 13, 0.75)',
                    border: isSelected ? '1px solid #d4af67' : '1px solid rgba(212, 175, 103, 0.22)',
                    borderRadius: '3px',
                    padding: '1.4rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 103, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 103, 0.22)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '1.15rem', color: isSelected ? '#f1d9a2' : '#f5f0e7', fontFamily: "'Cormorant Garamond', serif" }}>
                      {opt.label}
                    </h4>
                    {isSelected && <Check size={16} color="#d4af67" />}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: '#a7a096', margin: 0, lineHeight: 1.4 }}>
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Section */}
      {step === 5 && answers.budget && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4af67' }}>
              ✨ Diagnostic Complete
            </span>
            <h3 style={{ fontSize: '1.7rem', color: '#f5f0e7', marginTop: '0.4rem', fontFamily: "'Cormorant Garamond', serif" }}>
              Your Tailored Fragrance Matches
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#a7a096' }}>
              Curated exclusively from our catalog based on your desired olfactory notes and intensity.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            {recommendations.map((perfume, idx) => (
              <div
                key={perfume.id}
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.85)',
                  border: '1px solid rgba(212, 175, 103, 0.35)',
                  borderRadius: '3px',
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.65rem', backgroundColor: '#d4af67', color: '#090909', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '2px' }}>
                  {idx === 0 ? 'Top Match (98%)' : idx === 1 ? 'Alternative (92%)' : 'Collector Choice (88%)'}
                </div>

                <div>
                  <img
                    src={perfume.images?.[0] || '/assets/perfumes/hero-perfume.jpg'}
                    alt={perfume.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '2px', marginBottom: '1rem', backgroundColor: '#090909' }}
                  />
                  <div style={{ fontSize: '0.7rem', color: '#d4af67', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {perfume.fragranceFamily} • {perfume.collection}
                  </div>
                  <h4 style={{ fontSize: '1.35rem', color: '#f5f0e7', fontFamily: "'Cormorant Garamond', serif", margin: '0.3rem 0' }}>
                    {perfume.name}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#a7a096', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                    {perfume.shortDescription}
                  </p>
                  <div style={{ fontSize: '1.05rem', color: '#f1d9a2', fontWeight: 600, marginBottom: '1rem' }}>
                    {formatCurrency(perfume.price)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    onClick={() => addToCart(perfume, '100ml', 1)}
                    className="btn-primary"
                    style={{ flexGrow: 1, padding: '0.7rem 0', fontSize: '0.72rem' }}
                  >
                    <ShoppingBag size={13} />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onSelectProduct(perfume)}
                    className="btn-secondary"
                    style={{ padding: '0.7rem 0.9rem', fontSize: '0.72rem' }}
                    title="View details"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleReset}
              className="btn-outline-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <RotateCcw size={13} />
              <span>Retake Fragrance Diagnostic</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
