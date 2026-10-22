import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { User, Package, MapPin, LogOut, ShieldCheck, Key, Check, Plus, AlertCircle } from 'lucide-react';

export function Account({ onSelectProduct }) {
  const { user, isLoggedIn, login, register, logout, addAddress } = useAuth();

  const [authMode, setAuthMode] = useState('login'); // login, register, forgot
  const [activeTab, setActiveTab] = useState('orders'); // orders, addresses, profile

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // New Address form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: 'Delivery Address', street: '', city: '', state: '', pincode: '' });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const res = login(email, password);
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const res = register(fullName, email, password);
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid registered email address.');
      return;
    }
    setAuthSuccess('Password-reset flow is a demo. No email was sent.');
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.pincode) return;
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({ label: 'Delivery Address', street: '', city: '', state: '', pincode: '' });
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '7rem', color: '#f5f0e7' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* If Not Logged In -> Show Luxury Auth Modal / Form */}
        {!isLoggedIn ? (
          <div
            style={{
              maxWidth: '480px',
              margin: '3rem auto 0 auto',
              backgroundColor: '#0c0a08',
              border: '1px solid rgba(212, 175, 103, 0.35)',
              borderRadius: '4px',
              padding: 'clamp(1.8rem, 5vw, 2.8rem) clamp(1rem, 4vw, 2.2rem)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
            }}
          >
            {/* Logo & Headline */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '1.65rem', fontFamily: "'Cormorant Garamond', serif", color: '#f1d9a2', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.3rem' }}>
                Luxery Shop VIP Salon
              </div>
              <p style={{ fontSize: '0.78rem', color: '#a7a096' }}>
                Sign in or create a local demo profile to preview account features.
              </p>
              <p style={{ fontSize: '0.7rem', color: '#756f67', lineHeight: 1.5, marginTop: '0.65rem' }}>Demo only: authentication is stored in this browser; no live account server or email service is connected.</p>
            </div>

            {/* Mode Switcher */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(212, 175, 103, 0.2)', marginBottom: '1.8rem' }}>
              <button
                onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  padding: '0.6rem 0',
                  color: authMode === 'login' ? '#f1d9a2' : '#756f67',
                  borderBottom: authMode === 'login' ? '2px solid #d4af67' : 'none',
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: authMode === 'login' ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthMode('register'); setAuthError(''); setAuthSuccess(''); }}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  padding: '0.6rem 0',
                  color: authMode === 'register' ? '#f1d9a2' : '#756f67',
                  borderBottom: authMode === 'register' ? '2px solid #d4af67' : 'none',
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: authMode === 'register' ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                Create Account
              </button>
            </div>

            {authError && (
              <div style={{ backgroundColor: 'rgba(229, 115, 115, 0.15)', border: '1px solid #e57373', color: '#ffcdd2', padding: '0.7rem', borderRadius: '2px', fontSize: '0.76rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={15} />
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div style={{ backgroundColor: 'rgba(212, 175, 103, 0.15)', border: '1px solid #d4af67', color: '#f1d9a2', padding: '0.7rem', borderRadius: '2px', fontSize: '0.76rem', marginBottom: '1.2rem' }}>
                {authSuccess}
              </div>
            )}

            {/* Login Form */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collector@parfumerie.com"
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(18, 16, 13, 0.8)',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      color: '#f5f0e7',
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096' }}>
                      Master Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      style={{ background: 'none', border: 'none', color: '#d4af67', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(18, 16, 13, 0.8)',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      color: '#f5f0e7',
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.95rem 0' }}>
                  Enter Vault
                </button>
              </form>
            )}

            {/* Register Form */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Lady Vivienne Montgomery"
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(18, 16, 13, 0.8)',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      color: '#f5f0e7',
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vivienne@estate.com"
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(18, 16, 13, 0.8)',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      color: '#f5f0e7',
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                    Desired Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(18, 16, 13, 0.8)',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      color: '#f5f0e7',
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.95rem 0' }}>
                  Create VIP Account
                </button>
              </form>
            )}

            {/* Forgot Password */}
            {authMode === 'forgot' && (
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <p style={{ fontSize: '0.82rem', color: '#c4bcb0', lineHeight: 1.5 }}>
                  Enter an email to preview the password-reset flow. This demo does not send email or reset a real account.
                </p>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(18, 16, 13, 0.8)',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      color: '#f5f0e7',
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem 0' }}>
                  Preview Reset Flow
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  style={{ background: 'none', border: 'none', color: '#a7a096', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  ← Back to Sign In
                </button>
              </form>
            )}

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.68rem', color: '#756f67' }}>
              Frontend Demonstration Mode • No confidential credentials stored
            </div>
          </div>
        ) : (
          /* If Logged In -> VIP Account Dashboard */
          <div>
            {/* Header Banner */}
            <div
              style={{
                backgroundColor: 'rgba(18, 16, 13, 0.85)',
                border: '1px solid rgba(212, 175, 103, 0.28)',
                borderRadius: '4px',
                padding: 'clamp(1.2rem, 4vw, 2.5rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '3rem',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 103, 0.15)',
                    border: '2px solid #d4af67',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.8rem',
                    color: '#f1d9a2',
                    fontWeight: 600
                  }}
                >
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: 0 }}>
                      {user.name}
                    </h2>
                    <span style={{ fontSize: '0.68rem', backgroundColor: '#d4af67', color: '#090909', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '2px' }}>
                      {user.tier}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a7a096', marginTop: '0.2rem' }}>
                    {user.email} • Member ID: LX-VIP-88194
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#a7a096',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.74rem',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#e57373';
                  e.currentTarget.style.color = '#e57373';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#a7a096';
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Dashboard Tabs */}
            <div className="tab-scroll-container" style={{ borderBottom: '1px solid rgba(212, 175, 103, 0.2)', marginBottom: '2.5rem' }}>
              <button
                onClick={() => setActiveTab('orders')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.8rem 0.4rem',
                  color: activeTab === 'orders' ? '#f1d9a2' : '#756f67',
                  borderBottom: activeTab === 'orders' ? '2px solid #d4af67' : 'none',
                  fontSize: '0.84rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: activeTab === 'orders' ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Package size={16} />
                <span>Acquisition History ({user.orders?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.8rem 0.4rem',
                  color: activeTab === 'addresses' ? '#f1d9a2' : '#756f67',
                  borderBottom: activeTab === 'addresses' ? '2px solid #d4af67' : 'none',
                  fontSize: '0.84rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: activeTab === 'addresses' ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MapPin size={16} />
                <span>Saved Residences ({user.addresses?.length || 0})</span>
              </button>
            </div>

            {/* Tab 1: Orders */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {user.orders?.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#a7a096' }}>
                    No prior acquisitions found in vault.
                  </div>
                ) : (
                  user.orders?.map((ord) => (
                    <div
                      key={ord.id}
                      style={{
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.22)',
                        borderRadius: '3px',
                        padding: '1.8rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: '#a7a096', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Order Date: {ord.date}</span>
                          <div style={{ fontSize: '1.15rem', color: '#f1d9a2', fontWeight: 600 }}>{ord.id}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(212, 175, 103, 0.15)', color: '#d4af67', padding: '0.25rem 0.6rem', borderRadius: '2px', fontWeight: 600 }}>
                            {ord.status || 'Confirmed & Dispatched'}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
                        {ord.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                              <img src={item.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '2px' }} />
                              <div>
                                <div style={{ color: '#f5f0e7' }}>{item.name}</div>
                                <div style={{ color: '#756f67', fontSize: '0.72rem' }}>{item.quantity}× {item.size}</div>
                              </div>
                            </div>
                            <div style={{ color: '#f1d9a2', fontWeight: 600 }}>
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.84rem' }}>
                        <span style={{ color: '#a7a096' }}>Total Amount</span>
                        <span style={{ fontSize: '1.2rem', color: '#f1d9a2', fontWeight: 700 }}>
                          {formatCurrency(ord.totals?.total || ord.total)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Addresses */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontFamily: "'Cormorant Garamond', serif", margin: 0 }}>
                    Registered Delivery Destinations
                  </h3>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="btn-outline-gold"
                    style={{ fontSize: '0.72rem' }}
                  >
                    <Plus size={13} />
                    <span>Add New Residence</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {user.addresses?.map((addr) => (
                    <div
                      key={addr.id}
                      style={{
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        borderRadius: '3px',
                        padding: '1.6rem',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                        <span style={{ fontSize: '0.74rem', color: '#d4af67', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                          {addr.label || 'Residence'}
                        </span>
                        {addr.isDefault && (
                          <span style={{ fontSize: '0.62rem', backgroundColor: '#d4af67', color: '#090909', padding: '0.15rem 0.4rem', borderRadius: '2px', fontWeight: 700 }}>
                            Default
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.92rem', color: '#f5f0e7', fontWeight: 500, marginBottom: '0.3rem' }}>
                        {addr.fullName || user.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#a7a096', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                        {addr.street}
                        <br />
                        {addr.city}, {addr.state} — {addr.pincode}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#756f67' }}>
                        Phone: {addr.phone || user.phone}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Address Modal */}
                {showAddressModal && (
                  <div
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 3000,
                      backgroundColor: 'rgba(9, 9, 9, 0.85)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem'
                    }}
                    onClick={() => setShowAddressModal(false)}
                  >
                    <div
                      style={{
                        backgroundColor: '#0c0a08',
                        border: '1px solid #d4af67',
                        borderRadius: '3px',
                        padding: '2.2rem',
                        maxWidth: '480px',
                        width: '100%'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 style={{ fontSize: '1.4rem', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.2rem' }}>
                        Add Private Delivery Residence
                      </h3>
                      <form onSubmit={handleCreateAddress} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.72rem', color: '#a7a096', textTransform: 'uppercase' }}>Residence Label</label>
                          <input
                            type="text"
                            value={newAddr.label}
                            onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                            style={{ width: '100%', backgroundColor: '#141210', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#fff', padding: '0.6rem', fontSize: '0.8rem', borderRadius: '2px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.72rem', color: '#a7a096', textTransform: 'uppercase' }}>Street & Penthouse</label>
                          <input
                            type="text"
                            value={newAddr.street}
                            onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                            required
                            style={{ width: '100%', backgroundColor: '#141210', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#fff', padding: '0.6rem', fontSize: '0.8rem', borderRadius: '2px' }}
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#a7a096', textTransform: 'uppercase' }}>City</label>
                            <input
                              type="text"
                              value={newAddr.city}
                              onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                              required
                              style={{ width: '100%', backgroundColor: '#141210', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#fff', padding: '0.6rem', fontSize: '0.8rem', borderRadius: '2px' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#a7a096', textTransform: 'uppercase' }}>PIN Code</label>
                            <input
                              type="text"
                              value={newAddr.pincode}
                              onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                              required
                              style={{ width: '100%', backgroundColor: '#141210', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#fff', padding: '0.6rem', fontSize: '0.8rem', borderRadius: '2px' }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
                          <button type="submit" className="btn-primary" style={{ flexGrow: 1, padding: '0.8rem 0' }}>
                            Save Address
                          </button>
                          <button type="button" onClick={() => setShowAddressModal(false)} className="btn-secondary" style={{ padding: '0.8rem 1.2rem' }}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
