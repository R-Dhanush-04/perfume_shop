import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../utils/cartCalculations';

export function Cart({ onCheckout, onContinueShopping }) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totals,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    shippingMethod,
    setShippingMethod
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState({ error: '', success: '' });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponMsg({ error: '', success: '' });
    if (!couponCode) return;
    const res = applyCouponCode(couponCode);
    if (!res.success) {
      setCouponMsg({ error: res.message, success: '' });
    } else {
      setCouponMsg({ error: '', success: res.message });
      setCouponCode('');
    }
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '3.5rem', color: '#f5f0e7' }}>
      <div className="container" style={{ maxWidth: '1160px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, margin: 0 }}>
            Your Shopping Bag
          </h1>
          <p style={{ color: '#a7a096', fontSize: '0.88rem', margin: '0.5rem 0 0 0' }}>
            Review your selected fragrances before continuing to the simulated checkout.
          </p>
        </div>

        {cart.length === 0 ? (
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
            <ShoppingBag size={48} color="#d4af67" style={{ marginBottom: '1.2rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.6rem' }}>
              Your bag is currently vacant
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#a7a096', marginBottom: '2rem', lineHeight: 1.6 }}>
              Discover our signature fragrances, including the royal amber extractions and wild Cambodian ouds.
            </p>
            <button onClick={onContinueShopping} className="btn-primary">
              <span>Explore Boutique</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: '3rem',
              alignItems: 'start'
            }}
            className="cart-page-grid"
          >
            {/* Left: Cart Items Table */}
            <div
              style={{
                backgroundColor: 'rgba(18, 16, 13, 0.75)',
                border: '1px solid rgba(212, 175, 103, 0.22)',
                borderRadius: '3px',
                padding: '2rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d4af67', fontWeight: 600 }}>
                  Item Details
                </span>
                <button
                  onClick={clearCart}
                  style={{ background: 'none', border: 'none', color: '#756f67', fontSize: '0.74rem', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#e57373')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#756f67')}
                >
                  Clear Bag
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.itemKey}
                    style={{
                      display: 'flex',
                      gap: '1.4rem',
                      paddingBottom: '1.8rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 'clamp(72px, 20vw, 100px)',
                        height: 'clamp(72px, 20vw, 100px)',
                        flexShrink: 0,
                        objectFit: 'cover',
                        borderRadius: '2px',
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.2)'
                      }}
                    />

                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '1.3rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: 0 }}>
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.itemKey)}
                            style={{ background: 'none', border: 'none', color: '#756f67', cursor: 'pointer' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#e57373')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#756f67')}
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#d4af67', marginTop: '0.2rem' }}>
                          {item.collection} • {item.size}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        {/* Quantity Counter */}
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(212, 175, 103, 0.3)', borderRadius: '2px' }}>
                          <button
                            onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                            style={{ background: 'none', border: 'none', color: '#f5f0e7', padding: '0.35rem 0.7rem', cursor: 'pointer' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.84rem', fontWeight: 600, padding: '0 0.6rem' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', color: '#f5f0e7', padding: '0.35rem 0.7rem', cursor: 'pointer' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div style={{ fontSize: '1.15rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#f1d9a2' }}>
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={onContinueShopping} style={{ background: 'none', border: 'none', color: '#d4af67', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  ← Continue Exploring Fragrances
                </button>
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div
              style={{
                backgroundColor: 'rgba(18, 16, 13, 0.85)',
                border: '1px solid rgba(212, 175, 103, 0.3)',
                borderRadius: '3px',
                padding: '2.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.4rem'
              }}
            >
              <h3 style={{ fontSize: '1.35rem', fontFamily: "'Cormorant Garamond', serif", margin: 0, paddingBottom: '0.8rem', borderBottom: '1px solid rgba(212, 175, 103, 0.2)' }}>
                Order Summary
              </h3>

              {/* Privilege Code Input */}
              <div>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a7a096', display: 'block', marginBottom: '0.5rem' }}>
                  Have a VIP Privilege Code?
                </span>
                {appliedCoupon ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', backgroundColor: 'rgba(212, 175, 103, 0.1)', border: '1px dashed #d4af67', borderRadius: '2px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#f1d9a2' }}>
                      Privilege <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)
                    </span>
                    <button onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#e57373', fontSize: '0.72rem', cursor: 'pointer' }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.4rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. LUXURY10 or GOLD20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{
                        flexGrow: 1,
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        color: '#f5f0e7',
                        padding: '0.6rem 0.8rem',
                        fontSize: '0.76rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                    <button type="submit" className="btn-outline-gold" style={{ padding: '0.6rem 1rem', fontSize: '0.72rem' }}>
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg.error && <p style={{ color: '#e57373', fontSize: '0.72rem', marginTop: '0.4rem' }}>{couponMsg.error}</p>}
                {couponMsg.success && <p style={{ color: '#f1d9a2', fontSize: '0.72rem', marginTop: '0.4rem' }}>{couponMsg.success}</p>}
              </div>

              {/* Delivery Speed Selector */}
              <div>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a7a096', display: 'block', marginBottom: '0.5rem' }}>
                  Shipping Method:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.8rem',
                      backgroundColor: shippingMethod === 'standard' ? 'rgba(212, 175, 103, 0.12)' : 'rgba(9, 9, 9, 0.6)',
                      border: shippingMethod === 'standard' ? '1px solid #d4af67' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        style={{ accentColor: '#d4af67' }}
                      />
                      <span>Standard Luxury Courier (3-5 Days)</span>
                    </div>
                    <span style={{ color: '#f1d9a2', fontWeight: 600 }}>
                      {totals.subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : '₹199'}
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.8rem',
                      backgroundColor: shippingMethod === 'white-glove' ? 'rgba(212, 175, 103, 0.12)' : 'rgba(9, 9, 9, 0.6)',
                      border: shippingMethod === 'white-glove' ? '1px solid #d4af67' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'white-glove'}
                        onChange={() => setShippingMethod('white-glove')}
                        style={{ accentColor: '#d4af67' }}
                      />
                      <span>Express White-Glove Hand Delivery (24-48h)</span>
                    </div>
                    <span style={{ color: '#f1d9a2', fontWeight: 600 }}>₹499</span>
                  </label>
                </div>
              </div>

              {/* Price Line Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.84rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a7a096' }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#f5f0e7' }}>{formatCurrency(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4af67' }}>
                    <span>Privilege Courtesy</span>
                    <span>-{formatCurrency(totals.discount)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a7a096' }}>
                  <span>Shipping & Handling</span>
                  <span>{totals.shipping === 0 ? 'Complimentary' : formatCurrency(totals.shipping)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#756f67', fontSize: '0.74rem' }}>
                  <span>Estimated GST (18% inclusive)</span>
                  <span>{formatCurrency(totals.gst)}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.3rem',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    color: '#f1d9a2',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid rgba(212, 175, 103, 0.25)',
                    marginTop: '0.4rem'
                  }}
                >
                  <span>Grand Total</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={onCheckout}
                className="btn-primary"
                style={{ width: '100%', padding: '1.05rem 0', fontSize: '0.84rem' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.72rem', color: '#756f67' }}>
                <ShieldCheck size={14} color="#d4af67" />
                <span>Simulated Encrypted Payment Gateway</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
