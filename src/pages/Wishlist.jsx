import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export function Wishlist({ onSelectProduct, onExplore }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, showToast } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach(p => {
      addToCart(p, p.sizes?.[0]?.size || '100ml', 1);
    });
    showToast('All curated flacons moved to your shopping bag!');
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '3.5rem', color: '#f5f0e7' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', paddingTop: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#d4af67', fontSize: '0.74rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Heart size={14} fill="#d4af67" />
            <span>Private Collection Vault</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, margin: 0 }}>
            Your Curated Wishlist
          </h1>
          <p style={{ color: '#a7a096', fontSize: '0.9rem', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
            Saved perfumes and personal olfactory favorites reserved for future acquisition.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '6rem 2rem',
              backgroundColor: 'rgba(18, 16, 13, 0.65)',
              border: '1px dashed rgba(212, 175, 103, 0.25)',
              borderRadius: '4px',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <Heart size={44} color="#d4af67" style={{ marginBottom: '1.2rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.6rem' }}>
              Your wishlist is awaiting inspiration
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#a7a096', marginBottom: '2rem', lineHeight: 1.6 }}>
              Click the gold heart icon on any perfume card to reserve your coveted flacons here.
            </p>
            <button onClick={onExplore} className="btn-primary">
              <span>Browse All Fragrances</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#a7a096' }}>
                <strong style={{ color: '#f1d9a2' }}>{wishlist.length}</strong> Masterpiece{wishlist.length > 1 ? 's' : ''} Curated
              </span>
              <button
                onClick={handleMoveAllToCart}
                className="btn-outline-gold"
                style={{ fontSize: '0.74rem', padding: '0.6rem 1.2rem' }}
              >
                <ShoppingBag size={13} />
                <span>Move All to Bag</span>
              </button>
            </div>

            <div className="product-grid-responsive">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
