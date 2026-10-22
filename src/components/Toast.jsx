import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 3000,
        backgroundColor: 'rgba(18, 16, 13, 0.95)',
        border: '1px solid #d4af67',
        borderRadius: '3px',
        padding: '0.9rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.75), 0 0 20px rgba(212, 175, 103, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '420px'
      }}
    >
      <CheckCircle2 size={18} color="#d4af67" />
      <span style={{ fontSize: '0.82rem', color: '#f5f0e7', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.02em', lineHeight: 1.4 }}>
        {toastMessage.message}
      </span>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
