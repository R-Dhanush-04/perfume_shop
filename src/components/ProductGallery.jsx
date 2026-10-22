import React, { useState, useEffect } from 'react';
import { ZoomIn, RotateCcw, Sparkles } from 'lucide-react';

export function ProductGallery({ product }) {
  const images = product?.images || ['/assets/perfumes/hero-perfume.jpg'];
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [failedImages, setFailedImages] = useState({});
  const usableImages = images.filter((src) => src && !failedImages[src]);
  const activeImage = usableImages[Math.min(activeIdx, Math.max(0, usableImages.length - 1))] || images[0];

  // Reset the gallery when a different product is opened.
  useEffect(() => {
    setActiveIdx(0);
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
    setFailedImages({});
  }, [product?.id]);

  // Angle scrubber for multi-angle bottles
  const hasMultipleAngles = usableImages.length >= 3;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const getLabelForIndex = (index) => {
    const labels = ['Front Flacon', 'Side Perspective', 'Rear Profile', 'Cap & Collar Detail', 'Bespoke Coffret'];
    return labels[index] || `Perspective ${index + 1}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* Main Large Visual Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          minHeight: '280px',
          maxHeight: 'min(72vw, 680px)',
          backgroundColor: '#0c0a08',
          borderRadius: '4px',
          border: '1px solid rgba(212, 175, 103, 0.25)',
          overflow: 'hidden',
          cursor: isZoomed ? 'zoom-out' : 'zoom-in',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7)'
        }}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {/* The Image (Standard or Zoomed) */}
        <img
          src={activeImage}
          onError={() => setFailedImages((prev) => ({ ...prev, [activeImage]: true }))}
          alt={`${product.name} - ${getLabelForIndex(activeIdx)}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: isZoomed ? 'none' : 'transform 0.4s ease, opacity 0.3s ease',
            transform: isZoomed ? 'scale(1.6)' : 'scale(1)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
          }}
        />

        {/* Ambient golden lighting vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(9, 9, 9, 0.5) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Zoom Hint Icon */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(9, 9, 9, 0.85)',
            border: '1px solid rgba(212, 175, 103, 0.3)',
            color: '#f1d9a2',
            padding: '0.4rem 0.8rem',
            borderRadius: '2px',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            backdropFilter: 'blur(4px)',
            pointerEvents: 'none'
          }}
        >
          <ZoomIn size={13} />
          <span>{isZoomed ? 'Click to Reset' : 'Hover to Inspect'}</span>
        </div>

        {/* Perspective Label */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(9, 9, 9, 0.75)',
            border: '1px solid rgba(212, 175, 103, 0.2)',
            color: '#d4af67',
            padding: '0.3rem 0.75rem',
            borderRadius: '2px',
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(4px)'
          }}
        >
          {getLabelForIndex(activeIdx)}
        </div>
      </div>

      {/* Multi-Angle Scrubber Slider (for products with 3+ angles) */}
      {hasMultipleAngles && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.8rem',
            padding: '0.6rem 1rem',
            backgroundColor: 'rgba(18, 16, 13, 0.65)',
            border: '1px solid rgba(212, 175, 103, 0.2)',
            borderRadius: '2px'
          }}
        >
          <RotateCcw size={14} color="#d4af67" />
          <span style={{ fontSize: '0.7rem', color: '#f1d9a2', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Multi-Angle View:
          </span>
          <input
            type="range"
            min="0"
            max={Math.max(0, usableImages.length - 1)}
            value={activeIdx}
            onChange={(e) => setActiveIdx(parseInt(e.target.value, 10))}
            style={{
              flexGrow: 1,
              accentColor: '#d4af67',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '0.72rem', color: '#a7a096' }}>
            {Math.min(activeIdx + 1, usableImages.length)} / {usableImages.length}
          </span>
        </div>
      )}

      {/* Thumbnails Row */}
      <div
        style={{
          display: 'flex',
          gap: '0.8rem',
          overflowX: 'auto',
          paddingBottom: '0.4rem'
        }}
      >
        {usableImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            style={{
              flex: '0 0 76px',
              height: '76px',
              backgroundColor: '#0c0a08',
              borderRadius: '2px',
              border: activeIdx === idx
                ? '2px solid #d4af67'
                : '1px solid rgba(212, 175, 103, 0.2)',
              padding: 0,
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.2s ease',
              boxShadow: activeIdx === idx ? '0 0 12px rgba(212, 175, 103, 0.35)' : 'none'
            }}
          >
            <img
              src={img}
              onError={() => setFailedImages((prev) => ({ ...prev, [img]: true }))}
              alt={`${product.name} product view ${idx + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: activeIdx === idx ? 1 : 0.65,
                transition: 'opacity 0.2s ease'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
