import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/currency';

export function SearchOverlay({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCollection = p.collection.toLowerCase().includes(q);
      const matchFamily = p.fragranceFamily.toLowerCase().includes(q);
      const matchNotes = [
        ...(p.topNotes || []),
        ...(p.heartNotes || []),
        ...(p.baseNotes || [])
      ].some(note => note.toLowerCase().includes(q));

      return matchName || matchCollection || matchFamily || matchNotes;
    });

    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = ['Amber Noir', 'Velvet Oud', 'Rose Velvet', 'Saffron', 'Sandalwood', 'Vanilla Bourbon'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(9, 9, 9, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        className="container"
        style={{
          width: '100%',
          maxWidth: '960px',
          paddingTop: '2.5rem',
          paddingBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={16} color="#d4af67" />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f1d9a2' }}>
              Olfactory Search
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#a7a096',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f1d9a2')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a7a096')}
          >
            <X size={26} />
          </button>
        </div>

        {/* Search Input Field */}
        <div
          style={{
            position: 'relative',
            borderBottom: '2px solid rgba(212, 175, 103, 0.5)',
            paddingBottom: '0.8rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Search size={26} color="#d4af67" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by fragrance name, collection, or ingredient notes (e.g. Saffron, Oud, Rose)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#f5f0e7',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              letterSpacing: '0.04em'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: '#756f67', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#756f67' }}>
            Trending:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              style={{
                background: 'rgba(212, 175, 103, 0.08)',
                border: '1px solid rgba(212, 175, 103, 0.22)',
                color: '#c4bcb0',
                padding: '0.3rem 0.8rem',
                borderRadius: '2px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4af67';
                e.currentTarget.style.color = '#f1d9a2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 103, 0.22)';
                e.currentTarget.style.color = '#c4bcb0';
              }}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
          {query.trim() && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#a7a096' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#f5f0e7', marginBottom: '0.5rem' }}>
                No fragrances found matching “{query}”
              </p>
              <p style={{ fontSize: '0.82rem' }}>
                Try searching for ingredients like Amber, Oud, Vanilla, Jasmine, or Bergamot.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4af67', marginBottom: '1.2rem' }}>
                {results.length} Fragrance{results.length > 1 ? 's' : ''} Discovered
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.2rem'
                }}
              >
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '0.85rem',
                      backgroundColor: 'rgba(18, 16, 13, 0.7)',
                      border: '1px solid rgba(212, 175, 103, 0.2)',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#d4af67';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 103, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <img
                      src={product.images?.[0] || '/assets/perfumes/hero-perfume.jpg'}
                      alt={product.name}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        backgroundColor: '#0c0a08'
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: '#d4af67', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {product.fragranceFamily}
                      </div>
                      <h4 style={{ fontSize: '1.15rem', color: '#f5f0e7', fontFamily: "'Cormorant Garamond', serif", margin: '2px 0' }}>
                        {product.name}
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: '#f1d9a2', fontWeight: 600 }}>
                        {formatCurrency(product.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
