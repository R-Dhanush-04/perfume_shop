import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Clock, Calendar, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export function Navbar({ activePage, setActivePage, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Scroll listener for sticky transparent -> frosted luxury obsidian glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live clock and date in upper-right
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })
      );
      setDateString(
        now.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All' },
    { id: 'shop-men', label: 'Men', filter: 'men' },
    { id: 'shop-women', label: 'Women', filter: 'women' },
    { id: 'shop-unisex', label: 'Unisex', filter: 'unisex' },
    { id: 'collections', label: 'Collections' },
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'finder', label: 'Fragrance Finder' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (link) => {
    setActivePage(link.id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled
            ? 'rgba(12, 10, 8, 0.94)'
            : 'rgba(9, 9, 9, 0.35)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(6px)',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(6px)',
          borderBottom: isScrolled
            ? '1px solid rgba(212, 175, 103, 0.22)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.6)' : 'none'
        }}
      >
        {/* Top Info Bar: Clock, Date, Complimentary Delivery */}
        <div
          style={{
            borderBottom: '1px solid rgba(212, 175, 103, 0.12)',
            padding: '0.35rem 2rem',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#a7a096'
          }}
          className="container"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: '#d4af67', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={11} />
              <span>HAUTE PARFUMERIE</span>
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span className="hidden-mobile" style={{ color: '#f5f0e7' }}>
              Complimentary White-Glove Delivery on orders over ₹3,000
            </span>
          </div>

          {/* Upper Right Live Local Clock & Date */}
          <div
            className="topbar-datetime"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              fontFamily: "'Montserrat', sans-serif"
            }}
          >
            <div className="topbar-date" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={12} color="#d4af67" />
              <span style={{ color: '#f5f0e7' }}>{dateString}</span>
            </div>
            <div
              className="topbar-time"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'rgba(212, 175, 103, 0.08)',
                padding: '0.15rem 0.5rem',
                borderRadius: '2px',
                border: '1px solid rgba(212, 175, 103, 0.2)'
              }}
            >
              <Clock size={12} color="#d4af67" />
              <span style={{ color: '#f1d9a2', fontWeight: 600, letterSpacing: '0.08em' }}>
                {timeString}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '70px' : '82px',
            transition: 'height 0.3s ease'
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick({ id: 'home' })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              padding: 0
            }}
          >
            <span
              style={{
                fontSize: 'clamp(1.25rem, 4.2vw, 1.65rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #f1d9a2 0%, #d4af67 50%, #8d6b35 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}
            >
              Luxery Shop
            </span>
            <span
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: '#a7a096',
                marginTop: '3px'
              }}
            >
              Haute Parfumerie
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.6rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#f1d9a2' : '#f5f0e7',
                    fontSize: '0.76rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    padding: '0.4rem 0',
                    position: 'relative',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#d4af67';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#f5f0e7';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #d4af67, #f1d9a2)'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons: Search, Wishlist, Account, Bag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search */}
            <button
              onClick={onOpenSearch}
              title="Search fragrances"
              style={{
                background: 'none',
                border: 'none',
                color: '#f5f0e7',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4af67')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#f5f0e7')}
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActivePage('wishlist')}
              title="Curated Wishlist"
              style={{
                background: 'none',
                border: 'none',
                color: activePage === 'wishlist' ? '#d4af67' : '#f5f0e7',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4af67')}
              onMouseLeave={(e) => (e.currentTarget.style.color = activePage === 'wishlist' ? '#d4af67' : '#f5f0e7')}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-4px',
                    backgroundColor: '#d4af67',
                    color: '#090909',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => setActivePage('account')}
              title="VIP Account"
              style={{
                background: 'none',
                border: 'none',
                color: activePage === 'account' ? '#d4af67' : '#f5f0e7',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4af67')}
              onMouseLeave={(e) => (e.currentTarget.style.color = activePage === 'account' ? '#d4af67' : '#f5f0e7')}
            >
              <User size={20} />
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              title="Shopping Bag"
              style={{
                background: 'rgba(212, 175, 103, 0.12)',
                border: '1px solid rgba(212, 175, 103, 0.3)',
                color: '#f1d9a2',
                cursor: 'pointer',
                padding: '0.55rem 0.95rem',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4af67';
                e.currentTarget.style.color = '#090909';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 103, 0.12)';
                e.currentTarget.style.color = '#f1d9a2';
              }}
            >
              <ShoppingBag size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{cartCount}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                background: 'none',
                border: 'none',
                color: '#f5f0e7',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'none'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#0c0a08',
              borderBottom: '1px solid rgba(212, 175, 103, 0.25)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activePage === link.id ? '#f1d9a2' : '#f5f0e7',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Global CSS media queries for desktop-nav / mobile toggle */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .topbar-date {
            display: none !important;
          }
        }
        @media (max-width: 440px) {
          .topbar-datetime {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
