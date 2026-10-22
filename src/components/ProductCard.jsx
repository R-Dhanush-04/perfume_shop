import React, { useState, useRef, useCallback } from 'react';
import { Heart, ShoppingBag, Eye, Star, Scale, Zap, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export function ProductCard({ product, onViewDetails }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });
  const cardRef = useRef(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/assets/perfumes/hero-perfume.jpg'];

  const currentImage = images[selectedImgIdx] || images[0];

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const x = (relX - 0.5) * 16;
    const y = (relY - 0.5) * -16;
    setTilt({
      x,
      y,
      shineX: Math.round(relX * 100),
      shineY: Math.round(relY * 100),
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (images.length > 1 && selectedImgIdx === 0) {
      setSelectedImgIdx(1); // Cinematic switch to side angle on first hover
    }
  }, [images.length, selectedImgIdx]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setSelectedImgIdx(0); // Return to front angle
    setTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
  }, []);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    if (adding) return;
    setAdding(true);
    addToCart(product, product.sizes?.[0]?.size || '100ml', 1);
    setTimeout(() => setAdding(false), 1200);
  }, [adding, addToCart, product]);

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const cardTransform = isHovered
    ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-8px) scale(1.02)`
    : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)';

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        backgroundColor: '#0c0a08',
        border: isHovered
          ? '1px solid rgba(212, 175, 103, 0.65)'
          : '1px solid rgba(212, 175, 103, 0.14)',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.35s ease, border-color 0.3s ease',
        transform: cardTransform,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered
          ? '0 28px 65px rgba(0, 0, 0, 0.85), 0 0 45px rgba(212, 175, 103, 0.16), inset 0 1px 0 rgba(212, 175, 103, 0.2)'
          : '0 8px 24px rgba(0, 0, 0, 0.55)',
        cursor: 'default',
        willChange: isHovered ? 'transform' : 'auto',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular dynamic light reflection following cursor */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isHovered
          ? `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(241,217,162,0.12) 0%, transparent 55%)`
          : 'transparent',
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
        zIndex: 10,
        borderRadius: '4px'
      }} />

      {/* Badges: top-left */}
      <div style={{
        position: 'absolute', top: '0.85rem', left: '0.85rem',
        zIndex: 12, display: 'flex', flexDirection: 'column', gap: '0.35rem'
      }}>
        {product.badge && (
          <span style={{
            backgroundColor: 'rgba(9,9,9,0.92)',
            border: '1px solid rgba(212,175,103,0.75)',
            color: '#f1d9a2',
            fontSize: '0.62rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '0.22rem 0.65rem', borderRadius: '2px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
          }}>
            <Sparkles size={10} color="#d4af67" />
            {product.badge}
          </span>
        )}
        {product.newArrival && (
          <span style={{
            backgroundColor: 'rgba(180,95,0,0.92)',
            border: '1px solid rgba(255,170,60,0.6)',
            color: '#ffe5b0',
            fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '0.2rem 0.55rem', borderRadius: '2px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            display: 'inline-block'
          }}>
            NEW
          </span>
        )}
        {discountPercent > 0 && (
          <span style={{
            backgroundColor: 'rgba(130,25,25,0.92)',
            border: '1px solid rgba(230,80,80,0.5)',
            color: '#ffd0d0',
            fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.14em',
            padding: '0.2rem 0.5rem', borderRadius: '2px',
            backdropFilter: 'blur(8px)',
            display: 'inline-block'
          }}>
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Action buttons: top-right */}
      <div style={{
        position: 'absolute', top: '0.85rem', right: '0.85rem',
        zIndex: 12, display: 'flex', flexDirection: 'column', gap: '0.45rem',
        opacity: isHovered ? 1 : 0.75,
        transition: 'opacity 0.25s ease'
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: isFavorited ? 'rgba(212,175,103,0.25)' : 'rgba(12,10,8,0.85)',
            border: isFavorited ? '1px solid #d4af67' : '1px solid rgba(212,175,103,0.25)',
            color: isFavorited ? '#d4af67' : '#d0ccc6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            backdropFilter: 'blur(10px)',
            transform: isFavorited ? 'scale(1.1)' : 'scale(1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
          }}
        >
          <Heart size={15} fill={isFavorited ? '#d4af67' : 'none'} strokeWidth={isFavorited ? 0 : 1.8} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
          title={isCompared ? 'Remove from Comparison' : 'Compare'}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: isCompared ? 'rgba(212,175,103,0.25)' : 'rgba(12,10,8,0.85)',
            border: isCompared ? '1px solid #d4af67' : '1px solid rgba(212,175,103,0.25)',
            color: isCompared ? '#d4af67' : '#a7a096',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.25s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
          }}
        >
          <Scale size={14} />
        </button>
      </div>

      {/* Image Stage with 3D crystal depth effect */}
      <div
        onClick={() => onViewDetails(product)}
        style={{
          position: 'relative', width: '100%', paddingTop: '105%',
          cursor: 'pointer', overflow: 'hidden',
          backgroundColor: '#090806',
        }}
      >
        {/* Ambient gold glow pedestal under bottle */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isHovered
            ? 'radial-gradient(ellipse at 50% 68%, rgba(212,175,103,0.14) 0%, rgba(212,175,103,0.02) 50%, transparent 75%)'
            : 'radial-gradient(ellipse at 50% 68%, rgba(212,175,103,0.06) 0%, transparent 65%)',
          transition: 'background 0.4s ease',
          zIndex: 1, pointerEvents: 'none'
        }} />

        {/* Loading skeleton */}
        {!imgLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #0c0a08 25%, #181512 50%, #0c0a08 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s infinite',
            zIndex: 2
          }} />
        )}

        {/* Real 3D Flacon Image — razor sharp and hardware-accelerated */}
        <img
          key={currentImage}
          src={currentImage}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className="crystal-sharp"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            opacity: imgLoaded ? 1 : 0,
            zIndex: 3
          }}
          loading="lazy"
        />

        {/* Interactive 3D Angle Selector Pills */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute', top: '0.85rem', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 14,
              display: 'flex', gap: '0.3rem',
              backgroundColor: 'rgba(9, 8, 6, 0.85)',
              border: '1px solid rgba(212, 175, 103, 0.3)',
              borderRadius: '20px',
              padding: '0.18rem 0.4rem',
              backdropFilter: 'blur(8px)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
              pointerEvents: isHovered ? 'auto' : 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {images.slice(0, 4).map((img, idx) => {
              const labels = ['Front', 'Side', 'Back', 'Detail'];
              const isSelected = selectedImgIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImgIdx(idx);
                  }}
                  onMouseEnter={() => setSelectedImgIdx(idx)}
                  title={`View ${labels[idx]} angle`}
                  style={{
                    backgroundColor: isSelected ? '#d4af67' : 'transparent',
                    color: isSelected ? '#090806' : '#c0b9af',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.12rem 0.42rem',
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {labels[idx]}
                </button>
              );
            })}
          </div>
        )}

        {/* Bottom gradient for seamless text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(12,10,8,0.96) 0%, rgba(12,10,8,0.4) 30%, transparent 60%)',
          zIndex: 5, pointerEvents: 'none'
        }} />

        {/* Quick View Pill — slides up on hover */}
        <div style={{
          position: 'absolute', bottom: '0.85rem', left: '50%',
          transform: isHovered
            ? 'translateX(-50%) translateY(0) scale(1)'
            : 'translateX(-50%) translateY(14px) scale(0.92)',
          opacity: isHovered ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 6
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            style={{
              backgroundColor: 'rgba(212,175,103,0.18)',
              border: '1px solid rgba(212,175,103,0.85)',
              color: '#f1d9a2', fontSize: '0.66rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '0.45rem 1.05rem', borderRadius: '2px',
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              cursor: 'pointer', backdropFilter: 'blur(12px)',
              whiteSpace: 'nowrap', fontWeight: 600,
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
          >
            <Eye size={13} />
            <span>Inspect 3D Flacon</span>
          </button>
        </div>

        {/* Stock / Longevity pill */}
        <div style={{
          position: 'absolute', bottom: '0.85rem', left: '0.85rem',
          zIndex: 6, display: 'flex', gap: '0.35rem'
        }}>
          {product.longevity && (
            <span style={{
              backgroundColor: 'rgba(9,9,9,0.85)',
              border: '1px solid rgba(212,175,103,0.3)',
              color: '#d4af67', fontSize: '0.58rem',
              letterSpacing: '0.1em', fontWeight: 600,
              padding: '0.15rem 0.45rem', borderRadius: '2px',
              backdropFilter: 'blur(6px)'
            }}>
              {product.longevity.split('(')[0].trim()}
            </span>
          )}
        </div>
      </div>

      {/* Product Info Panel */}
      <div style={{
        padding: '1.2rem 1.25rem 1.35rem 1.25rem',
        display: 'flex', flexDirection: 'column', flexGrow: 1,
        justifyContent: 'space-between', gap: '0.75rem',
        background: 'linear-gradient(to bottom, #0c0a08 0%, #100e0b 100%)'
      }}>
        {/* Top: Category & Family tags */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase'
        }}>
          <span style={{ color: '#d4af67', fontWeight: 600 }}>{product.fragranceFamily}</span>
          <span style={{
            color: '#8d8579',
            backgroundColor: 'rgba(212,175,103,0.06)',
            border: '1px solid rgba(212,175,103,0.12)',
            padding: '0.12rem 0.45rem', borderRadius: '2px',
            textTransform: 'uppercase', fontSize: '0.62rem'
          }}>{product.category}</span>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onViewDetails(product)}
          style={{
            fontSize: '1.28rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: isHovered ? '#ffffff' : '#f5f0e7',
            fontWeight: 600, cursor: 'pointer',
            margin: '0',
            letterSpacing: '0.04em', lineHeight: 1.2,
            transition: 'color 0.25s ease',
            textShadow: isHovered ? '0 0 20px rgba(212,175,103,0.25)' : 'none'
          }}
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p style={{
          fontSize: '0.82rem', color: '#c6beb2', lineHeight: 1.7,
          margin: '0.15rem 0 0.35rem', minHeight: 0,
          display: 'block', overflow: 'visible', overflowWrap: 'anywhere'
        }}>
          {product.shortDescription}
        </p>

        {/* Olfactory Notes Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.62rem', color: '#d4af67', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Opening notes</span>
          <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.3rem',
          margin: '0'
        }}>
          {product.topNotes?.slice(0, 3).map((note, i) => (
            <span key={i} style={{
              fontSize: '0.66rem',
              backgroundColor: 'rgba(212,175,103,0.06)',
              border: '1px solid rgba(212,175,103,0.18)',
              color: '#bcb4a7', padding: '0.12rem 0.45rem', borderRadius: '2px',
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}>
              {note}
            </span>
          ))}
          </div>
          {product.heartNotes?.length > 0 && <p style={{ margin: '0.2rem 0 0', fontSize: '0.72rem', lineHeight: 1.55, color: '#9f9689' }}><strong style={{ color: '#c8ad78', fontWeight: 600 }}>Heart:</strong> {product.heartNotes.slice(0, 3).join(' · ')}</p>}
          {product.baseNotes?.length > 0 && <p style={{ margin: 0, fontSize: '0.72rem', lineHeight: 1.55, color: '#9f9689' }}><strong style={{ color: '#c8ad78', fontWeight: 600 }}>Base:</strong> {product.baseNotes.slice(0, 3).join(' · ')}</p>}
        </div>

        {/* Elegant Gold Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(212,175,103,0.22), transparent)',
          margin: '0.1rem 0'
        }} />

        {/* Price & Rating */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{
              fontSize: '1.22rem',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, color: '#f1d9a2',
              letterSpacing: '0.02em'
            }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '0.8rem', color: '#655e56',
                textDecoration: 'line-through', fontFamily: "'Montserrat', sans-serif"
              }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            fontSize: '0.72rem', color: '#d4af67'
          }} title={`Illustrative demo rating: ${product.rating}/5; not customer reviews`}>
            <Star size={11} fill="#d4af67" strokeWidth={0} />
            <span style={{ fontWeight: 700 }}>{product.rating}</span>
            <span style={{ color: '#8c8170', fontSize: '0.6rem' }}>demo</span>
          </div>
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={handleAddToCart}
          style={{
            width: '100%',
            backgroundColor: adding ? 'rgba(212,175,103,0.95)' : 'transparent',
            border: adding ? '1px solid #d4af67' : '1px solid rgba(212,175,103,0.4)',
            color: adding ? '#090806' : '#d4af67',
            fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '0.78rem 0', borderRadius: '2px',
            cursor: adding ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: adding ? 'scale(0.98)' : isHovered ? 'scale(1.01)' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            if (!adding) {
              e.currentTarget.style.backgroundColor = '#d4af67';
              e.currentTarget.style.color = '#090806';
              e.currentTarget.style.boxShadow = '0 4px 22px rgba(212,175,103,0.38)';
            }
          }}
          onMouseLeave={(e) => {
            if (!adding) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#d4af67';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {adding ? (
            <>
              <Zap size={13} fill="#090806" />
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={13} />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
