import React from 'react';
import { X, Scale, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export function CompareDrawer({ onSelectProduct }) {
  const { compareList, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useWishlist();
  const { addToCart } = useCart();

  if (!isCompareOpen || compareList.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2200,
        backgroundColor: 'rgba(9, 9, 9, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={() => setIsCompareOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '90vh',
          backgroundColor: '#0e0c0a',
          border: '1px solid rgba(212, 175, 103, 0.35)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.2rem 1.8rem',
            borderBottom: '1px solid rgba(212, 175, 103, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Scale size={20} color="#d4af67" />
            <h3 style={{ fontSize: '1.35rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: 0 }}>
              Fragrance Olfactory Comparison ({compareList.length} of 3)
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={clearCompare}
              style={{ background: 'none', border: 'none', color: '#a7a096', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              style={{ background: 'none', border: 'none', color: '#f5f0e7', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'auto', padding: '1.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `180px repeat(${compareList.length}, minmax(240px, 1fr))`,
              gap: '1rem',
              alignItems: 'start'
            }}
          >
            {/* Field Labels Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', paddingTop: '150px' }}>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Price (100ml)</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Fragrance Family</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Collection</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Top Notes</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Heart Notes</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Base Notes</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Longevity</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Sillage</div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#d4af67', textTransform: 'uppercase' }}>Available Sizes</div>
            </div>

            {/* Products Columns */}
            {compareList.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.7)',
                  border: '1px solid rgba(212, 175, 103, 0.25)',
                  borderRadius: '3px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem'
                }}
              >
                {/* Header card with image & remove */}
                <div style={{ position: 'relative', textAlign: 'center' }}>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'none',
                      border: 'none',
                      color: '#e57373',
                      cursor: 'pointer'
                    }}
                    title="Remove from comparison"
                  >
                    <Trash2 size={15} />
                  </button>

                  <img
                    src={product.images?.[0] || '/assets/perfumes/hero-perfume.jpg'}
                    alt={product.name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '2px', margin: '0 auto 0.6rem auto', backgroundColor: '#090909' }}
                  />

                  <h4 style={{ fontSize: '1.25rem', color: '#f5f0e7', fontFamily: "'Cormorant Garamond', serif", margin: '0 0 0.5rem 0' }}>
                    {product.name}
                  </h4>

                  <button
                    onClick={() => addToCart(product, '100ml', 1)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.55rem 0', fontSize: '0.7rem' }}
                  >
                    <ShoppingBag size={12} />
                    <span>Add to Bag</span>
                  </button>
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f1d9a2' }}>
                  {formatCurrency(product.price)}
                </div>

                <div style={{ fontSize: '0.8rem', color: '#f5f0e7' }}>
                  {product.fragranceFamily}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#a7a096' }}>
                  {product.collection}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#c4bcb0', lineHeight: 1.4 }}>
                  {product.topNotes?.join(', ') || '—'}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#c4bcb0', lineHeight: 1.4 }}>
                  {product.heartNotes?.join(', ') || '—'}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#c4bcb0', lineHeight: 1.4 }}>
                  {product.baseNotes?.join(', ') || '—'}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#f5f0e7' }}>
                  {product.longevity}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#f5f0e7' }}>
                  {product.sillage}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#d4af67' }}>
                  {product.sizes?.map(s => s.size).join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
