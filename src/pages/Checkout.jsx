import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { ShieldCheck, Lock, CreditCard, Smartphone, Building, Truck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function Checkout({ onOrderSuccess, onBackToCart }) {
  const { cart, totals, clearCart, showToast } = useCart();
  const { user, addOrder } = useAuth();

  // Form State
  const defaultAddress = user?.addresses?.[0] || {};
  const [formData, setFormData] = useState({
    fullName: user?.name || defaultAddress.fullName || '',
    email: user?.email || '',
    phone: defaultAddress.phone || '',
    street: defaultAddress.street || '',
    city: defaultAddress.city || '',
    state: defaultAddress.state || '',
    pincode: defaultAddress.pincode || '',
    termsAccepted: false
  });

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking, cod
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: user?.name || '', exp: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.email || !formData.street || !formData.city || !formData.pincode) {
      setErrorMsg('Please complete all delivery address fields.');
      return;
    }
    if (!formData.termsAccepted) {
      setErrorMsg('Please confirm agreement to the terms of luxury purchase.');
      return;
    }

    setIsProcessing(true);

    // Simulate luxury authentication & payment processing
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `LX-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const orderData = {
        id: generatedOrderId,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cart],
        totals: { ...totals },
        deliveryAddress: { ...formData },
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'Confirmed & In Vault Preparation'
      };

      addOrder(orderData);
      clearCart();
      showToast(`Order ${generatedOrderId} confirmed successfully!`);
      onOrderSuccess(orderData);
    }, 1800);
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '7rem', color: '#f5f0e7' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#756f67' }}>
          <button onClick={onBackToCart} style={{ background: 'none', border: 'none', color: '#d4af67', cursor: 'pointer', padding: 0 }}>
            ← Return to Shopping Bag
          </button>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, margin: '0 0 0.4rem 0' }}>
            White-Glove Dispatch & Checkout
          </h1>
          <p style={{ color: '#a7a096', fontSize: '0.86rem' }}>
            Finalize your confidential acquisition. Delivered directly via temperature-regulated courier.
          </p>
        </div>

        {/* Safety & Demonstration Status Banner */}
        <div
          style={{
            backgroundColor: 'rgba(212, 175, 103, 0.08)',
            border: '1px solid rgba(212, 175, 103, 0.35)',
            borderRadius: '3px',
            padding: '1rem 1.4rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <ShieldCheck size={26} color="#d4af67" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.8rem', color: '#f1d9a2', lineHeight: 1.5 }}>
            <strong>Demonstration Acquisition Mode:</strong> This website operates in frontend presentation mode. No real monetary transactions will take place. Use placeholder details only; no payment gateway or live order service is connected.
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: 'rgba(229, 115, 115, 0.15)',
              border: '1px solid #e57373',
              color: '#ffcdd2',
              padding: '0.9rem 1.2rem',
              borderRadius: '2px',
              marginBottom: '2rem',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Checkout Form & Order Summary */}
        <form onSubmit={handlePlaceOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.45fr 1fr',
              gap: '3.5rem',
              alignItems: 'start'
            }}
            className="checkout-grid"
          >
            {/* Left: Address and Payment Methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* 1. Contact Information */}
              <div
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.75)',
                  border: '1px solid rgba(212, 175, 103, 0.22)',
                  borderRadius: '3px',
                  padding: '2rem'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0 0 1.4rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.8rem' }}>
                  1. Recipient Information
                </h3>

                <div className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        color: '#f5f0e7',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.82rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        color: '#f5f0e7',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.82rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                    Telephone Number (for private courier coordination) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: '#0c0a08',
                      border: '1px solid rgba(212, 175, 103, 0.25)',
                      color: '#f5f0e7',
                      padding: '0.75rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.75)',
                  border: '1px solid rgba(212, 175, 103, 0.22)',
                  borderRadius: '3px',
                  padding: '2rem'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0 0 1.4rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.8rem' }}>
                  2. Destination Address (India)
                </h3>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                    Street Address & Apartment / Penthouse *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: '#0c0a08',
                      border: '1px solid rgba(212, 175, 103, 0.25)',
                      color: '#f5f0e7',
                      padding: '0.75rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div className="form-grid-3">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        color: '#f5f0e7',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.82rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        color: '#f5f0e7',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.82rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a7a096', marginBottom: '0.4rem' }}>
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        backgroundColor: '#0c0a08',
                        border: '1px solid rgba(212, 175, 103, 0.25)',
                        color: '#f5f0e7',
                        padding: '0.75rem 0.9rem',
                        fontSize: '0.82rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Simulated Payment Selection */}
              <div
                style={{
                  backgroundColor: 'rgba(18, 16, 13, 0.75)',
                  border: '1px solid rgba(212, 175, 103, 0.22)',
                  borderRadius: '3px',
                  padding: '2rem'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0 0 1.4rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.8rem' }}>
                  3. Select Payment Instrument (Simulated)
                </h3>

                {/* Tabs */}
                <div className="payment-tabs-grid" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      backgroundColor: paymentMethod === 'upi' ? '#d4af67' : 'rgba(9, 9, 9, 0.7)',
                      color: paymentMethod === 'upi' ? '#090909' : '#f5f0e7',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      padding: '0.7rem 0.5rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontWeight: 600
                    }}
                  >
                    <Smartphone size={16} />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      backgroundColor: paymentMethod === 'card' ? '#d4af67' : 'rgba(9, 9, 9, 0.7)',
                      color: paymentMethod === 'card' ? '#090909' : '#f5f0e7',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      padding: '0.7rem 0.5rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontWeight: 600
                    }}
                  >
                    <CreditCard size={16} />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    style={{
                      backgroundColor: paymentMethod === 'netbanking' ? '#d4af67' : 'rgba(9, 9, 9, 0.7)',
                      color: paymentMethod === 'netbanking' ? '#090909' : '#f5f0e7',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      padding: '0.7rem 0.5rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontWeight: 600
                    }}
                  >
                    <Building size={16} />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      backgroundColor: paymentMethod === 'cod' ? '#d4af67' : 'rgba(9, 9, 9, 0.7)',
                      color: paymentMethod === 'cod' ? '#090909' : '#f5f0e7',
                      border: '1px solid rgba(212, 175, 103, 0.3)',
                      padding: '0.7rem 0.5rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontWeight: 600
                    }}
                  >
                    <Truck size={16} />
                    <span>COD</span>
                  </button>
                </div>

                {/* Instrument Specific Details */}
                {paymentMethod === 'upi' && (
                  <div style={{ backgroundColor: '#0c0a08', border: '1px solid rgba(212, 175, 103, 0.2)', padding: '1.2rem', borderRadius: '2px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#f1d9a2', marginBottom: '0.6rem' }}>
                      Enter your Virtual Payment Address (VPA) / UPI ID:
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(18, 16, 13, 0.8)',
                        border: '1px solid rgba(212, 175, 103, 0.3)',
                        color: '#f5f0e7',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.8rem',
                        borderRadius: '2px',
                        outline: 'none'
                      }}
                    />
                    <div style={{ fontSize: '0.7rem', color: '#756f67', marginTop: '0.5rem' }}>
                      ⚡ Instant verification simulated via UPI 2.0 network.
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div style={{ backgroundColor: '#0c0a08', border: '1px solid rgba(212, 175, 103, 0.2)', padding: '1.2rem', borderRadius: '2px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: '#a7a096', marginBottom: '0.3rem' }}>Card Number (Demo)</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        style={{ width: '100%', backgroundColor: 'rgba(18, 16, 13, 0.8)', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#f5f0e7', padding: '0.65rem 0.8rem', fontSize: '0.8rem', borderRadius: '2px' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#a7a096', marginBottom: '0.3rem' }}>Valid Thru</label>
                        <input
                          type="text"
                          value={cardData.exp}
                          onChange={(e) => setCardData({ ...cardData, exp: e.target.value })}
                          style={{ width: '100%', backgroundColor: 'rgba(18, 16, 13, 0.8)', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#f5f0e7', padding: '0.65rem 0.8rem', fontSize: '0.8rem', borderRadius: '2px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#a7a096', marginBottom: '0.3rem' }}>CVV</label>
                        <input
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          style={{ width: '100%', backgroundColor: 'rgba(18, 16, 13, 0.8)', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#f5f0e7', padding: '0.65rem 0.8rem', fontSize: '0.8rem', borderRadius: '2px' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div style={{ backgroundColor: '#0c0a08', border: '1px solid rgba(212, 175, 103, 0.2)', padding: '1.2rem', borderRadius: '2px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#f1d9a2', marginBottom: '0.6rem' }}>
                      Select Banking Institution:
                    </div>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      style={{ width: '100%', backgroundColor: 'rgba(18, 16, 13, 0.8)', border: '1px solid rgba(212, 175, 103, 0.3)', color: '#f5f0e7', padding: '0.65rem 0.8rem', fontSize: '0.8rem', borderRadius: '2px' }}
                    >
                      <option>HDFC Bank Private Banking</option>
                      <option>ICICI Bank Wealth Management</option>
                      <option>Axis Bank Burgundy</option>
                      <option>State Bank of India</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div style={{ backgroundColor: '#0c0a08', border: '1px solid rgba(212, 175, 103, 0.2)', padding: '1.2rem', borderRadius: '2px' }}>
                    <p style={{ fontSize: '0.8rem', color: '#c4bcb0', margin: 0, lineHeight: 1.5 }}>
                      Cash or contactless card tap on delivery. Our white-glove courier will present your sealed presentation case upon receipt.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div
              style={{
                backgroundColor: 'rgba(18, 16, 13, 0.85)',
                border: '1px solid rgba(212, 175, 103, 0.3)',
                borderRadius: '3px',
                padding: '2.2rem',
                position: 'sticky',
                top: '120px'
              }}
            >
              <h3 style={{ fontSize: '1.35rem', fontFamily: "'Cormorant Garamond', serif", color: '#f5f0e7', margin: '0 0 1.2rem 0', borderBottom: '1px solid rgba(212, 175, 103, 0.2)', paddingBottom: '0.8rem' }}>
                Acquisition Summary
              </h3>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem', maxHeight: '220px', overflowY: 'auto', paddingRight: '0.4rem' }}>
                {cart.map((item) => (
                  <div key={item.itemKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img src={item.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '2px', backgroundColor: '#090909' }} />
                      <div>
                        <div style={{ color: '#f5f0e7', fontWeight: 500 }}>{item.name}</div>
                        <div style={{ color: '#756f67', fontSize: '0.7rem' }}>{item.quantity}× {item.size}</div>
                      </div>
                    </div>
                    <div style={{ color: '#f1d9a2', fontWeight: 600 }}>
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a7a096' }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#f5f0e7' }}>{formatCurrency(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4af67' }}>
                    <span>Privilege Discount</span>
                    <span>-{formatCurrency(totals.discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a7a096' }}>
                  <span>White-Glove Courier</span>
                  <span>{totals.shipping === 0 ? 'Complimentary' : formatCurrency(totals.shipping)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#f1d9a2', paddingTop: '0.6rem', borderTop: '1px solid rgba(212, 175, 103, 0.25)', marginTop: '0.4rem' }}>
                  <span>Total Amount</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.74rem', color: '#a7a096', marginBottom: '1.4rem', cursor: 'pointer', lineHeight: 1.4 }}>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  style={{ accentColor: '#d4af67', marginTop: '2px' }}
                />
                <span>
                  I confirm the recipient details and acknowledge that this simulated acquisition will be recorded in my private Luxery Shop collection vault.
                </span>
              </label>

              {/* Place Order Trigger */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary"
                style={{ width: '100%', padding: '1.1rem 0', fontSize: '0.84rem', opacity: isProcessing ? 0.7 : 1 }}
              >
                {isProcessing ? (
                  <span>Securing Vault Allocation...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize Acquisition</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .payment-tabs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .form-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .form-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .payment-tabs-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
