import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { FREE_SHIPPING_THRESHOLD } from '../utils/cartCalculations';

export function CartDrawer({ onCheckout, onViewCart }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totals,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const progressPercent = Math.min(100, Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(9, 9, 9, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      {/* Slide-out drawer panel */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#0e0c0a',
          borderLeft: '1px solid rgba(212, 175, 103, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.85)',
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.4rem 1.8rem',
            borderBottom: '1px solid rgba(212, 175, 103, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#d4af67" />
            <h2
              style={{
                fontSize: '1.35rem',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.08em',
                color: '#f5f0e7',
                margin: 0
              }}
            >
              Your Shopping Bag
            </h2>
            <span
              style={{
                fontSize: '0.72rem',
                backgroundColor: 'rgba(212, 175, 103, 0.15)',
                color: '#f1d9a2',
                padding: '0.15rem 0.5rem',
                borderRadius: '2px',
                fontWeight: 600
              }}
            >
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#a7a096',
              cursor: 'pointer',
              padding: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f1d9a2')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a7a096')}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div
          style={{
            padding: '0.85rem 1.8rem',
            backgroundColor: 'rgba(18, 16, 13, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '0.4rem' }}>
            <span style={{ color: '#c4bcb0' }}>
              {totals.freeShippingRemaining === 0 ? (
                <span style={{ color: '#f1d9a2', fontWeight: 600 }}>
                  ✨ You have unlocked Complimentary Express Delivery!
                </span>
              ) : (
                <>Add <strong style={{ color: '#f1d9a2' }}>{formatCurrency(totals.freeShippingRemaining)}</strong> more for Complimentary Delivery</>
              )}
            </span>
            <span style={{ color: '#d4af67', fontWeight: 600 }}>{progressPercent}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #d4af67, #f1d9a2)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1.2rem 1.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#a7a096',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(212, 175, 103, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingBag size={26} color="#d4af67" />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', color: '#f5f0e7' }}>
                Your shopping bag is empty
              </p>
              <p style={{ fontSize: '0.8rem', maxWidth: '280px', lineHeight: 1.5 }}>
                Explore our curated perfume collection and discover your signature fragrance.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onViewCart();
                }}
                className="btn-outline-gold"
                style={{ marginTop: '0.5rem' }}
              >
                Browse All Fragrances
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.itemKey}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1.2rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#0c0a08',
                    borderRadius: '2px',
                    border: '1px solid rgba(212, 175, 103, 0.2)',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info & Quantity */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        style={{
                          fontSize: '1.05rem',
                          fontFamily: "'Cormorant Garamond', serif",
                          color: '#f5f0e7',
                          margin: 0
                        }}
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#756f67',
                          cursor: 'pointer',
                          padding: '0.2rem'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#e57373')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#756f67')}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#d4af67', marginTop: '2px' }}>
                      {item.size} • Eau de Parfum
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem' }}>
                    {/* Quantity controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid rgba(212, 175, 103, 0.3)',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(9, 9, 9, 0.6)'
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f5f0e7',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.78rem', padding: '0 0.5rem', fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f5f0e7',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f1d9a2' }}>
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Totals */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.4rem 1.8rem',
              backgroundColor: '#0c0a08',
              borderTop: '1px solid rgba(212, 175, 103, 0.22)'
            }}
          >
            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: '1rem' }}>
              {appliedCoupon ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.45rem 0.75rem',
                    backgroundColor: 'rgba(212, 175, 103, 0.1)',
                    border: '1px dashed #d4af67',
                    borderRadius: '2px',
                    fontSize: '0.74rem'
                  }}
                >
                  <span style={{ color: '#f1d9a2' }}>
                    🎁 Code <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.discountPercent}%)
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#e57373',
                      cursor: 'pointer',
                      fontSize: '0.7rem'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ position: 'relative', flexGrow: 1 }}>
                    <input
                      type="text"
                      placeholder="Privilege Code (e.g. LUXURY10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(18, 16, 13, 0.9)',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        color: '#f5f0e7',
                        padding: '0.55rem 0.8rem',
                        fontSize: '0.75rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-outline-gold"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.72rem' }}
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p style={{ color: '#e57373', fontSize: '0.68rem', marginTop: '0.35rem' }}>
                  {couponError}
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a7a096' }}>
                <span>Subtotal</span>
                <span style={{ color: '#f5f0e7' }}>{formatCurrency(totals.subtotal)}</span>
              </div>

              {totals.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4af67' }}>
                  <span>Privilege Savings</span>
                  <span>-{formatCurrency(totals.discount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a7a096' }}>
                <span>Shipping</span>
                <span>{totals.shipping === 0 ? 'Complimentary' : formatCurrency(totals.shipping)}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#f1d9a2',
                  paddingTop: '0.6rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span>Estimated Total</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>
            </div>

            {/* Checkout & View Cart Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '0.95rem 0' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onViewCart();
                }}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.75rem 0', fontSize: '0.75rem' }}
              >
                <span>View Full Bag</span>
              </button>
            </div>

            {/* Trust disclaimer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.68rem',
                color: '#756f67',
                marginTop: '1rem'
              }}
            >
              <ShieldCheck size={14} color="#d4af67" />
              <span>Authentic Artisanal Fragrances • Secure Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
