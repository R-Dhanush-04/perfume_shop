import React, { useState, useEffect } from 'react';
import { ProductGallery } from '../components/ProductGallery';
import { ProductCard } from '../components/ProductCard';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Sparkles, Star, Scale, Check, ChevronDown, ChevronUp } from 'lucide-react';

export function ProductDetails({ product, onSelectProduct, onBuyNow }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useWishlist();

  // Size selection state
  const defaultSize = product.sizes?.[0]?.size || '100ml';
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);

  // Accordion tabs
  const [activeTab, setActiveTab] = useState('notes'); // notes, delivery, ingredients

  // Update selected size when product changes
  useEffect(() => {
    setSelectedSize(product.sizes?.[0]?.size || '100ml');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Current price calculation based on size
  const sizeObj = product.sizes?.find(s => s.size === selectedSize) || { price: product.price };
  const currentPrice = sizeObj.price;

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Related products from the same fragrance family or collection
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && (p.fragranceFamily === product.fragranceFamily || p.category === product.category)).slice(0, 3);

  // Handle Buy Now
  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    onBuyNow();
  };

  return (
    <div className="product-details-page" style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '3.5rem', color: '#f5f0e7' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Breadcrumb Navigation */}
        <div className="product-breadcrumb" style={{ fontSize: '0.74rem', color: '#756f67', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', overflowWrap: 'anywhere' }}>
          <span>Haute Parfumerie</span>
          <span>/</span>
          <span style={{ color: '#d4af67' }}>{product.collection}</span>
          <span>/</span>
          <span style={{ color: '#f5f0e7' }}>{product.name}</span>
        </div>

        {/* Top Product Hero: Left Gallery, Right Details */}
        <div className="product-details-grid" style={{ marginBottom: '3.5rem' }}>
          {/* Left Column: Multi-Angle Interactive Gallery */}
          <div className="product-details-gallery-column">
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Title, Scent Profile, Sizes, Add to Bag */}
          <div className="product-details-info-column">
            {/* Collection & Stock Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.74rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4af67', fontWeight: 600 }}>
                {product.collection}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(212, 175, 103, 0.12)',
                  border: '1px solid rgba(212, 175, 103, 0.3)',
                  color: '#f1d9a2'
                }}
              >
                {product.stockStatus}
              </span>
            </div>

            {/* Product Name */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                lineHeight: 1.12,
                color: '#f5f0e7',
                marginBottom: '0.8rem'
              }}
            >
              {product.name}
            </h1>

            {/* Demo Star Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', color: '#d4af67' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#d4af67" />
                ))}
              </div>
              <span style={{ color: '#f1d9a2', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: '#756f67' }}>(illustrative demo rating)</span>
            </div>

            {/* Price Display */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1.8rem' }}>
              <span style={{ fontSize: '2rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#f1d9a2' }}>
                {formatCurrency(currentPrice)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: '#756f67', textDecoration: 'line-through' }}>
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <span style={{ fontSize: '0.74rem', color: '#a7a096' }}>
                (Displayed price · demo storefront)
              </span>
            </div>

            {/* Storytelling Description */}
            <p style={{ color: '#c4bcb0', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {product.fullDescription}
            </p>

            {/* Size Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.8rem' }}>
                <span style={{ color: '#d4af67', fontWeight: 600 }}>Select Flacon Size:</span>
                <span style={{ color: '#a7a096' }}>Standard Spray Flacon</span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {product.sizes?.map((sz) => {
                  const isSelected = selectedSize === sz.size;
                  return (
                    <button
                      key={sz.size}
                      onClick={() => setSelectedSize(sz.size)}
                      style={{
                        backgroundColor: isSelected ? '#d4af67' : 'rgba(18, 16, 13, 0.8)',
                        color: isSelected ? '#090909' : '#f5f0e7',
                        border: isSelected ? '1px solid #d4af67' : '1px solid rgba(212, 175, 103, 0.28)',
                        padding: '0.7rem 1.4rem',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.2rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em' }}>{sz.size}</span>
                      <span style={{ fontSize: '0.72rem', opacity: isSelected ? 0.9 : 0.7 }}>{formatCurrency(sz.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add to Bag & Buy Now */}
            <div className="product-purchase-actions" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {/* Quantity */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(212, 175, 103, 0.35)',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(18, 16, 13, 0.8)'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', color: '#f5f0e7', padding: '0.8rem 1rem', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, padding: '0 0.5rem', minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', color: '#f5f0e7', padding: '0.8rem 1rem', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="btn-primary"
                style={{ flexGrow: 1, padding: '1rem 2rem', fontSize: '0.82rem' }}
              >
                <ShoppingBag size={16} />
                <span>Add to Shopping Bag</span>
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="btn-secondary"
                style={{ padding: '1rem 1.8rem', fontSize: '0.82rem' }}
              >
                <span>Acquire Now</span>
              </button>
            </div>

            {/* Wishlist & Compare Quick Actions */}
            <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '2.5rem', paddingTop: '0.5rem' }}>
              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isFavorited ? '#d4af67' : '#a7a096',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
              >
                <Heart size={15} fill={isFavorited ? '#d4af67' : 'none'} />
                <span>{isFavorited ? 'Curated in Wishlist' : 'Add to Curated Wishlist'}</span>
              </button>

              <button
                onClick={() => toggleCompare(product)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isCompared ? '#d4af67' : '#a7a096',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
              >
                <Scale size={15} />
                <span>{isCompared ? 'In Comparison' : 'Compare Fragrance'}</span>
              </button>
            </div>

            {/* Key Indicative Attributes (Longevity & Sillage) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                backgroundColor: 'rgba(18, 16, 13, 0.75)',
                border: '1px solid rgba(212, 175, 103, 0.2)',
                borderRadius: '3px',
                padding: '1.2rem',
                marginBottom: '2rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d4af67', display: 'block', marginBottom: '0.2rem' }}>
                  Longevity (Indicative)
                </span>
                <span style={{ fontSize: '0.86rem', color: '#f5f0e7', fontWeight: 500 }}>
                  {product.longevity}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d4af67', display: 'block', marginBottom: '0.2rem' }}>
                  Sillage & Projection
                </span>
                <span style={{ fontSize: '0.86rem', color: '#f5f0e7', fontWeight: 500 }}>
                  {product.sillage}
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem', color: '#c4bcb0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Truck size={16} color="#d4af67" />
                <span>Complimentary White-Glove express courier dispatch within 24 hours.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sparkles size={16} color="#d4af67" />
                <span>Sample-vial availability is not configured in this storefront demo.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Olfactory Pyramid & Ingredients Deep Dive Tabs */}
        <div
          style={{
            backgroundColor: '#0c0a08',
            border: '1px solid rgba(212, 175, 103, 0.25)',
            borderRadius: '4px',
            padding: 'clamp(1rem, 3vw, 2rem)',
            marginBottom: '2rem'
          }}
        >
          {/* Tab Headers */}
          <div className="tab-scroll-container" style={{ borderBottom: '1px solid rgba(212, 175, 103, 0.2)', paddingBottom: '0.65rem', marginBottom: '1.25rem' }}>
            <button
              onClick={() => setActiveTab('notes')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'notes' ? '#f1d9a2' : '#756f67',
                fontSize: '0.86rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: activeTab === 'notes' ? 600 : 400,
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Olfactory Pyramid
              {activeTab === 'notes' && <span style={{ position: 'absolute', bottom: '-1rem', left: 0, width: '100%', height: '2px', backgroundColor: '#d4af67' }} />}
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'delivery' ? '#f1d9a2' : '#756f67',
                fontSize: '0.86rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: activeTab === 'delivery' ? 600 : 400,
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Delivery & White-Glove Service
              {activeTab === 'delivery' && <span style={{ position: 'absolute', bottom: '-1rem', left: 0, width: '100%', height: '2px', backgroundColor: '#d4af67' }} />}
            </button>

            <button
              onClick={() => setActiveTab('ingredients')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'ingredients' ? '#f1d9a2' : '#756f67',
                fontSize: '0.86rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: activeTab === 'ingredients' ? 600 : 400,
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Ingredient Profile (Demo)
              {activeTab === 'ingredients' && <span style={{ position: 'absolute', bottom: '-1rem', left: 0, width: '100%', height: '2px', backgroundColor: '#d4af67' }} />}
            </button>
          </div>

          {/* Tab 1: Olfactory Pyramid */}
          {activeTab === 'notes' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '1rem'
              }}
            >
              {/* Top Notes */}
              <div
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.75)',
                  border: '1px solid rgba(212, 175, 103, 0.2)',
                  borderRadius: '3px',
                  padding: '1.8rem'
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#d4af67', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  The Opening (0 — 30 min)
                </span>
                <h4 style={{ fontSize: '1.4rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0.4rem 0 1rem 0' }}>
                  Top Notes
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: '#c4bcb0' }}>
                  {product.topNotes?.map((note, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#d4af67' }}>✦</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Heart Notes */}
              <div
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.75)',
                  border: '1px solid rgba(212, 175, 103, 0.2)',
                  borderRadius: '3px',
                  padding: '1.8rem'
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#d4af67', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  The Soul (30 min — 6 hrs)
                </span>
                <h4 style={{ fontSize: '1.4rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0.4rem 0 1rem 0' }}>
                  Heart Notes
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: '#c4bcb0' }}>
                  {product.heartNotes?.map((note, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#d4af67' }}>✦</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Base Notes */}
              <div
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.75)',
                  border: '1px solid rgba(212, 175, 103, 0.2)',
                  borderRadius: '3px',
                  padding: '1.8rem'
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#d4af67', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  The Memory (6 — 18+ hrs)
                </span>
                <h4 style={{ fontSize: '1.4rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0.4rem 0 1rem 0' }}>
                  Base Notes
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: '#c4bcb0' }}>
                  {product.baseNotes?.map((note, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#d4af67' }}>✦</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Delivery & White-Glove Service */}
          {activeTab === 'delivery' && (
            <div style={{ maxWidth: '780px', lineHeight: 1.7, fontSize: '0.88rem', color: '#c4bcb0' }}>
              <h4 style={{ fontSize: '1.3rem', color: '#f1d9a2', fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.8rem' }}>
                Delivery & Dispatch (Demo)
              </h4>
              <p style={{ marginBottom: '1.2rem' }}>
                The storefront displays an illustrative delivery threshold for demonstration only. No courier, live shipping estimate or shipment tracking is connected in this version.
              </p>
              <h4 style={{ fontSize: '1.3rem', color: '#f1d9a2', fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.8rem' }}>
                Samples & Returns (Demo)
              </h4>
              <p>
                Sample-vial availability and return/refund policies have not been configured. Confirm these details with the seller before treating this concept storefront as a live shop.
              </p>
            </div>
          )}

          {/* Tab 3: Ingredients */}
          {activeTab === 'ingredients' && (
            <div style={{ maxWidth: '780px', lineHeight: 1.7, fontSize: '0.85rem', color: '#c4bcb0' }}>
              <h4 style={{ fontSize: '1.3rem', color: '#f1d9a2', fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.8rem' }}>
                Illustrative Ingredient Profile
              </h4>
              <p style={{ marginBottom: '1.2rem' }}>
                The ingredient text below is sample content for this storefront demo, not a verified formula or certification claim. A live product page must use the supplier-approved ingredient declaration and current compliance documentation.
              </p>
              <div
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.8)',
                  border: '1px solid rgba(212, 175, 103, 0.2)',
                  borderRadius: '2px',
                  padding: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  color: '#a7a096'
                }}
              >
                {product.ingredients}
              </div>
            </div>
          )}
        </div>

        {/* Related Fragrances Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4af67' }}>
              Complementary Signatures
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontFamily: "'Cormorant Garamond', serif", margin: '0.4rem 0 0 0' }}>
              Harmonizing Extractions
            </h2>
          </div>

          <div className="product-grid-responsive">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
