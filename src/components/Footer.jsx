import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Footer({ setActivePage }) {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Newsletter demo submitted. Live email delivery is not connected yet.', 'info');
    setNewsletterEmail('');
  };

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="luxury-footer"
      style={{
        backgroundColor: '#070605',
        borderTop: '1px solid rgba(212, 175, 103, 0.22)',
        color: '#a7a096',
        paddingTop: '3rem',
        paddingBottom: '1.5rem'
      }}
    >
      <div className="container">
        {/* Value Pillars Banner */}
        <div
          className="footer-value-points"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1.5rem',
            paddingBottom: '1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Award size={28} color="#d4af67" />
            <div>
              <div style={{ color: '#f5f0e7', fontSize: '0.86rem', fontWeight: 600 }}>A Curated Fragrance Edit</div>
              <div style={{ fontSize: '0.74rem', color: '#756f67' }}>Distinctive notes, thoughtfully composed</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Truck size={28} color="#d4af67" />
            <div>
              <div style={{ color: '#f5f0e7', fontSize: '0.86rem', fontWeight: 600 }}>Delivery Details</div>
              <div style={{ fontSize: '0.74rem', color: '#756f67' }}>Delivery options shown at checkout demo</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <RefreshCw size={28} color="#d4af67" />
            <div>
              <div style={{ color: '#f5f0e7', fontSize: '0.86rem', fontWeight: 600 }}>Explore the Notes</div>
              <div style={{ fontSize: '0.74rem', color: '#756f67' }}>Discover top, heart and base accords</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={28} color="#d4af67" />
            <div>
              <div style={{ color: '#f5f0e7', fontSize: '0.86rem', fontWeight: 600 }}>Demo Checkout</div>
              <div style={{ fontSize: '0.74rem', color: '#756f67' }}>No live payments or orders are processed</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div
          className="footer-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 205px), 1fr))',
            gap: '1.75rem',
            marginBottom: '2rem'
          }}
        >
          {/* Brand Col */}
          <div className="footer-brand-column" style={{ maxWidth: 'none', minWidth: 0 }}>
            <div
              style={{
                fontSize: '1.75rem',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #f1d9a2 0%, #d4af67 50%, #8d6b35 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.8rem'
              }}
            >
              Luxery Shop
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: '#a7a096', marginBottom: '1.5rem' }}>
              A dark, gold-accented fragrance destination built around expressive scent profiles, evocative notes and considered design.
            </p>
            <div style={{ fontSize: '0.74rem', color: '#d4af67', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              WOODS • FLORALS • AMBER • OUD
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-link-column" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
            <h4 style={{ color: '#f5f0e7', fontSize: '0.82rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              The Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem' }}>
              <li>
                <button onClick={() => navigateTo('shop')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  All Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop-men')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  Men’s Signatures
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop-women')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  Women’s Parfums
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop-unisex')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  Unisex Extractions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('finder')} style={{ background: 'none', border: 'none', color: '#d4af67', cursor: 'pointer', padding: 0 }}>
                  The Fragrance Finder
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="footer-link-column" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
            <h4 style={{ color: '#f5f0e7', fontSize: '0.82rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Client Concierge
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem' }}>
              <li>
                <button onClick={() => navigateTo('about')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  About Our Maison
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  VIP Account & Vault
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  Your Shopping Bag
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} style={{ background: 'none', border: 'none', color: '#a7a096', cursor: 'pointer', padding: 0 }}>
                  Curated Wishlist
                </button>
              </li>
              <li>
                <span style={{ color: '#756f67' }}>Customer care details to be configured before launch</span>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="footer-newsletter-column" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
            <h4 style={{ color: '#f5f0e7', fontSize: '0.82rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              The Private Salon
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#a7a096', lineHeight: 1.5, marginBottom: '1rem' }}>
              Get occasional collection notes and fragrance inspiration. This demo does not send live email.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', minWidth: 0, width: '100%' }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: '1 1 0', minWidth: 0,
                    backgroundColor: 'rgba(18, 16, 13, 0.85)',
                    border: '1px solid rgba(212, 175, 103, 0.3)',
                    borderRight: 'none',
                    color: '#f5f0e7',
                    padding: '0.65rem 0.9rem',
                    fontSize: '0.75rem',
                    outline: 'none',
                    borderRadius: '2px 0 0 2px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#d4af67',
                    border: '1px solid #d4af67',
                    color: '#090909',
                    padding: '0 1rem',
                    cursor: 'pointer',
                    borderRadius: '0 2px 2px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowRight size={15} />
                </button>
              </div>
              {subscribed && (
                <span style={{ fontSize: '0.72rem', color: '#f1d9a2' }}>
                  ✓ Newsletter demo submitted. Live email delivery is not connected.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div
          className="footer-bottom-bar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.72rem',
            color: '#756f67'
          }}
        >
          <div>
            © {currentYear} <strong>Luxery Shop</strong>. Fragrance storefront demo — accounts, newsletter and orders are simulated locally.
          </div>

          {/* Payment options are illustrative until a live provider is connected. */}
          <div className="footer-payment-preview" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem', color: '#a7a096', minWidth: 0 }}>
            <span>Payment options preview</span>
            <span>•</span>
            <span>UPI</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>American Express</span>
            <span>•</span>
            <span>Net Banking</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
