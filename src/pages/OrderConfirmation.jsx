import React from 'react';
import { CheckCircle2, Sparkles, Package, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export function OrderConfirmation({ order, onContinueShopping }) {
  if (!order) {
    return (
      <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '140px', textAlign: 'center', color: '#f5f0e7' }}>
        <h2>No recent order found</h2>
        <button onClick={onContinueShopping} className="btn-primary" style={{ marginTop: '1rem' }}>
          Return to Boutique
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '110px', paddingBottom: '3.5rem', color: '#f5f0e7' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Success Card */}
        <div
          style={{
            backgroundColor: '#0c0a08',
            border: '1px solid #d4af67',
            borderRadius: '4px',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 103, 0.15)',
            marginBottom: '3rem'
          }}
        >
          {/* Animated Gold Checkmark */}
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 103, 0.12)',
              border: '2px solid #d4af67',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <CheckCircle2 size={42} color="#f1d9a2" />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#d4af67', fontSize: '0.74rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            <Sparkles size={13} />
            <span>Acquisition Confirmed</span>
            <Sparkles size={13} />
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: '#f5f0e7', margin: '0 0 0.8rem 0' }}>
            Thank You, {order.deliveryAddress?.fullName || 'Collector'}
          </h1>

          <p style={{ color: '#c4bcb0', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 1.8rem auto' }}>
            Your bespoke flacons have been reserved in our private vault. Our master packaging artisans are currently preparing your sealed presentation case.
          </p>

          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(18, 16, 13, 0.8)',
              border: '1px solid rgba(212, 175, 103, 0.35)',
              padding: '0.8rem 1.8rem',
              borderRadius: '2px',
              marginBottom: '2.5rem'
            }}
          >
            <div style={{ fontSize: '0.7rem', color: '#a7a096', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Vault Allocation Number
            </div>
            <div style={{ fontSize: '1.45rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#f1d9a2', letterSpacing: '0.08em' }}>
              {order.id}
            </div>
          </div>

          {/* Timeline tracking status */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              textAlign: 'center',
              padding: '1.8rem 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '2.5rem'
            }}
          >
            <div>
              <Package size={22} color="#d4af67" style={{ marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '0.8rem', color: '#f5f0e7', fontWeight: 600 }}>1. Preparation</div>
              <div style={{ fontSize: '0.7rem', color: '#f1d9a2' }}>Active in Atelier</div>
            </div>
            <div>
              <Truck size={22} color="#756f67" style={{ marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '0.8rem', color: '#a7a096' }}>2. White-Glove Transit</div>
              <div style={{ fontSize: '0.7rem', color: '#756f67' }}>Insured Temperature Case</div>
            </div>
            <div>
              <ShieldCheck size={22} color="#756f67" style={{ marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '0.8rem', color: '#a7a096' }}>3. Hand Delivery</div>
              <div style={{ fontSize: '0.7rem', color: '#756f67' }}>Dispatched to Destination</div>
            </div>
          </div>

          {/* Ordered Items Review */}
          <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: "'Cormorant Garamond', serif", color: '#d4af67', marginBottom: '1rem' }}>
              Acquired Flacons
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {order.items?.map((item) => (
                <div
                  key={item.itemKey || item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(18, 16, 13, 0.6)',
                    borderRadius: '2px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <img src={item.image} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#f5f0e7', fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#a7a096' }}>{item.quantity}× {item.size}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#f1d9a2', fontWeight: 600 }}>
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(212, 175, 103, 0.2)' }}>
              <span style={{ fontSize: '0.84rem', color: '#a7a096' }}>Total Amount Paid (Simulated)</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 600, color: '#f1d9a2' }}>
                {formatCurrency(order.totals?.total)}
              </span>
            </div>
          </div>

          {/* Destination */}
          <div style={{ textAlign: 'left', padding: '1.2rem', backgroundColor: 'rgba(18, 16, 13, 0.5)', borderRadius: '2px', border: '1px solid rgba(212, 175, 103, 0.18)', marginBottom: '2.5rem', fontSize: '0.8rem', color: '#a7a096' }}>
            <span style={{ color: '#d4af67', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>
              Shipping Destination:
            </span>
            <div style={{ color: '#f5f0e7', fontWeight: 500 }}>{order.deliveryAddress?.street}</div>
            <div>{order.deliveryAddress?.city}, {order.deliveryAddress?.state} — {order.deliveryAddress?.pincode}</div>
          </div>

          {/* Action */}
          <button
            onClick={onContinueShopping}
            className="btn-primary"
            style={{ padding: '1rem 2.8rem', fontSize: '0.84rem' }}
          >
            <span>Continue Exploring the Collection</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
