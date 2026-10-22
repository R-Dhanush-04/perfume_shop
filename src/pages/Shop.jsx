import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, FRAGRANCE_FAMILIES } from '../data/products';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X, Sparkles, RefreshCcw } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export function Shop({ onSelectProduct, initialCategory = 'all' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFamily, setSelectedFamily] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedSize, setSelectedSize] = useState('all');
  const [gridCols, setGridCols] = useState(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Fragrances' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'gifts', label: 'Gift Sets' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Fragrance family filter
      if (selectedFamily !== 'All' && !p.fragranceFamily.toLowerCase().includes(selectedFamily.toLowerCase())) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      // In stock
      if (inStockOnly && p.stockStatus === 'Few Units Left') {
        return true;
      }
      // Size filter
      if (selectedSize !== 'all') {
        const hasSize = p.sizes?.some(s => s.size === selectedSize);
        if (!hasSize) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'new') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedFamily, maxPrice, sortBy, inStockOnly, selectedSize]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFamily('All');
    setMaxPrice(10000);
    setSortBy('featured');
    setInStockOnly(false);
    setSelectedSize('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedFamily !== 'All' || maxPrice < 10000 || selectedSize !== 'all' || inStockOnly;

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '3.5rem' }}>
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#d4af67', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Sparkles size={12} />
            <span>Haute Parfumerie Vault</span>
            <Sparkles size={12} />
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: '#f5f0e7', margin: 0 }}>
            The Fragrance Collection
          </h1>
          <p style={{ color: '#a7a096', fontSize: '0.9rem', maxWidth: '600px', margin: '0.6rem auto 0 auto' }}>
            Explore 31 fragrance profiles, from deep oud and warm amber to luminous florals and modern musks.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  backgroundColor: isActive ? '#d4af67' : 'rgba(18, 16, 13, 0.75)',
                  color: isActive ? '#090909' : '#f5f0e7',
                  border: isActive ? '1px solid #d4af67' : '1px solid rgba(212, 175, 103, 0.22)',
                  fontSize: '0.76rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Controls Toolbar: Filter Toggle, Sort Dropdown, Grid Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.4rem',
            backgroundColor: 'rgba(18, 16, 13, 0.8)',
            border: '1px solid rgba(212, 175, 103, 0.2)',
            borderRadius: '3px',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Left: Product count & active filter hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#c4bcb0' }}>
              Showing <strong style={{ color: '#f1d9a2' }}>{filteredProducts.length}</strong> of {PRODUCTS.length} perfumes
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#d4af67',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <RefreshCcw size={11} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Right: Sorting & Layout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#a7a096', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: '#0c0a08',
                  border: '1px solid rgba(212, 175, 103, 0.3)',
                  color: '#f5f0e7',
                  fontSize: '0.76rem',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '2px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
                <option value="new">New Arrivals</option>
              </select>
            </div>

            {/* Grid Toggle (Desktop) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} className="grid-toggle-desktop">
              <button
                onClick={() => setGridCols(3)}
                style={{
                  background: gridCols === 3 ? 'rgba(212, 175, 103, 0.2)' : 'transparent',
                  border: '1px solid rgba(212, 175, 103, 0.25)',
                  color: gridCols === 3 ? '#d4af67' : '#a7a096',
                  padding: '0.35rem',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
                title="3 Columns"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                style={{
                  background: gridCols === 4 ? 'rgba(212, 175, 103, 0.2)' : 'transparent',
                  border: '1px solid rgba(212, 175, 103, 0.25)',
                  color: gridCols === 4 ? '#d4af67' : '#a7a096',
                  padding: '0.35rem',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
                title="4 Columns"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Product Grid */}
        <div className="shop-layout">
          {/* Filters Sidebar */}
          <aside
            style={{
              backgroundColor: 'rgba(18, 16, 13, 0.75)',
              border: '1px solid rgba(212, 175, 103, 0.2)',
              borderRadius: '3px',
              padding: '1.8rem 1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            {/* Fragrance Family Filter */}
            <div>
              <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d4af67', marginBottom: '1rem' }}>
                Fragrance Family
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {FRAGRANCE_FAMILIES.map((family) => {
                  const isChecked = selectedFamily === family;
                  return (
                    <button
                      key={family}
                      onClick={() => setSelectedFamily(family)}
                      style={{
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        color: isChecked ? '#f1d9a2' : '#a7a096',
                        fontWeight: isChecked ? 600 : 400,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        padding: '0.25rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <span>{family}</span>
                      {isChecked && <span style={{ color: '#d4af67' }}>•</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d4af67', margin: 0 }}>
                  Max Price
                </h4>
                <span style={{ fontSize: '0.82rem', color: '#f1d9a2', fontWeight: 600 }}>
                  {formatCurrency(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#d4af67', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#756f67', marginTop: '0.3rem' }}>
                <span>₹3,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Available Size Filter */}
            <div>
              <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d4af67', marginBottom: '0.8rem' }}>
                Flacon Size
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['all', '50ml', '100ml', '200ml'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      background: selectedSize === sz ? '#d4af67' : 'rgba(9, 9, 9, 0.7)',
                      color: selectedSize === sz ? '#090909' : '#c4bcb0',
                      border: '1px solid rgba(212, 175, 103, 0.25)',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.74rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontWeight: selectedSize === sz ? 600 : 400
                    }}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Stage */}
          <div>
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '5rem 2rem',
                  backgroundColor: 'rgba(18, 16, 13, 0.5)',
                  borderRadius: '3px',
                  border: '1px dashed rgba(212, 175, 103, 0.25)'
                }}
              >
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#f5f0e7', marginBottom: '0.5rem' }}>
                  No perfumes match your selected filters
                </p>
                <p style={{ fontSize: '0.85rem', color: '#a7a096', marginBottom: '1.5rem' }}>
                  Adjust your price slider or select another fragrance family.
                </p>
                <button onClick={resetFilters} className="btn-primary" style={{ fontSize: '0.75rem' }}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="product-grid-responsive">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid-toggle-desktop {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
