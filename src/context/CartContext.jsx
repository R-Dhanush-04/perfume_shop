import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCartTotals } from '../utils/cartCalculations';
import { DEMO_COUPONS } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('luxery_shop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('luxery_shop_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('luxery_shop_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('luxery_shop_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('luxery_shop_coupon');
      }
    } catch (e) {
      console.warn('Coupon save error:', e);
    }
  }, [appliedCoupon]);

  const showToast = (message, type = 'gold') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const addToCart = (product, selectedSize = '100ml', quantity = 1) => {
    const sizeObj = product.sizes?.find(s => s.size === selectedSize) || { size: selectedSize, price: product.price };
    const itemPrice = sizeObj.price || product.price;
    const itemKey = `${product.id}-${selectedSize}`;

    setCart(prev => {
      const existing = prev.find(item => item.itemKey === itemKey);
      if (existing) {
        return prev.map(item =>
          item.itemKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            itemKey,
            id: product.id,
            name: product.name,
            collection: product.collection,
            price: itemPrice,
            originalPrice: product.originalPrice,
            size: selectedSize,
            image: product.images?.[0] || '/assets/perfumes/hero-perfume.jpg',
            quantity
          }
        ];
      }
    });

    showToast(`Added ${quantity}× ${product.name} (${selectedSize}) to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (itemKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.itemKey === itemKey ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
    showToast('Removed item from shopping bag');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (code) => {
    const cleanCode = code?.trim().toUpperCase();
    if (DEMO_COUPONS[cleanCode]) {
      const coupon = { code: cleanCode, ...DEMO_COUPONS[cleanCode] };
      const currentTotals = calculateCartTotals(cart, coupon, shippingMethod);
      if (currentTotals.subtotal < coupon.minSpend) {
        return { success: false, message: `Minimum spend of ₹${coupon.minSpend} required for this code.` };
      }
      setAppliedCoupon(coupon);
      showToast(`Privilege code '${cleanCode}' applied: ${coupon.description}`);
      return { success: true, message: `Privilege code '${cleanCode}' activated!` };
    }
    return { success: false, message: 'Invalid code. Try LUXURY10 or GOLD20.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Privilege code removed');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totals = calculateCartTotals(cart, appliedCoupon, shippingMethod);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        totals,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        shippingMethod,
        setShippingMethod,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
